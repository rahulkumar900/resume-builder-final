# Unified Pagination Engine

The **Unified Pagination Engine** is an enterprise-grade, SOLID-compliant pagination and layout engine designed specifically for pixel-perfect A4 resume document rendering across preview, print, and PDF export workflows.

---

## 📐 Key Problem & Guarantee

Web documents operate in continuous scrolling mode, whereas physical paper and PDF documents require exact, discrete pages:
- **A4 Page Dimensions**: $210\text{mm} \times 297\text{mm} \equiv 793.7\text{px} \times 1122.5\text{px}$ at $96\text{ DPI}$.
- **Print Overflow Discrepancy**: Browser preview scaling (e.g. `transform: scale(0.85)`), subpixel anti-aliasing, and inter-section padding often cause content that appears fine in preview to spill over into unwanted blank or single-line extra pages in print.
- **Strict In-Order Guarantee**: The engine guarantees strict sequential document flow with zero jump-ordering, orphan headers, or cross-section interleaving.

---

## 🏛️ SOLID Principles Architecture

The architecture adheres strictly to object-oriented SOLID principles:

```
src/lib/pagination/
├── core/
│   ├── types.ts                    # Canonical data types, metrics & contracts
│   ├── capacity-planner.ts         # S: Single Responsibility (Capacity & budget calculation)
│   ├── column-partitioner.ts       # S: Single Responsibility (3-Tier packing algorithm)
│   ├── page-assembler.ts           # S: Single Responsibility (Immutable ResumeData reconstruction)
│   └── engine.ts                   # D: Dependency Inversion (High-level orchestrator)
├── metrics/
│   ├── metrics-provider.interface.ts # I: Interface Segregation (Metrics provider contract)
│   ├── analytical-provider.ts      # L: Liskov Substitution (Fast heuristic SSR metrics)
│   ├── dom-measurer.ts             # Geometry & scale-normalized DOM extraction
│   └── dom-provider.ts             # L: Liskov Substitution (Exact subpixel DOM metrics)
├── strategies/
│   ├── partition-strategy.interface.ts # O: Open/Closed (Pluggable strategy contract)
│   ├── single-column-strategy.ts   # Strategy for ATS, Vienna, Madrid
│   └── double-column-strategy.ts   # Strategy for Prawira, Amelia, Chastain, etc.
├── index.ts                        # Unified barrel exports & factory methods
└── README.md                       # Documentation & API reference
```

### 1. Single Responsibility Principle (SRP)
Each subsystem component has one single reason to change:
- **`PageCapacityPlanner`**: Only calculates available vertical height budgets for Page 1 vs subsequent running pages, taking into account page margins, padding, headers, and safety thresholds.
- **`ColumnPartitioner`**: Only implements the 3-tier packing logic across pages. It has no knowledge of React, DOM, or how pages are formatted.
- **`ResumePageAssembler`**: Only transforms abstract item partitions back into strongly-typed `ResumeData[]` page models, handling highlight slicing and section ordering.
- **`AnalyticalMetricsProvider`**: Only estimates heights mathematically based on text character counts and typography rules (SSR safe, zero DOM dependence).
- **`DOMMetricsProvider` / `measureGhostDOM`**: Only measures true subpixel geometry from rendered offscreen DOM nodes, normalizing any CSS transform scale factors.

### 2. Open/Closed Principle (OCP)
The engine is open for extension but closed for modification:
- All layout partitioning is driven by `IPartitionStrategy`.
- Adding a new layout type (e.g. `ThreeColumnStrategy`, `CoverLetterStrategy`, or `SidebarHeaderStrategy`) requires only creating a new class implementing `IPartitionStrategy` without touching existing partitioner loops or engine orchestration.

### 3. Liskov Substitution Principle (LSP)
- Both `AnalyticalMetricsProvider` and `DOMMetricsProvider` implement `IMetricsProvider` and produce identical `NormalizedResumeMetrics` structures.
- The `PaginationEngine` can seamlessly swap between analytical heuristics and subpixel DOM measurements without any behavioral changes or branching logic.

### 4. Interface Segregation Principle (ISP)
- Interfaces are fine-grained and cohesive (`ICapacityPlanner`, `IColumnPartitioner`, `IPageAssembler`, `IMetricsProvider`, `IPartitionStrategy`, `IPaginationEngine`).
- Clients depend only on the methods they use, avoiding bloated interfaces.

### 5. Dependency Inversion Principle (DIP)
- The high-level `PaginationEngine` depends exclusively on abstractions (`ICapacityPlanner`, `IColumnPartitioner`, `IPageAssembler`, `IPartitionStrategy`, `IMetricsProvider`), not on concrete implementations.
- All dependencies are injected via the constructor with sensible defaults, allowing full mocking and unit testing.

---

## 📦 The 3-Tier Partitioning Hierarchy

When content is packed into pages, the partitioner applies a strict 3-tier decision tree:

1. **Tier 1: Full Section Fit**
   - Checks if the entire section (header + all items + inter-item spacing) fits within the remaining capacity of the current page.
   - If it fits, the whole section is placed intact.
2. **Tier 2: Break Sub-Section (Items)**
   - If the section exceeds available page capacity, the engine places as many complete items as can fit on the current page.
   - The remaining whole items transition cleanly to the next page.
3. **Tier 3: Break Sub-Block (Highlights / Bullets)**
   - If an individual item is too large to fit in remaining space, the engine inspects its internal blocks (e.g. job description bullet points).
   - It places the role header and the fitting bullet points on the current page, and carries the remaining bullets over to the subsequent page.

---

## 🚀 Usage Examples

### 1. Standard SSR / Analytical Pagination
Fast, zero-DOM heuristic pagination suitable for initial server render and zero layout shift:
```ts
import { paginateResume } from '@/lib/pagination';

const pages = paginateResume(resumeData);
// Returns ResumeData[] where each element represents an A4 page
```

### 2. High-Fidelity Client DOM-Measured Pagination
Uses an offscreen portal (`GhostDOMMeasurer`) to extract true subpixel node geometry:
```ts
import { measureGhostDOM, paginateWithMeasuredDOM } from '@/lib/pagination';

// In client component or Puppeteer runner:
const metrics = measureGhostDOM(offscreenContainerElement);
const pages = paginateWithMeasuredDOM(resumeData, metrics);
```

### 3. Custom Strategy / Dependency Injection
```ts
import {
  PaginationEngine,
  PageCapacityPlanner,
  ColumnPartitioner,
  ResumePageAssembler,
} from '@/lib/pagination';

const customEngine = new PaginationEngine({
  capacityPlanner: new PageCapacityPlanner(/* safetyMargin */ 24),
  partitioner: new ColumnPartitioner(),
  assembler: new ResumePageAssembler(),
});

const pages = customEngine.paginate(resumeData, { mode: 'analytical' });
```

---

## 🔍 Scale Normalization & Subpixel Accuracy

When previewing resumes in the editor, users often zoom in or out using CSS `transform: scale(s)`.
Raw `getBoundingClientRect()` calls return scaled values ($h \times s$).
The DOM measurer automatically detects this scale factor:
$$\text{scaleFactor} = \frac{\text{rect.width}}{\text{container.offsetWidth}}$$
and normalizes all measurements back to $100\%$ unscaled physical A4 pixels:
$$\text{unscaledHeight} = \frac{\text{measuredHeight}}{\text{scaleFactor}}$$
This guarantees that zoom level has zero effect on pagination splits.
