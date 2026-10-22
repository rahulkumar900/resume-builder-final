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
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { checkGrammar, applySingleFix, autoCorrectText } from '@/lib/grammar/grammarEngine';
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

const grammarPluginKey = new PluginKey('grammarHighlightPlugin');

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
  const [activeTooltip, setActiveTooltip] = useState<{
    issue: GrammarIssue;
    rect: DOMRect;
  } | null>(null);
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const [isSelfAiModalOpen, setIsSelfAiModalOpen] = useState(false);
  const [aiAnchorRect, setAiAnchorRect] = useState<DOMRect | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle ESC key to exit full screen
  useEffect(() => {
    if (!isFullScreen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFullScreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullScreen]);

  // Lock body scroll when full screen focus sheet is active
  useEffect(() => {
    if (isFullScreen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isFullScreen]);

  // Compute live grammar check results from current value
  const grammarResult = useMemo(() => {
    return checkGrammar(value || '');
  }, [value]);

  const activeIssues = useMemo(() => {
    return grammarResult.issues.filter((i) => !dismissedIssueIds.has(i.id));
  }, [grammarResult.issues, dismissedIssueIds]);

  // Keep a ref to the latest active issues for ProseMirror plugin decorations
  const issuesRef = useRef<GrammarIssue[]>(activeIssues);
  useEffect(() => {
    issuesRef.current = activeIssues;
  }, [activeIssues]);

  // Dismiss tooltip on scroll or window resize
  useEffect(() => {
    if (!activeTooltip) return;
    const handleScrollOrResize = () => {
      setActiveTooltip(null);
    };
    window.addEventListener('scroll', handleScrollOrResize, true);
    window.addEventListener('resize', handleScrollOrResize);
    return () => {
      window.removeEventListener('scroll', handleScrollOrResize, true);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [activeTooltip]);

  // Inline Grammar Highlighting Tiptap Extension
  const grammarExtension = useMemo(() => {
    return Extension.create({
      name: 'grammarInlineHighlight',
      addProseMirrorPlugins() {
        return [
          new Plugin({
            key: grammarPluginKey,
            props: {
              decorations(state) {
                const issues = issuesRef.current;
                if (!issues || issues.length === 0) {
                  return DecorationSet.empty;
                }

                const decorations: Decoration[] = [];
                state.doc.descendants((node, pos) => {
                  if (!node.isText || !node.text) return;
                  const text = node.text;

                  issues.forEach((issue) => {
                    const target = issue.originalText;
                    if (!target || target.length < 2) return;

                    // Match whole-word boundary
                    const escaped = target.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                    const regex = new RegExp(`\\b${escaped}\\b`, 'gi');
                    let match: RegExpExecArray | null;

                    while ((match = regex.exec(text)) !== null) {
                      const start = pos + match.index;
                      const end = start + match[0].length;
                      decorations.push(
                        Decoration.inline(start, end, {
                          class: 'inline-grammar-issue',
                          'data-issue-id': issue.id,
                          'data-category': issue.category,
                          'data-original': match[0],
                        })
                      );
                    }
                  });
                });

                return DecorationSet.create(state.doc, decorations);
              },
              handleClick(view, pos, event) {
                const target = event.target as HTMLElement;
                const issueEl = target.closest('.inline-grammar-issue') as HTMLElement;
                if (issueEl) {
                  const issueId = issueEl.getAttribute('data-issue-id');
                  const found = issuesRef.current.find((i) => i.id === issueId);
                  if (found) {
                    const rect = issueEl.getBoundingClientRect();
                    setActiveTooltip({
                      issue: found,
                      rect,
                    });
                    return true;
                  }
                }
                setActiveTooltip(null);
                return false;
              },
            },
          }),
        ];
      },
    });
  }, []);

  // Extension to auto-toggle bullet/ordered lists when typing •, -, *, 1., etc.
  const listAutoToggleExtension = useMemo(() => {
    return Extension.create({
      name: 'listAutoToggleExtension',
      addInputRules() {
        return [
          // Typing • (bullet), - (hyphen), * (asterisk) + space automatically wraps into bulletList
          wrappingInputRule({
            find: /^\s*([•\-\*])\s$/,
            type: this.editor.schema.nodes.bulletList,
          }),
          // Typing 1. or 1) + space automatically wraps into orderedList
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

  // Initialize Tiptap Editor
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
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
      grammarExtension,
    ],
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
      // Auto-toggle into a bullet list if entering an empty bullet-based section
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
      // Ignore if editor not ready
    }
  }, [activeIssues, editor]);

  // Sync external value to Tiptap editor if external change occurs (e.g. template reset, AI insert)
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

  // Apply single inline grammar fix
  const handleApplyFix = (issue: GrammarIssue) => {
    const updatedHtml = applySingleFix(value, issue);
    if (editor) {
      editor.commands.setContent(updatedHtml, { emitUpdate: false });
    }
    onChange(updatedHtml);
    setDismissedIssueIds((prev) => new Set([...prev, issue.id]));
    setActiveTooltip(null);
    setActionNotice(`Fixed: "${issue.suggestedText}"`);
    setTimeout(() => setActionNotice(null), 2500);
  };

  // Auto-correct all detected spelling and grammar errors in one pass
  const handleAutoCorrectAll = () => {
    if (activeIssues.length === 0) return;
    const { updatedHtml, fixedCount } = autoCorrectText(value, activeIssues);
    if (editor) {
      editor.commands.setContent(updatedHtml, { emitUpdate: false });
    }
    onChange(updatedHtml);
    setActiveTooltip(null);
    setActionNotice(`Auto-corrected ${fixedCount} ${fixedCount === 1 ? 'typo' : 'typos'}!`);
    setTimeout(() => setActionNotice(null), 3000);
  };

  const handleIgnore = (id: string) => {
    setDismissedIssueIds((prev) => new Set([...prev, id]));
    setActiveTooltip(null);
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

  // Determine modal type according to resume section
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
        isFullScreen &&
          'fixed inset-0 z-50 rounded-none border-none shadow-2xl h-[100dvh] w-screen overflow-hidden bg-white dark:bg-card',
        className
      )}
    >
      {/* Inline Grammar Squiggly Styling */}
      <style jsx global>{`
        .inline-grammar-issue {
          text-decoration-line: underline;
          text-decoration-style: wavy;
          text-decoration-color: #ef4444;
          text-decoration-thickness: 1.5px;
          text-underline-offset: 3px;
          text-decoration-skip-ink: none;
          background-color: rgba(239, 68, 68, 0.08);
          border-radius: 2px;
          cursor: pointer;
          transition: background-color 0.15s ease-in-out;
        }
        .inline-grammar-issue:hover {
          background-color: rgba(239, 68, 68, 0.2);
        }
        .inline-grammar-issue[data-category="capitalization"],
        .inline-grammar-issue[data-category="style"] {
          text-decoration-color: #f59e0b;
          background-color: rgba(245, 158, 11, 0.08);
        }
        .inline-grammar-issue[data-category="capitalization"]:hover,
        .inline-grammar-issue[data-category="style"]:hover {
          background-color: rgba(245, 158, 11, 0.2);
        }
      `}</style>

      {/* Full-Screen Focus Top Bar */}
      {isFullScreen && (
        <div className="h-12 px-3.5 sm:px-5 border-b border-slate-200 dark:border-border flex items-center justify-between bg-white dark:bg-card shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-foreground">
              {sectionName}
            </span>
            <span className="text-[11px] text-slate-400 dark:text-muted-foreground font-mono">
              &bull; Focus Mode
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              size="sm"
              onClick={() => setIsFullScreen(false)}
              className="h-7.5 px-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs gap-1 shadow-xs cursor-pointer rounded-lg"
            >
              <span>Done</span>
              <Check className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      )}

      {/* Editor Main Toolbar */}
      <div className="flex items-center justify-between gap-1.5 border-b border-slate-100 dark:border-border bg-slate-50/70 dark:bg-muted/50 px-2 sm:px-2.5 py-1.5 text-slate-700 dark:text-slate-300 overflow-x-auto no-scrollbar">
        {/* Left Side: Standard Formatting Controls */}
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

          <div className="mx-1 h-4 w-px bg-slate-200" />

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().toggleBold().run()}
            className={cn(
              'h-7 w-7 p-0 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900 cursor-pointer',
              editor?.isActive('bold') && 'bg-slate-200 text-slate-900 font-bold'
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
              'h-7 w-7 p-0 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900 cursor-pointer',
              editor?.isActive('italic') && 'bg-slate-200 text-slate-900'
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
              'h-7 w-7 p-0 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900 cursor-pointer',
              editor?.isActive('underline') && 'bg-slate-200 text-slate-900'
            )}
            title="Underline (Ctrl+U)"
          >
            <UnderlineIcon className="h-3.5 w-3.5" />
          </Button>

          <div className="mx-1 h-4 w-px bg-slate-200" />

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            className={cn(
              'h-7 w-7 p-0 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900 cursor-pointer',
              editor?.isActive('bulletList') && 'bg-slate-200 text-slate-900'
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
              'h-7 w-7 p-0 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900 cursor-pointer',
              editor?.isActive('orderedList') && 'bg-slate-200 text-slate-900'
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
              'h-7 w-7 p-0 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900 cursor-pointer',
              editor?.isActive('link') && 'bg-blue-100 text-blue-700'
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
            className="h-7 w-7 p-0 text-slate-400 hover:bg-slate-200/70 hover:text-slate-800 cursor-pointer"
            title="Clear Formatting"
          >
            <RemoveFormatting className="h-3.5 w-3.5" />
          </Button>
        </div>

        {/* Right Side: Inline Grammar Status & AI Suggestions Trigger */}
        <div className="flex items-center gap-1.5 shrink-0 ml-auto pl-2">
          {/* Grammar Status Indicator with 1-Click Auto-Fix */}
          <div className="flex items-center gap-1.5">
            {activeIssues.length === 0 ? (
              <span
                className="inline-flex items-center justify-center w-7 h-7 rounded-md text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60"
                title="Grammar & spelling clean"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              </span>
            ) : (
              <div className="flex items-center gap-1">
                <span
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200/90 dark:border-amber-800/60 cursor-default"
                  title="Click underlined words in editor to review & fix"
                >
                  <AlertTriangle className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                  <span>
                    {activeIssues.length} {activeIssues.length === 1 ? 'typo' : 'typos'}
                  </span>
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleAutoCorrectAll}
                  className="h-7 px-2 text-[11px] font-bold text-amber-800 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/50 rounded-md cursor-pointer gap-1 transition-colors"
                  title="Auto-correct all detected spelling & grammar issues"
                >
                  <CheckCheck className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                  <span className="hidden sm:inline">Auto-Fix</span>
                </Button>
              </div>
            )}
          </div>

          {/* AI Suggestions Trigger - Icon only with tooltip */}
          {showAiButton && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleOpenAi}
              className="h-7 w-7 p-0 text-purple-700 dark:text-purple-300 bg-purple-50/70 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800/60 hover:bg-purple-100 dark:hover:bg-purple-900/50 hover:text-purple-900 shadow-2xs cursor-pointer transition-all hover:scale-105"
              title={aiButtonLabel || "AI Suggestions (Live generation & pre-stored library)"}
            >
              <Sparkles className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
            </Button>
          )}

          {/* Full-Screen Focus Mode Button */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setIsFullScreen(!isFullScreen)}
            className={cn(
              "h-7 px-1.5 sm:px-2 text-xs font-semibold rounded-md transition-all cursor-pointer flex items-center gap-1 shrink-0",
              isFullScreen
                ? "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 font-bold"
                : "text-slate-500 dark:text-slate-400 hover:bg-slate-200/70 dark:hover:bg-accent hover:text-slate-900"
            )}
            title={isFullScreen ? "Exit Focus Mode (Esc)" : "Full-Screen Focus Mode"}
          >
            {isFullScreen ? (
              <>
                <Minimize2 className="h-3.5 w-3.5" />
                <span className="text-[11px]">Exit</span>
              </>
            ) : (
              <>
                <Maximize2 className="h-3.5 w-3.5" />
                <span className="text-[11px] font-medium hidden sm:inline">Focus</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Editor Editable Canvas */}
      <div
        className={cn(
          "relative flex-1 cursor-text bg-white dark:bg-card rounded-b-xl text-slate-900 dark:text-foreground overflow-y-auto",
          isFullScreen && "p-4 sm:p-8 text-base max-w-4xl mx-auto w-full leading-relaxed"
        )}
      >
        <EditorContent editor={editor} className={cn(isFullScreen && "min-h-[50vh]")} />
      </div>

      {/* Clean Bottom Bar: Character / Word Counts & Action Feedback */}
      <div
        className={cn(
          "flex items-center justify-between border-t border-slate-100/90 dark:border-border bg-slate-50/40 dark:bg-muted/30 px-3 py-1 text-[11px] text-slate-400 dark:text-muted-foreground",
          isFullScreen && "pb-[env(safe-area-inset-bottom,8px)] sm:px-6"
        )}
      >
        <div className="flex items-center gap-2">
          {actionNotice ? (
            <span className="text-primary font-semibold flex items-center gap-1 animate-in fade-in duration-150">
              <Check className="w-3 h-3 text-primary" />
              {actionNotice}
            </span>
          ) : (
            <span className="text-slate-400 dark:text-muted-foreground">
              {activeIssues.length > 0 ? 'Click any underlined word to review correction' : 'Ready'}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 font-mono text-[10.5px]">
          <span>{wordCount} words</span>
          <span className="text-slate-300 dark:text-muted-foreground/40">•</span>
          <span>{charCount} chars</span>
        </div>
      </div>

      {/* Floating Inline Grammar Popover attached to underlined word */}
      {mounted && activeTooltip && createPortal(
        <div
          className="fixed z-50 animate-in fade-in zoom-in-95 duration-150"
          style={{
            top: Math.max(10, activeTooltip.rect.top - 8),
            left: Math.min(window.innerWidth - 290, Math.max(10, activeTooltip.rect.left - 20)),
            transform: 'translateY(-100%)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-72 bg-white rounded-xl shadow-xl border border-slate-200/90 p-3 space-y-2.5 text-xs text-slate-800">
            {/* Popover Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
              <div className="flex items-center gap-1.5">
                <span
                  className={cn(
                    'px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider',
                    activeTooltip.issue.category === 'spelling' && 'bg-red-50 text-red-700 border border-red-200',
                    activeTooltip.issue.category === 'capitalization' && 'bg-blue-50 text-blue-700 border border-blue-200',
                    activeTooltip.issue.category === 'grammar' && 'bg-purple-50 text-purple-700 border border-purple-200',
                    activeTooltip.issue.category === 'style' && 'bg-amber-50 text-amber-700 border border-amber-200'
                  )}
                >
                  {activeTooltip.issue.category}
                </span>
                <span className="text-slate-400 text-[11px]">Issue</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveTooltip(null)}
                className="text-slate-400 hover:text-slate-700 p-0.5 rounded cursor-pointer"
                title="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Word Comparison */}
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="line-through text-red-500 bg-red-50 px-1.5 py-0.5 rounded">
                {activeTooltip.issue.originalText}
              </span>
              <ArrowRight className="w-3 h-3 text-slate-400 shrink-0" />
              <span className="font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                {activeTooltip.issue.suggestedText}
              </span>
            </div>

            {/* Explanation */}
            <p className="text-[11px] text-slate-600 leading-snug">
              {activeTooltip.issue.explanation}
            </p>

            {/* Action Buttons */}
            <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100">
              <Button
                type="button"
                size="sm"
                onClick={() => handleApplyFix(activeTooltip.issue)}
                className="h-7 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs gap-1 cursor-pointer flex-1"
              >
                <Check className="w-3 h-3" />
                <span>Replace with &quot;{activeTooltip.issue.suggestedText}&quot;</span>
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleIgnore(activeTooltip.issue.id)}
                className="h-7 px-2 text-slate-500 hover:text-slate-800 text-xs cursor-pointer"
              >
                Ignore
              </Button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Fallback AI Suggestion Modal if parent did not provide onOpenAiSuggestions */}
      {isSelfAiModalOpen && (
        <AiSuggestionModal
          isOpen={isSelfAiModalOpen}
          onClose={() => setIsSelfAiModalOpen(false)}
          anchorRect={aiAnchorRect}
          type={modalType}
          roleContext={roleContext || 'Professional'}
          existingText={editor?.getText() || ''}
          onInsert={(text, mode) => {
            if (!editor) return;
            if (mode === 'replace') {
              editor.commands.setContent(`<p>${text}</p>`, { emitUpdate: true });
            } else {
              if (editor.isActive('bulletList')) {
                editor.commands.insertContent(`<li>${text}</li>`);
              } else {
                editor.commands.insertContent(`<p>${text}</p>`);
              }
            }
            setActionNotice('Inserted suggestion!');
            setTimeout(() => setActionNotice(null), 2500);
            setIsSelfAiModalOpen(false);
          }}
        />
      )}
    </div>
  );
};
