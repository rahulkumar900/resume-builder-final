/**
 * @file suggestion-service.ts
 * @description Unified suggestion coordinator combining Remote Gemini LLM, Offline Domain Heuristics,
 * and high-performance in-memory caching.
 *
 * SOLID Principles Alignment:
 * - Single Responsibility Principle (SRP): Coordinates suggestion requests, caches results,
 *   and handles graceful degradation across providers.
 * - Open-Closed Principle (OCP): New providers (e.g. OpenAI, Anthropic, or local WebLLM) can be
 *   added by implementing `IAiSuggestionProvider` without changing consumer components.
 * - Liskov Substitution Principle (LSP): `RemoteGeminiProvider`, `DomainHeuristicProvider`, and
 *   `CachedSuggestionProvider` can be substituted transparently.
 * - Dependency Inversion Principle (DIP): Exposes `IAiSuggestionService` for inversion of control.
 */

import {
  AiSuggestionRequest,
  AiSuggestionResponse,
  IAiSuggestionProvider,
} from './types';
import { DomainHeuristicProvider } from './domain-heuristics';

/**
 * Remote provider dispatching requests to the Next.js Gemini Route Handler.
 */
export class RemoteGeminiProvider implements IAiSuggestionProvider {
  public async generateSuggestions(request: AiSuggestionRequest): Promise<AiSuggestionResponse> {
    const startTime = performance.now();
    const res = await fetch('/api/ai/suggestions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });

    if (!res.ok) {
      throw new Error(`Gemini suggestion API failed with status ${res.status}`);
    }

    const data = await res.json();
    const latencyMs = Math.round(performance.now() - startTime);

    if (!data.success) {
      throw new Error(data.error || 'Unknown AI suggestion failure');
    }

    return {
      suggestions: data.suggestions || [],
      skillGroups: data.skillGroups,
      items: data.items,
      provider: data.provider || 'gemini',
      latencyMs,
    };
  }
}

/**
 * Decorator adding high-performance in-memory caching to any IAiSuggestionProvider.
 * Prevents redundant network calls and guarantees instant 0ms responses on repeated queries.
 */
export class CachedSuggestionProvider implements IAiSuggestionProvider {
  private readonly innerProvider: IAiSuggestionProvider;
  private readonly cache: Map<string, { response: AiSuggestionResponse; timestamp: number }>;
  private readonly maxEntries: number;
  private readonly ttlMs: number;

  constructor(innerProvider: IAiSuggestionProvider, maxEntries: number = 100, ttlMs: number = 10 * 60 * 1000) {
    this.innerProvider = innerProvider;
    this.cache = new Map();
    this.maxEntries = maxEntries;
    this.ttlMs = ttlMs;
  }

  private buildCacheKey(request: AiSuggestionRequest): string {
    return [
      request.section,
      (request.targetRole || '').trim().toLowerCase(),
      (request.company || '').trim().toLowerCase(),
      (request.projectName || '').trim().toLowerCase(),
      request.tone || 'metrics',
      request.seniorityLevel || 'mid',
      (request.userFocusPrompt || '').trim().toLowerCase(),
      (request.technologies || []).sort().join(','),
    ].join('::');
  }

  public async generateSuggestions(request: AiSuggestionRequest): Promise<AiSuggestionResponse> {
    const key = this.buildCacheKey(request);

    // Bypass in-memory cache if user requests fresh generation
    if (!request.forceFresh) {
      const cached = this.cache.get(key);

      if (cached && Date.now() - cached.timestamp < this.ttlMs) {
        return {
          ...cached.response,
          provider: 'cache',
          latencyMs: 0,
        };
      }
    }

    const fresh = await this.innerProvider.generateSuggestions(request);

    // Evict oldest if exceeding max entries
    if (this.cache.size >= this.maxEntries) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) this.cache.delete(firstKey);
    }

    this.cache.set(key, { response: fresh, timestamp: Date.now() });
    return fresh;
  }

  public clearCache(): void {
    this.cache.clear();
  }
}

/**
 * High-level service coordinating remote Gemini inference with graceful heuristic failover.
 */
export class AiSuggestionService implements IAiSuggestionProvider {
  private readonly primaryProvider: IAiSuggestionProvider;
  private readonly fallbackProvider: IAiSuggestionProvider;

  constructor(
    primaryProvider: IAiSuggestionProvider = new RemoteGeminiProvider(),
    fallbackProvider: IAiSuggestionProvider = new DomainHeuristicProvider()
  ) {
    // Wrap primary in memory cache for instant performance
    this.primaryProvider = new CachedSuggestionProvider(primaryProvider);
    // Wrap fallback in memory cache as well
    this.fallbackProvider = new CachedSuggestionProvider(fallbackProvider);
  }

  /**
   * Generates suggestions with automatic failover to domain heuristics if network/API is unavailable.
   */
  public async generateSuggestions(request: AiSuggestionRequest): Promise<AiSuggestionResponse> {
    try {
      return await this.primaryProvider.generateSuggestions(request);
    } catch (err) {
      console.warn('Primary Gemini AI suggestion failed; utilizing domain heuristics fallback:', err);
      return await this.fallbackProvider.generateSuggestions(request);
    }
  }
}

/** Singleton instance ready for component consumption */
export const aiSuggestionService = new AiSuggestionService();
