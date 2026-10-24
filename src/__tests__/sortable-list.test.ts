import { describe, it, expect } from 'vitest';
import { arrayMove } from '@dnd-kit/sortable';

describe('Sortable List Reordering Logic (TDD & Pure Functional Isolation)', () => {
  it('should move an item from start to end correctly', () => {
    const list = ['summary', 'experience', 'education', 'skills'];
    const moved = arrayMove(list, 0, 3);
    expect(moved).toEqual(['experience', 'education', 'skills', 'summary']);
  });

  it('should move an item from end to start correctly', () => {
    const list = ['summary', 'experience', 'education', 'skills'];
    const moved = arrayMove(list, 3, 0);
    expect(moved).toEqual(['skills', 'summary', 'experience', 'education']);
  });

  it('should move an item up by one position', () => {
    const list = ['item-A', 'item-B', 'item-C'];
    const moved = arrayMove(list, 2, 1);
    expect(moved).toEqual(['item-A', 'item-C', 'item-B']);
  });

  it('should preserve immutable behavior without mutating the original input array', () => {
    const original = ['first', 'second', 'third'];
    const clonedOriginal = [...original];
    const moved = arrayMove(original, 1, 0);

    expect(original).toEqual(clonedOriginal); // Original must not be mutated
    expect(moved).toEqual(['second', 'first', 'third']);
  });

  it('should handle complex object collections by ID index matching', () => {
    const jobs = [
      { id: 'job-1', role: 'Frontend Engineer' },
      { id: 'job-2', role: 'Full Stack Engineer' },
      { id: 'job-3', role: 'Engineering Lead' },
    ];

    const oldIndex = jobs.findIndex((j) => j.id === 'job-3');
    const newIndex = jobs.findIndex((j) => j.id === 'job-1');
    const reordered = arrayMove(jobs, oldIndex, newIndex);

    expect(reordered.map((j) => j.id)).toEqual(['job-3', 'job-1', 'job-2']);
  });

  describe('Cross-Container Transfer Logic (Main <-> Sidebar)', () => {
    it('should transfer an item from main to sidebar at target position', () => {
      const main = ['summary', 'experience', 'projects'];
      const sidebar = ['skills', 'education'];
      const itemToMove = 'experience';

      const nextMain = main.filter((s) => s !== itemToMove);
      const targetIndex = 1; // insert between skills and education
      const nextSidebar = [...sidebar];
      nextSidebar.splice(targetIndex, 0, itemToMove);

      expect(nextMain).toEqual(['summary', 'projects']);
      expect(nextSidebar).toEqual(['skills', 'experience', 'education']);
    });

    it('should transfer an item from sidebar to main at end when dropped on empty or container', () => {
      const main = ['summary', 'experience'];
      const sidebar = ['skills', 'education', 'certifications'];
      const itemToMove = 'skills';

      const nextSidebar = sidebar.filter((s) => s !== itemToMove);
      const nextMain = [...main, itemToMove];

      expect(nextSidebar).toEqual(['education', 'certifications']);
      expect(nextMain).toEqual(['summary', 'experience', 'skills']);
    });
  });
});
