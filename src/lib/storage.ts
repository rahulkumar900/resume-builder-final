/**
 * @fileoverview Storage Facade.
 * Consolidates local storage, indexedDB, cloud synchronization, and mock fixtures
 * into a single unified API adhering to the Facade and Dependency Inversion principles.
 * Maintains 100% backwards compatibility for existing imports across the application.
 */

export * from './storage/resume-fixtures';
export * from './storage/local-storage';
export * from './storage/cloud-storage';
export * from './storage/resume-sync-service';
