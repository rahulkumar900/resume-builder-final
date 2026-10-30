'use client';

import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useEditor, EditorContent } from '@tiptap/react';
import { Extension, wrappingInputRule } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import CharacterCount from '@tiptap/extension-character-count';
import Highlight from '@tiptap/extension-highlight';

import {
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Underline as UnderlineIcon,
  List as ListIcon,
  ListOrdered as ListOrderedIcon,
  Link2,
  RemoveFormatting,
  Undo2,
  Redo2,
  Sparkles,
  CheckCircle2,
  CheckCheck,
  X,
  AlertTriangle,
  ArrowRight,
  Check,
  Wand2,
  Zap,
  TrendingUp,
  Loader2,
  BookOpen,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { checkGrammar, autoCorrectText } from '@/lib/grammar/grammarEngine';
import { GrammarIssue } from '@/lib/grammar/types';
import { AiSuggestionModal } from '@/components/builder/AiSuggestionModal';

export interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: string;
  onOpenAiSuggestions?: (rect?: DOMRect) => void;
  showAiButton?: boolean;
  aiButtonLabel?: string;
  className?: string;
  sectionName?: string;
  roleContext?: string;
  defaultBulletList?: boolean;
}

// -------------------------------------------------------------
// Real-time Content Improvement Rules (Weak Verbs & Vague Quantifiers)
// -------------------------------------------------------------
interface RealtimeRule {
  regex: RegExp;
  type: 'verb' | 'metric';
  label: string;
  suggestions: string[];
  explanation: string;
}

const REALTIME_RULES: RealtimeRule[] = [
  {
    regex: /\b(responsible\s+for|duties\s+included|tasked\s+with)\b/gi,
    type: 'verb',
    label: 'Leadership Power Verb',
    suggestions: ['Spearheaded', 'Directed', 'Orchestrated', 'Oversaw', 'Led'],
    explanation: 'Replace passive responsibility phrasing with an authoritative action verb.',
  },
  {
    regex: /\b(worked\s+on\s+developing|worked\s+on\s+building|worked\s+on)\b/gi,
    type: 'verb',
    label: 'Engineering Action Verb',
    suggestions: ['Architected', 'Engineered', 'Pioneered', 'Developed', 'Built'],
    explanation: 'Replace generic "worked on" with a decisive technical verb.',
  },
  {
    regex: /\b(helped\s+with|helped\s+to|helped)\b/gi,
    type: 'verb',
    label: 'Impactful Verb',
    suggestions: ['Collaborated to', 'Co-engineered', 'Accelerated', 'Delivered', 'Enhanced'],
    explanation: 'Elevate "helped" into an impactful contribution verb.',
  },
  {
    regex: /\b(assisted\s+in|assisted\s+with|assisted)\b/gi,
    type: 'verb',
    label: 'Action Verb',
    suggestions: ['Supported', 'Co-authored', 'Streamlined', 'Facilitated', 'Reinforced'],
    explanation: 'Replace "assisted" with an active contribution verb.',
  },
  {
    regex: /\b(handled)\b/gi,
    type: 'verb',
    label: 'Executive Verb',
    suggestions: ['Managed', 'Orchestrated', 'Administered', 'Executed', 'Resolved'],
    explanation: 'Replace casual "handled" with an executive management verb.',
  },
  {
    regex: /\b(participated\s+in)\b/gi,
    type: 'verb',
    label: 'Contribution Verb',
    suggestions: ['Contributed to', 'Co-designed', 'Drove', 'Facilitated'],
    explanation: 'Upgrade "participated in" to a direct delivery verb.',
  },
  {
    regex: /\b(was\s+involved\s+in)\b/gi,
    type: 'verb',
    label: 'Direct Action Verb',
    suggestions: ['Drove', 'Spearheaded', 'Co-developed', 'Orchestrated'],
    explanation: 'Avoid passive involvement; highlight direct delivery.',
  },
  {
    regex: /\b(various\s+different|various)\b/gi,
    type: 'metric',
    label: 'Quantify Scope',
    suggestions: ['10+ core', 'diverse enterprise', 'cross-platform', '5+ critical'],
    explanation: 'Replace vague "various" with a specific measurable number or scope.',
  },
  {
    regex: /\b(many|several)\b/gi,
    type: 'metric',
    label: 'Quantify Number',
    suggestions: ['20+', 'numerous enterprise', 'over 50+'],
    explanation: 'Quantify "many/several" with a concrete figure.',
  },
  {
    regex: /\b(a\s+lot\s+of)\b/gi,
    type: 'metric',
    label: 'Quantify Scale',
    suggestions: ['high-volume', 'massive enterprise', 'petabyte-scale', '50k+ daily'],
    explanation: 'Replace conversational "a lot of" with professional scale metrics.',
  },
];

interface ActiveTooltipState {
  type: 'verb' | 'metric' | 'grammar';
  from: number;
  to: number;
  original: string;
  suggestions: string[];
  explanation?: string;
  rect: DOMRect;
}

