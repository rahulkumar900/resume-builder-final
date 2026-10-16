'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Briefcase, Check, Loader2 } from 'lucide-react';
import { searchJobTitlesFromDb, recordJobTitleUsage } from '@/lib/services/jobTitleService';

interface JobTitleAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  containerClassName?: string;
  inputClassName?: string;
  required?: boolean;
  autoFocus?: boolean;
  icon?: React.ReactNode;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  id?: string;
  name?: string;
  disabled?: boolean;
}

export const JobTitleAutocomplete: React.FC<JobTitleAutocompleteProps> = ({
  value,
  onChange,
  placeholder = 'e.g. Financial Analyst or Software Engineer',
  className = '',
  containerClassName = '',
  inputClassName = '',
  required = false,
  autoFocus = false,
  icon,
  onKeyDown,
  id,
  name,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch suggestions with debounce
  const fetchSuggestions = useCallback(async (query: string) => {
    setIsLoading(true);
    try {
      const results = await searchJobTitlesFromDb(query, 6);
      setSuggestions(results);
    } catch {
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Trigger search on value change with 150ms debounce
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (!isOpen) return;

    debounceTimerRef.current = setTimeout(() => {
      fetchSuggestions(value);
    }, 150);

    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [value, isOpen, fetchSuggestions]);

  // Click outside to dismiss
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (title: string) => {
    onChange(title);
    setIsOpen(false);
    setHighlightedIndex(-1);
    recordJobTitleUsage(title);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown') {
        setIsOpen(true);
        fetchSuggestions(value);
        return;
      }
      onKeyDown?.(e);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter') {
      if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
        e.preventDefault();
        handleSelect(suggestions[highlightedIndex]);
      } else {
        setIsOpen(false);
        onKeyDown?.(e);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    } else {
      onKeyDown?.(e);
    }
  };

  // Helper to highlight matching characters
  const renderHighlighted = (text: string, query: string) => {
    const cleanQuery = query.trim();
    if (!cleanQuery) return <span>{text}</span>;

    const lowerText = text.toLowerCase();
    const lowerQuery = cleanQuery.toLowerCase();
    const index = lowerText.indexOf(lowerQuery);

    if (index === -1) return <span>{text}</span>;

    const before = text.substring(0, index);
    const match = text.substring(index, index + cleanQuery.length);
    const after = text.substring(index + cleanQuery.length);

    return (
      <span>
        {before}
        <strong className="font-bold text-emerald-700 underline decoration-blue-300 underline-offset-2">
          {match}
        </strong>
        {after}
      </span>
    );
  };

  return (
    <div className={`relative w-full ${containerClassName}`} ref={containerRef}>
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 shrink-0 z-10">
            {icon}
          </div>
        )}
        <input
          id={id}
          name={name}
          type="text"
          value={value}
          required={required}
          autoFocus={autoFocus}
          disabled={disabled}
          onChange={(e) => {
            onChange(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => {
            setIsOpen(true);
            fetchSuggestions(value);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`w-full ${
            icon ? 'pl-10 pr-9' : 'px-3'
          } py-2 text-xs sm:text-sm bg-white dark:bg-card border border-slate-200 dark:border-input rounded-lg text-slate-800 dark:text-foreground placeholder:text-slate-400 dark:placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${className} ${inputClassName}`}
        />

        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-muted-foreground">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          </div>
        )}
      </div>

      {/* Autocomplete Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-card border border-slate-200 dark:border-border rounded-xl shadow-xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-3 py-1 text-[10px] font-bold text-slate-400 dark:text-muted-foreground uppercase tracking-wider">
            {value.trim() ? 'Matching Job Roles' : 'Popular Roles'}
          </div>

          <div className="max-h-60 overflow-y-auto">
            {suggestions.map((title, idx) => {
              const isSelected = value.trim().toLowerCase() === title.toLowerCase();
              const isHighlighted = highlightedIndex === idx;

              return (
                <button
                  key={title}
                  type="button"
                  onClick={() => handleSelect(title)}
                  onMouseEnter={() => setHighlightedIndex(idx)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-left transition-colors cursor-pointer ${
                    isHighlighted
                      ? 'bg-primary/10 text-primary dark:bg-primary/20'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-accent'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <Briefcase className={`w-3.5 h-3.5 shrink-0 ${isHighlighted ? 'text-primary' : 'text-slate-400 dark:text-muted-foreground'}`} />
                    <span className="truncate">{renderHighlighted(title, value)}</span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-primary shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
