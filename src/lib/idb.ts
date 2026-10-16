/**
 * Lightweight IndexedDB helper for limitless browser storage
 * Bypasses the strict 5MB localStorage limit and prevents QuotaExceededError.
 */

const DB_NAME = 'kindley_db';
const DB_VERSION = 1;
const STORE_NAME = 'resumes';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return reject(new Error('IndexedDB not supported in this environment'));
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

export async function idbGet<T = any>(key: string): Promise<T | null> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const request = store.get(key);

      request.onsuccess = () => {
        resolve((request.result?.data as T) ?? null);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  } catch (err) {
    console.warn('[IDB] get failed, using fallback:', err);
    return null;
  }
}

export async function idbSet(key: string, data: any): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const request = store.put({ id: key, data, updatedAt: Date.now() });

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  } catch (err) {
    console.warn('[IDB] set failed:', err);
  }
}

export async function idbDelete(key: string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const request = store.delete(key);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  } catch (err) {
    console.warn('[IDB] delete failed:', err);
  }
}

export async function idbGetAll<T = any>(): Promise<T[]> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => {
        const list = (request.result || []).map((entry: any) => entry.data as T);
        resolve(list);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  } catch (err) {
    console.warn('[IDB] getAll failed:', err);
    return [];
  }
}