const highlightPluginKey = new PluginKey('realtimeHighlightPlugin');

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Type your content here...',
  minHeight = '120px',
  onOpenAiSuggestions,
  showAiButton = true,
  aiButtonLabel = 'AI Suggestions',
  className,
  sectionName = 'Resume Item',
  roleContext,
  defaultBulletList,
}) => {
  const isInternalUpdateRef = useRef(false);

  const isBulletSection = Boolean(
    defaultBulletList ??
      (sectionName.toLowerCase().includes('experience') ||
        sectionName.toLowerCase().includes('project') ||
        sectionName.toLowerCase().includes('education') ||
        sectionName.toLowerCase().includes('internship') ||
        sectionName.toLowerCase().includes('accomplishment'))
  );

  const [dismissedIssueIds, setDismissedIssueIds] = useState<Set<string>>(new Set());
  const [activeTooltip, setActiveTooltip] = useState<ActiveTooltipState | null>(null);
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const [isSelfAiModalOpen, setIsSelfAiModalOpen] = useState(false);
  const [aiAnchorRect, setAiAnchorRect] = useState<DOMRect | null>(null);
  const [mounted, setMounted] = useState(false);

  // Minimal AI Prompt Drawer State
  const [isPromptBarOpen, setIsPromptBarOpen] = useState(false);
  const [promptInput, setPromptInput] = useState('');
  const [isImproving, setIsImproving] = useState(false);
  const [improvementResult, setImprovementResult] = useState<{
    improvedHtml: string;
    improvedText: string;
    promptLabel: string;
  } | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Compute live grammar check results from current value
  const grammarResult = useMemo(() => {
    return checkGrammar(value || '');
  }, [value]);

  const activeGrammarIssues = useMemo(() => {
    return grammarResult.issues.filter((i) => !dismissedIssueIds.has(i.id));
  }, [grammarResult.issues, dismissedIssueIds]);

  const grammarIssuesRef = useRef<GrammarIssue[]>(activeGrammarIssues);
  useEffect(() => {
    grammarIssuesRef.current = activeGrammarIssues;
  }, [activeGrammarIssues]);

  // Dismiss tooltip on outside click or window resize
  useEffect(() => {
    if (!activeTooltip) return;
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.inline-improvement-highlight') && !target.closest('.fixed.z-50')) {
        setActiveTooltip(null);
      }
    };
    const handleResize = () => setActiveTooltip(null);

    document.addEventListener('mousedown', handleOutsideClick);
    window.addEventListener('resize', handleResize);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeTooltip]);

  // Unified Tooltip Trigger for Clicked In-Content Highlights
  const triggerHighlightTooltip = useCallback((highlightEl: HTMLElement) => {
    const ruleType = highlightEl.getAttribute('data-rule-type') as 'verb' | 'metric' | 'grammar';
    const from = parseInt(highlightEl.getAttribute('data-from') || '0', 10);
    const to = parseInt(highlightEl.getAttribute('data-to') || '0', 10);
    const original = highlightEl.getAttribute('data-original') || '';
    const rect = highlightEl.getBoundingClientRect();

    if (ruleType === 'grammar') {
      const issueId = highlightEl.getAttribute('data-issue-id');
      const issue = (grammarIssuesRef.current || []).find(
        (i) => i.id === issueId || i.originalText.toLowerCase() === original.toLowerCase()
      );
      if (issue) {
        setActiveTooltip({
          type: 'grammar',
          from,
          to,
          original,
          suggestions: [issue.suggestedText, ...(issue.alternativeSuggestions || [])].filter(Boolean),
          explanation: issue.explanation,
          rect,
        });
        return true;
      }
    } else {
      const ruleIdx = parseInt(highlightEl.getAttribute('data-rule-idx') || '0', 10);
      const rule = REALTIME_RULES[ruleIdx];
      if (rule) {
        setActiveTooltip({
          type: rule.type,
          from,
          to,
          original,
          suggestions: rule.suggestions,
          explanation: rule.explanation,
          rect,
        });
        return true;
      }
    }

    return false;
  }, []);

  // ProseMirror Plugin for Realtime In-Content Highlights (Weak Verbs, Metrics & Grammar)
  const realtimeHighlightExtension = useMemo(() => {
    return Extension.create({
      name: 'realtimeHighlightExtension',
      addProseMirrorPlugins() {
        return [
          new Plugin({
            key: highlightPluginKey,
            props: {
              decorations(state) {
                const decorations: Decoration[] = [];
                const grammarIssues = grammarIssuesRef.current || [];
                const occupiedRanges: { start: number; end: number }[] = [];

                state.doc.descendants((node, pos) => {
                  if (!node.isText || !node.text) return;
                  const text = node.text;

                  // 1. Highlight Realtime Content Improvement Opportunities (Weak Verbs & Vague Quantifiers)
                  REALTIME_RULES.forEach((rule, ruleIdx) => {
                    const regex = new RegExp(rule.regex.source, 'gi');
                    let match: RegExpExecArray | null;

                    while ((match = regex.exec(text)) !== null) {
                      const start = pos + match.index;
                      const end = start + match[0].length;
                      occupiedRanges.push({ start, end });
                      decorations.push(
                        Decoration.inline(start, end, {
                          class: cn(
                            'inline-improvement-highlight',
                            rule.type === 'verb' && 'inline-verb-highlight',
                            rule.type === 'metric' && 'inline-metric-highlight'
                          ),
                          'data-rule-type': rule.type,
                          'data-from': String(start),
                          'data-to': String(end),
                          'data-original': match[0],
                          'data-rule-idx': String(ruleIdx),
                        })
                      );
                    }
                  });

                  // 2. Highlight Grammar & Typos (skip if already covered by power verb/metric rule)
                  grammarIssues.forEach((issue) => {
                    const target = issue.originalText;
                    if (!target || target.length < 2) return;

                    const escaped = target.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                    const regex = new RegExp(`\\b${escaped}\\b`, 'gi');
                    let match: RegExpExecArray | null;

                    while ((match = regex.exec(text)) !== null) {
                      const start = pos + match.index;
                      const end = start + match[0].length;
                      const isOverlapping = occupiedRanges.some(
                        (r) => (start >= r.start && start < r.end) || (end > r.start && end <= r.end)
                      );
                      if (isOverlapping) continue;

                      decorations.push(
                        Decoration.inline(start, end, {
                          class: 'inline-improvement-highlight inline-grammar-highlight',
                          'data-rule-type': 'grammar',
                          'data-from': String(start),
                          'data-to': String(end),
                          'data-original': match[0],
                          'data-issue-id': issue.id,
                        })
                      );
                    }
                  });
                });

                return DecorationSet.create(state.doc, decorations);
              },
              handleClick(view, pos, event) {
                const target = event.target as HTMLElement;
                const highlightEl = target.closest('.inline-improvement-highlight') as HTMLElement;
                if (!highlightEl) {
                  return false;
                }
                return triggerHighlightTooltip(highlightEl);
              },
            },
          }),
        ];
      },
    });
  }, [triggerHighlightTooltip]);

  // Extension to auto-toggle bullet/ordered lists when typing •, -, *, 1., etc.
  const listAutoToggleExtension = useMemo(() => {
    return Extension.create({
      name: 'listAutoToggleExtension',
      addInputRules() {
        return [
          wrappingInputRule({
            find: /^\s*([•\-\*])\s$/,
            type: this.editor.schema.nodes.bulletList,
          }),
          wrappingInputRule({
            find: /^\s*(\d+)[.)]\s$/,
            type: this.editor.schema.nodes.orderedList,
            getAttributes: (match) => ({ start: +match[1] }),
            joinPredicate: (match, node) => node.childCount + node.attrs.start === +match[1],
          }),
        ];
      },
    });
  }, []);

  const initialContent = useMemo(() => {
    if (value && value.trim() !== '' && value !== '<p></p>' && value !== '<p><br></p>') {
      return value;
    }
    return isBulletSection ? '<ul><li><p></p></li></ul>' : '';
  }, [value, isBulletSection]);

  // Memoize Editor Extensions
  const editorExtensions = useMemo(
    () => [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc pl-5 space-y-1 my-1',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal pl-5 space-y-1 my-1',
          },
        },
        paragraph: {
          HTMLAttributes: {
            class: 'leading-relaxed mb-1 last:mb-0',
          },
        },
      }),
      Underline,
      Highlight.configure({
        multicolor: true,
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: {
          class: 'text-blue-600 underline font-medium cursor-pointer',
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      }),
      Placeholder.configure({
        placeholder,
        emptyEditorClass:
          'is-editor-empty before:content-[attr(data-placeholder)] before:text-slate-400 dark:before:text-slate-500 before:float-left before:pointer-events-none before:h-0 before:italic',
      }),
      CharacterCount,
      listAutoToggleExtension,
      realtimeHighlightExtension,
    ],
    [placeholder, listAutoToggleExtension, realtimeHighlightExtension]
  );

  // Initialize Tiptap Editor
  const editor = useEditor(
    {
      immediatelyRender: false,
      extensions: editorExtensions,
      content: initialContent,
    editorProps: {
      attributes: {
        class: cn(
          'prose prose-sm max-w-none focus:outline-none dark:prose-invert text-slate-900 dark:text-slate-100 text-sm leading-relaxed p-3.5 font-normal min-h-[var(--editor-min-height)]',
          '[&_p]:text-slate-900 dark:[&_p]:text-slate-100',
          '[&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_ul]:my-1.5',
          '[&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1 [&_ol]:my-1.5',
          '[&_li]:pl-0.5 [&_li]:leading-relaxed [&_li]:text-slate-900 dark:[&_li]:text-slate-100',
          '[&_b]:font-bold [&_strong]:font-bold [&_strong]:text-slate-900 dark:[&_strong]:text-white',
          '[&_i]:italic [&_em]:italic',
          '[&_u]:underline',
          '[&_a]:text-blue-600 dark:[&_a]:text-blue-400 [&_a]:underline'
        ),
        style: `--editor-min-height: ${minHeight};`,
      },
    },
    onFocus: ({ editor: ed }) => {
      if (isBulletSection && ed.isEmpty && !ed.isActive('bulletList')) {
        ed.commands.toggleBulletList();
      }
    },
    onUpdate: ({ editor: ed }) => {
      isInternalUpdateRef.current = true;
      const html = ed.getHTML();
      const isEmpty = ed.isEmpty || html === '<p></p>' || html === '<p><br></p>';
      onChange(isEmpty ? '' : html);
    },
  });

  // Re-render ProseMirror decorations when active issues change
  useEffect(() => {
    if (!editor || editor.isDestroyed) return;
    try {
      editor.view.dispatch(editor.state.tr);
    } catch {
      // Ignore
    }
  }, [activeGrammarIssues, editor]);

  // Sync external value to Tiptap editor if external change occurs
  useEffect(() => {
    if (isInternalUpdateRef.current) {
      isInternalUpdateRef.current = false;
      return;
    }
    if (!editor || editor.isFocused) return;
    const currentHtml = editor.getHTML();
    const normalizedProp = value || '';
    const isCurrentEmpty = editor.isEmpty || currentHtml === '<p></p>' || currentHtml === '<p><br></p>';
    const isPropEmpty = !normalizedProp || normalizedProp === '<p></p>' || normalizedProp === '<p><br></p>';

    if (isCurrentEmpty && isPropEmpty) return;

    if (currentHtml !== normalizedProp) {
      editor.commands.setContent(normalizedProp, { emitUpdate: false });
    }
  }, [value, editor]);

  // Instant 1-Click In-Content Replacement
  const handleApplyWordReplacement = (from: number, to: number, replacementText: string) => {
    if (!editor) return;
    isInternalUpdateRef.current = true;
    editor.chain().focus().setTextSelection({ from, to }).insertContent(replacementText).run();
    onChange(editor.getHTML());
    setActiveTooltip(null);
    setActionNotice(`Updated to "${replacementText}"`);
    setTimeout(() => setActionNotice(null), 2500);
  };

  // Auto-correct all detected spelling and grammar errors in one pass
  const handleAutoCorrectAll = () => {
    if (activeGrammarIssues.length === 0) return;
    const currentHtml = editor ? editor.getHTML() : value;
    const { updatedHtml, fixedCount } = autoCorrectText(currentHtml, activeGrammarIssues);
    if (editor) {
      isInternalUpdateRef.current = true;
      const { from } = editor.state.selection;
      editor.commands.setContent(updatedHtml, { emitUpdate: false });
      const maxPos = editor.state.doc.content.size;
      editor.commands.setTextSelection(Math.min(from, maxPos));
    }
    onChange(updatedHtml);
    setActiveTooltip(null);
    setActionNotice(`Auto-corrected ${fixedCount} ${fixedCount === 1 ? 'typo' : 'typos'}!`);
    setTimeout(() => setActionNotice(null), 3000);
  };

  // Link Dialog
  const handleSetLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Enter link URL (e.g. https://github.com/yourname):', previousUrl);

    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    const validUrl = url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:')
      ? url
      : `https://${url}`;

    editor.chain().focus().extendMarkRange('link').setLink({ href: validUrl }).run();
  }, [editor]);

  // Open AI Suggestions Modal (outside editor)
  const handleOpenAi = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (onOpenAiSuggestions) {
      onOpenAiSuggestions(rect);
    } else {
      setAiAnchorRect(rect);
      setIsSelfAiModalOpen(true);
    }
  };

  // Extract clean plain text from editor
  const getPlainText = useCallback(() => {
    if (editor) return editor.getText().trim();
    return (value || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  }, [editor, value]);

  // AI Prompt Execution
  const handleImproveContent = async (
    promptType: 'polish' | 'metrics' | 'verbs' | 'concise' | 'senior' | 'custom',
    customText?: string
  ) => {
    const rawText = getPlainText();
    if (!rawText) {
      setActionNotice('Please type some content first.');
      setTimeout(() => setActionNotice(null), 2500);
      return;
    }

    setIsImproving(true);
    setImprovementResult(null);

    const promptLabel =
      promptType === 'polish'
        ? 'Professional Polish'
        : promptType === 'metrics'
        ? 'Add Measurable Metrics'
        : promptType === 'verbs'
        ? 'Power Action Verbs'
        : promptType === 'concise'
        ? 'Concise & High Impact'
        : promptType === 'senior'
        ? 'Senior Leadership Scope'
        : customText || 'Custom Prompt';

    try {
      const requestPayload = {
        section: isBulletSection ? 'experience' : 'summary',
        targetRole: roleContext || 'Software Professional',
        seniorityLevel: promptType === 'senior' ? 'senior' : 'mid',
        tone: promptType === 'metrics' ? 'metrics' : promptType === 'senior' ? 'leadership' : 'technical',
        userFocusPrompt:
          customText ||
          (promptType === 'metrics'
            ? 'Convert into Google X-Y-Z formula with high-impact numbers and % metrics'
            : promptType === 'verbs'
            ? 'Start with powerful leadership action verbs and eliminate passive voice'
            : promptType === 'concise'
            ? 'Eliminate filler words, make tightly-worded, dense, and impactful'
            : 'Elevate writing quality, vocabulary, ATS keywords, and clarity'),
        existingContent: rawText,
        forceFresh: true,
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4500);

      const res = await fetch('/api/ai/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestPayload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data.suggestions && data.suggestions.length > 0) {
          const aiText = data.suggestions[0];
          const formattedHtml = formatImprovedHtml(aiText, isBulletSection);
          setImprovementResult({
            improvedHtml: formattedHtml,
            improvedText: aiText,
            promptLabel,
          });
          setIsImproving(false);
          return;
        }
      }
    } catch {
      // Fall through to instant local enhancement
    }

    // Instant Local Smart Content Enhancement Engine (0ms fallback)
    const enhanced = generateLocalEnhancement(rawText, promptType, roleContext, isBulletSection, customText);
    const formattedHtml = formatImprovedHtml(enhanced, isBulletSection);

    setImprovementResult({
      improvedHtml: formattedHtml,
      improvedText: enhanced,
      promptLabel,
    });
    setIsImproving(false);
  };

  const handleApplyImprovement = () => {
    if (!improvementResult) return;
    if (editor) {
      isInternalUpdateRef.current = true;
      editor.commands.setContent(improvementResult.improvedHtml, { emitUpdate: false });
    }
    onChange(improvementResult.improvedHtml);
    setImprovementResult(null);
    setIsPromptBarOpen(false);
    setActionNotice('Applied improvement!');
    setTimeout(() => setActionNotice(null), 3000);
  };

  const modalType: 'summary' | 'bullet' | 'project' | 'skills' | 'education' = useMemo(() => {
    const s = sectionName.toLowerCase();
    if (s.includes('summary') || s.includes('personal') || s.includes('profile')) return 'summary';
    if (s.includes('project')) return 'project';
    if (s.includes('education') || s.includes('academic') || s.includes('coursework')) return 'education';
    if (s.includes('skill')) return 'skills';
    return 'bullet';
  }, [sectionName]);

  const wordCount = editor?.storage.characterCount.words() ?? 0;
  const charCount = editor?.storage.characterCount.characters() ?? 0;

  return (
    <div
      className={cn(
        'group relative rounded-xl border border-slate-200/90 dark:border-border bg-white dark:bg-card shadow-2xs transition-all hover:border-slate-300 dark:hover:border-border focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 flex flex-col',
        className
      )}
    >
      {/* Realtime In-Text Highlight Styles */}
      <style jsx global>{`
        .inline-improvement-highlight {
          cursor: pointer;
          border-radius: 2px;
          transition: background-color 0.15s ease-in-out;
        }
        /* Weak Action Verbs: sleek purple wavy underline */
        .inline-verb-highlight {
          text-decoration: underline wavy #a855f7;
          text-decoration-thickness: 1.5px;
          text-underline-offset: 3px;
          background-color: rgba(168, 85, 247, 0.08);
        }
        .inline-verb-highlight:hover {
          background-color: rgba(168, 85, 247, 0.22);
        }
        /* Vague Metrics / Quantifiers: sleek blue wavy underline */
        .inline-metric-highlight {
          text-decoration: underline wavy #3b82f6;
          text-decoration-thickness: 1.5px;
          text-underline-offset: 3px;
          background-color: rgba(59, 130, 246, 0.08);
        }
        .inline-metric-highlight:hover {
          background-color: rgba(59, 130, 246, 0.22);
        }
        /* Typos / Grammar: subtle red wavy underline */
        .inline-grammar-highlight {
          text-decoration: underline wavy #ef4444;
          text-decoration-thickness: 1.5px;
          text-underline-offset: 3px;
          background-color: rgba(239, 68, 68, 0.08);
        }
        .inline-grammar-highlight:hover {
          background-color: rgba(239, 68, 68, 0.22);
        }
      `}</style>

      {/* 1. Sleek, Minimal Single-Line Toolbar (Never Overflows) */}
      <div className="border-b border-slate-100 dark:border-border bg-slate-50/70 dark:bg-muted/50 px-2 sm:px-2.5 py-1.5 flex items-center justify-between gap-1.5 text-slate-700 dark:text-slate-300">
        {/* Left Side: Standard Essential Formatting Controls */}
        <div className="flex items-center gap-0.5 shrink-0">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().undo().run()}
            disabled={!editor?.can().undo()}
            className="h-7 w-7 p-0 text-slate-500 hover:bg-slate-200/70 hover:text-slate-900 disabled:opacity-30 cursor-pointer"
            title="Undo (Ctrl+Z)"
          >
            <Undo2 className="h-3.5 w-3.5" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().redo().run()}
            disabled={!editor?.can().redo()}
            className="h-7 w-7 p-0 text-slate-500 hover:bg-slate-200/70 hover:text-slate-900 disabled:opacity-30 cursor-pointer"
            title="Redo (Ctrl+Y)"
          >
            <Redo2 className="h-3.5 w-3.5" />
          </Button>

          <div className="mx-1 h-4 w-px bg-slate-200 dark:bg-border" />

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().toggleBold().run()}
            className={cn(
              'h-7 w-7 p-0 text-slate-600 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-accent hover:text-slate-900 dark:hover:text-foreground cursor-pointer',
              editor?.isActive('bold') && 'bg-slate-200 dark:bg-accent text-slate-900 dark:text-foreground font-bold'
            )}
            title="Bold (Ctrl+B)"
          >
            <BoldIcon className="h-3.5 w-3.5" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            className={cn(
              'h-7 w-7 p-0 text-slate-600 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-accent hover:text-slate-900 dark:hover:text-foreground cursor-pointer',
              editor?.isActive('italic') && 'bg-slate-200 dark:bg-accent text-slate-900 dark:text-foreground'
            )}
            title="Italic (Ctrl+I)"
          >
            <ItalicIcon className="h-3.5 w-3.5" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().toggleUnderline().run()}
            className={cn(
              'h-7 w-7 p-0 text-slate-600 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-accent hover:text-slate-900 dark:hover:text-foreground cursor-pointer',
              editor?.isActive('underline') && 'bg-slate-200 dark:bg-accent text-slate-900 dark:text-foreground'
            )}
            title="Underline (Ctrl+U)"
          >
            <UnderlineIcon className="h-3.5 w-3.5" />
          </Button>

          <div className="mx-1 h-4 w-px bg-slate-200 dark:bg-border" />

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            className={cn(
              'h-7 w-7 p-0 text-slate-600 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-accent hover:text-slate-900 dark:hover:text-foreground cursor-pointer',
              editor?.isActive('bulletList') && 'bg-slate-200 dark:bg-accent text-slate-900 dark:text-foreground'
            )}
            title="Bullet List"
          >
            <ListIcon className="h-3.5 w-3.5" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            className={cn(
              'h-7 w-7 p-0 text-slate-600 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-accent hover:text-slate-900 dark:hover:text-foreground cursor-pointer',
              editor?.isActive('orderedList') && 'bg-slate-200 dark:bg-accent text-slate-900 dark:text-foreground'
            )}
            title="Numbered List"
          >
            <ListOrderedIcon className="h-3.5 w-3.5" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleSetLink}
            className={cn(
              'h-7 w-7 p-0 text-slate-600 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-accent hover:text-slate-900 dark:hover:text-foreground cursor-pointer',
              editor?.isActive('link') && 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300'
            )}
            title="Add Hyperlink"
          >
            <Link2 className="h-3.5 w-3.5" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().unsetAllMarks().clearNodes().run()}
            className="h-7 w-7 p-0 text-slate-400 hover:bg-slate-200/70 dark:hover:bg-accent hover:text-slate-800 dark:hover:text-foreground cursor-pointer"
            title="Clear Formatting"
          >
            <RemoveFormatting className="h-3.5 w-3.5" />
          </Button>
        </div>

        {/* Right Side: Minimal Icon Controls (Clean, Never Clipped) */}
        <div className="flex items-center gap-1 shrink-0 ml-auto pl-1">
          {/* Typo Status Icon with 1-Click Auto-Fix */}
          {activeGrammarIssues.length > 0 && (
            <button
              type="button"
              onClick={handleAutoCorrectAll}
              className="inline-flex items-center gap-1 h-7 px-1.5 rounded-md text-[11px] font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/60 border border-amber-200/80 dark:border-amber-800/60 cursor-pointer transition-colors shrink-0"
              title={`Auto-fix ${activeGrammarIssues.length} typos`}
            >
              <CheckCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span className="text-[10.5px]">{activeGrammarIssues.length}</span>
            </button>
          )}

          {/* AI Prompt Drawer Trigger - Compact Icon Button */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              setIsPromptBarOpen((prev) => !prev);
              setImprovementResult(null);
            }}
            className={cn(
              'h-7 w-7 p-0 rounded-lg transition-all cursor-pointer shrink-0',
              isPromptBarOpen
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-purple-700 dark:text-purple-300 hover:bg-purple-100/70 dark:hover:bg-purple-950/50'
            )}
            title="Ask AI to improve or polish"
          >
            <Sparkles className="h-3.5 w-3.5" />
          </Button>

          {/* Static Library Catalog Trigger */}
          {showAiButton && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleOpenAi}
              className="h-7 w-7 p-0 text-slate-400 hover:text-slate-800 dark:hover:text-foreground hover:bg-slate-200/70 dark:hover:bg-accent rounded-lg cursor-pointer shrink-0"
              title={aiButtonLabel || 'Browse Suggestions Library'}
            >
              <BookOpen className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </div>

      {/* 2. Collapsible Minimal AI Prompt Bar */}
      {isPromptBarOpen && (
        <div className="p-2.5 bg-purple-50/50 dark:bg-purple-950/20 border-b border-purple-100 dark:border-purple-900/40 space-y-2 animate-in fade-in duration-100">
          <div className="flex items-center gap-1.5">
            <div className="relative flex-1">
              <input
                type="text"
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !isImproving && promptInput.trim()) {
                    e.preventDefault();
                    handleImproveContent('custom', promptInput);
                  }
                }}
                placeholder="Ask AI: e.g. 'Add latency metrics', 'Senior scope', 'Make punchy'..."
                className="w-full h-7 pl-7 pr-2.5 text-xs bg-white dark:bg-card border border-purple-200 dark:border-purple-800 rounded-md text-slate-900 dark:text-foreground placeholder:text-slate-400 focus:outline-none focus:border-purple-500 shadow-2xs"
              />
              <Wand2 className="w-3 h-3 text-purple-600 dark:text-purple-400 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <Button
              type="button"
              size="sm"
              disabled={isImproving || !promptInput.trim()}
              onClick={() => handleImproveContent('custom', promptInput)}
              className="h-7 px-2.5 text-xs font-semibold bg-purple-700 hover:bg-purple-800 text-white rounded-md shadow-2xs gap-1 cursor-pointer shrink-0 disabled:opacity-40"
            >
              {isImproving ? <Loader2 className="w-3 h-3 animate-spin" /> : <span>Improve</span>}
            </Button>

            <button
              type="button"
              onClick={() => {
                setIsPromptBarOpen(false);
                setImprovementResult(null);
              }}
              className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-foreground cursor-pointer shrink-0"
              title="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Presets */}
          <div className="flex items-center gap-1 flex-wrap">
            <button
              type="button"
              disabled={isImproving}
              onClick={() => handleImproveContent('polish')}
              className="px-2 py-0.5 text-[10.5px] font-medium rounded-md bg-white dark:bg-card hover:bg-purple-100 dark:hover:bg-purple-900/50 text-slate-700 dark:text-slate-200 border border-purple-200/70 dark:border-purple-800/60 cursor-pointer transition-colors disabled:opacity-40"
            >
              ✨ Polish
            </button>
            <button
              type="button"
              disabled={isImproving}
              onClick={() => handleImproveContent('metrics')}
              className="px-2 py-0.5 text-[10.5px] font-medium rounded-md bg-white dark:bg-card hover:bg-blue-100 dark:hover:bg-blue-900/50 text-slate-700 dark:text-slate-200 border border-blue-200/70 dark:border-blue-800/60 cursor-pointer transition-colors disabled:opacity-40"
            >
              📊 Add Metrics
            </button>
            <button
              type="button"
              disabled={isImproving}
              onClick={() => handleImproveContent('verbs')}
              className="px-2 py-0.5 text-[10.5px] font-medium rounded-md bg-white dark:bg-card hover:bg-amber-100 dark:hover:bg-amber-900/50 text-slate-700 dark:text-slate-200 border border-amber-200/70 dark:border-amber-800/60 cursor-pointer transition-colors disabled:opacity-40"
            >
              ⚡ Power Verbs
            </button>
            <button
              type="button"
              disabled={isImproving}
              onClick={() => handleImproveContent('concise')}
              className="px-2 py-0.5 text-[10.5px] font-medium rounded-md bg-white dark:bg-card hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-slate-700 dark:text-slate-200 border border-emerald-200/70 dark:border-emerald-800/60 cursor-pointer transition-colors disabled:opacity-40"
            >
              ✂️ Concise
            </button>
          </div>
        </div>
      )}

      {/* 3. AI Generated Improvement Preview Card */}
      {improvementResult && (
        <div className="m-2 p-2.5 bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/70 rounded-lg space-y-2 animate-in fade-in duration-100">
          <div className="flex items-center justify-between text-[11px] font-bold text-emerald-900 dark:text-emerald-200">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              <span>AI Suggestion ({improvementResult.promptLabel})</span>
            </span>
            <button
              type="button"
              onClick={() => setImprovementResult(null)}
              className="text-slate-400 hover:text-slate-700 p-0.5 cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
          </div>

          <p className="text-xs text-slate-800 dark:text-foreground leading-relaxed font-medium bg-white dark:bg-card p-2 rounded border border-emerald-100 dark:border-emerald-900/50">
            {improvementResult.improvedText}
          </p>

          <div className="flex items-center justify-end gap-1.5 pt-0.5">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setImprovementResult(null)}
              className="h-6 text-[11px] text-slate-500 cursor-pointer"
            >
              Discard
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleApplyImprovement}
              className="h-6 px-2.5 text-[11px] font-bold bg-emerald-700 hover:bg-emerald-800 text-white rounded cursor-pointer gap-1"
            >
              <Check className="w-3 h-3" />
              <span>Apply</span>
            </Button>
          </div>
        </div>
      )}

      {/* 4. Editor Editable Canvas */}
      <div
        className="relative flex-1 cursor-text bg-white dark:bg-card rounded-b-xl text-slate-900 dark:text-foreground overflow-y-auto"
        onClick={(e) => {
          const target = e.target as HTMLElement;
          const highlightEl = target.closest('.inline-improvement-highlight') as HTMLElement;
          if (highlightEl) {
            triggerHighlightTooltip(highlightEl);
          }
        }}
      >
        <EditorContent editor={editor} />
      </div>

      {/* 5. Minimal Bottom Bar: Live Feedback & Word/Char Counter */}
      <div className="flex items-center justify-between border-t border-slate-100 dark:border-border bg-slate-50/40 dark:bg-muted/30 px-3 py-1 text-[11px] text-slate-400 dark:text-muted-foreground">
        <div className="flex items-center gap-2">
          {actionNotice ? (
            <span className="text-primary font-semibold flex items-center gap-1 animate-in fade-in duration-150">
              <Check className="w-3 h-3 text-primary" />
              {actionNotice}
            </span>
          ) : (
            <span className="text-slate-400 dark:text-muted-foreground text-[10.5px]">
              Click highlighted words to improve
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 font-mono text-[10.5px]">
          <span>{wordCount} words</span>
          <span className="text-slate-300 dark:text-muted-foreground/40">•</span>
          <span>{charCount} chars</span>
        </div>
      </div>

      {/* 6. Floating In-Text Popover: Attached directly to clicked highlighted word */}
      {mounted && activeTooltip && createPortal(
        <div
          className="fixed z-50 animate-in fade-in zoom-in-95 duration-100"
          style={{
            top: Math.max(10, activeTooltip.rect.top - 8),
            left: Math.min(window.innerWidth - 300, Math.max(10, activeTooltip.rect.left - 20)),
            transform: 'translateY(-100%)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-72 bg-white dark:bg-card rounded-xl shadow-2xl border border-slate-200/90 dark:border-border p-3 space-y-2 text-xs">
            {/* Popover Header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-border pb-1.5">
              <div className="flex items-center gap-1.5">
                <span
                  className={cn(
                    'px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider',
                    activeTooltip.type === 'verb' &&
                      'bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800',
                    activeTooltip.type === 'metric' &&
                      'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800',
                    activeTooltip.type === 'grammar' &&
                      'bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'
                  )}
                >
                  {activeTooltip.type === 'verb'
                    ? '⚡ Power Verb'
                    : activeTooltip.type === 'metric'
                    ? '📊 Quantify'
                    : 'Typo / Grammar'}
                </span>
                <span className="text-slate-400 dark:text-muted-foreground text-[11px] truncate max-w-[120px]">
                  "{activeTooltip.original}"
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveTooltip(null)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-foreground p-0.5 rounded cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Explanation */}
            {activeTooltip.explanation && (
              <p className="text-[11px] text-slate-500 dark:text-muted-foreground leading-tight">
                {activeTooltip.explanation}
              </p>
            )}

            {/* Instant 1-Click Replacement Chips */}
            <div className="flex items-center gap-1 flex-wrap pt-0.5">
              {activeTooltip.suggestions.map((sug) => (
                <button
                  key={sug}
                  type="button"
                  onClick={() => handleApplyWordReplacement(activeTooltip.from, activeTooltip.to, sug)}
                  className="px-2 py-0.5 text-xs font-semibold rounded-md bg-slate-50 dark:bg-muted hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/20 dark:hover:text-primary-foreground border border-slate-200 dark:border-border transition-all cursor-pointer active:scale-95 shadow-2xs"
                >
                  {sug}
                </button>
              ))}
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Standalone Fallback Modal for Static Suggestions Catalog */}
      {isSelfAiModalOpen && (
        <AiSuggestionModal
          isOpen={isSelfAiModalOpen}
          onClose={() => setIsSelfAiModalOpen(false)}
          anchorRect={aiAnchorRect}
          type={modalType}
          roleContext={roleContext}
          existingText={editor?.getText() || value}
          onInsert={(text, mode) => {
            if (editor) {
              isInternalUpdateRef.current = true;
              if (mode === 'replace') {
                const html = formatImprovedHtml(text, isBulletSection);
                editor.commands.setContent(html, { emitUpdate: false });
                onChange(html);
              } else {
                if (isBulletSection) {
                  editor.commands.insertContent(`<li><p>${escapeHtml(text)}</p></li>`);
                } else {
                  editor.commands.insertContent(` ${escapeHtml(text)}`);
                }
                onChange(editor.getHTML());
              }
            }
            setIsSelfAiModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

// ==========================================
// SMART LOCAL CONTENT ENHANCEMENT ENGINE
// ==========================================

function generateLocalEnhancement(
  text: string,
  promptType: string,
  roleContext?: string,
  isBulletSection?: boolean,
  customPrompt?: string
): string {
  const lines = text
    .split(/\n|•|\r/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  if (lines.length === 0) lines.push(text);

  const enhancedLines = lines.map((line) => {
    let clean = line;

    clean = clean.replace(/^(?:I\s+|We\s+|I\s+was\s+|We\s+were\s+)/i, '');
    clean = clean.replace(/^(?:responsible\s+for|duties\s+included|tasked\s+with|worked\s+on\s+helping)\s+/i, '');
    clean = clean.replace(/^(?:assisted\s+in|helped\s+to|worked\s+on|handled|supported)\s+/i, '');

    const role = (roleContext || '').toLowerCase();
    const actionVerbs =
      role.includes('manager') || role.includes('lead')
        ? ['Spearheaded', 'Orchestrated', 'Directed', 'Mobilized', 'Championed']
        : role.includes('design')
        ? ['Architected', 'Crafted', 'Engineered', 'Overhauled', 'Pioneered']
        : ['Architected', 'Engineered', 'Spearheaded', 'Streamlined', 'Overhauled', 'Automated'];

    const chosenVerb = actionVerbs[Math.floor(Math.random() * actionVerbs.length)];

    const firstWord = clean.split(/\s+/)[0] || '';
    if (!firstWord.endsWith('ed') && !firstWord.endsWith('d') && firstWord !== 'Led' && firstWord !== 'Built') {
      clean = `${chosenVerb} ${clean.charAt(0).toLowerCase()}${clean.slice(1)}`;
    } else {
      clean = `${clean.charAt(0).toUpperCase()}${clean.slice(1)}`;
    }

    if (promptType === 'metrics' || !/[\d]+[%kKmMbB]?|\$[\d]+/.test(clean)) {
      const metricOptions = [
        'reducing processing turnaround latency by 35%',
        'improving operational throughput by 40%',
        'boosting user engagement and satisfaction by 28%',
        'cutting recurring operating expenses by 22% ($18k/yr)',
        'scaling reliable system performance for 20,000+ active users',
        'slashing defect recurrence rate by 45%',
      ];
      const metric = metricOptions[Math.floor(Math.random() * metricOptions.length)];
      if (!clean.includes('by ') && !clean.includes('resulting in')) {
        clean = `${clean.replace(/[.,;]$/, '')}, ${metric}.`;
      }
    }

    if (promptType === 'concise') {
      clean = clean
        .replace(/\bin order to\b/gi, 'to')
        .replace(/\bsuccessfully\b/gi, '')
        .replace(/\bvarious different\b/gi, 'diverse')
        .replace(/\ba large number of\b/gi, 'numerous')
        .replace(/\bat the present time\b/gi, 'currently')
        .replace(/\s{2,}/g, ' ')
        .trim();
    }

    if (promptType === 'senior') {
      if (!clean.includes('cross-functional') && !clean.includes('team') && !clean.includes('squad')) {
        clean = `${clean.replace(/[.,;]$/, '')}, mentoring team contributors and establishing technical standards.`;
      }
    }

    if (customPrompt && customPrompt.trim()) {
      const keywords = customPrompt.trim();
      if (!clean.toLowerCase().includes(keywords.toLowerCase())) {
        clean = `${clean.replace(/[.,;]$/, '')} with specialized focus on ${keywords}.`;
      }
    }

    return clean.endsWith('.') ? clean : `${clean}.`;
  });

  return enhancedLines.join(isBulletSection ? '\n' : ' ');
}

function formatImprovedHtml(text: string, isBullet: boolean): string {
  const lines = text
    .split(/\n|•|\r/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  if (isBullet) {
    const listItems = lines.map((l) => `<li><p>${escapeHtml(l)}</p></li>`).join('');
    return `<ul>${listItems}</ul>`;
  }
  return `<p>${escapeHtml(text)}</p>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
