import { describe, it, expect } from 'vitest';
import { ColumnPartitioner } from '@/lib/pagination/core/column-partitioner';
import { ResumePageAssembler } from '@/lib/pagination/core/page-assembler';
import { PageCapacityPlanner } from '@/lib/pagination/core/capacity-planner';
import { NormalizedResumeMetrics, NormalizedSectionMetric } from '@/lib/pagination/core/types';
import { ResumeData } from '@/types/resume';
import { getResolvedTemplateSectionOrder } from '@/lib/templates';

describe('neon_creative sidebar skills overflow', () => {
  it('reproduces what happens when skills overflow in sidebar', () => {
    const rawSkills = [
      'TypeScript',
      'JavaScript',
      'Python',
      'Go',
      'SQL',
      'REST & GraphQL APIs',
      'Data Structures',
      'React',
      'Next.js',
      'Node.js',
      'PostgreSQL',
      'Docker',
      'Kubernetes',
    ];

    const testData: ResumeData = {
      id: 'test',
      title: 'Test',
      templateId: 'neon_creative',
      status: 'draft',
      updatedAt: new Date().toISOString(),
      themeColor: '#7c3aed',
      fontFamily: 'space_grotesk',
      spacing: 'normal',
      personalInfo: {
        fullName: 'Rahul Kumar',
        jobTitle: 'Frontend Developer',
        email: 'rahul@example.com',
        phone: '+91 9876543210',
        location: 'Bangalore, India',
        summary: 'Frontend developer with expertise in building responsive web applications.',
      },
      experience: [
        {
          id: 'exp-1',
          role: 'Frontend Developer',
          company: 'Tech Corp',
          location: 'Bangalore',
          startDate: '2022',
          endDate: 'Present',
          current: true,
          highlights: [
            'Engineered Full Stack Engineer Portfolio Project utilizing Core Stack, tools, scaling system throughput to support thousands of active users with sub-100ms response times.',
          ],
        },
      ],
      projects: [
        {
          id: 'proj-1',
          title: 'Ai workflow Engine',
          technologies: ['Next.js', 'TypeScript'],
          highlights: [
            'Engineered responsive client architecture with server-side rendering and static optimization, cutting initial page',
            'Architected and deployed production full-stack application using Next.js, TypeScript, and Tailwind CSS.',
          ],
        },
      ],
      skills: [
        {
          id: 'cat-1',
          category: '',
          items: rawSkills,
        },
      ],
      education: [],
      certifications: [],
      languages: [],
    };

    // Construct simulated measured metrics where skills is tall in sidebar
    const capacityPlanner = new PageCapacityPlanner();
    const budget = capacityPlanner.computeBudget(testData);

    const sidebarBudget = budget.sidebarBudget || budget;
    console.log('Sidebar capacities:', sidebarBudget.capacities);

    // Each skill item height is ~28px, 13 skills = 364px + 35px header = 400px
    // But suppose on Page 1, sidebar capacity is say 300px (because header takes space)
    // Let's create section metric for skills:
    const bulletMetrics = rawSkills.map((name, idx) => ({
      idx,
      height: 28,
    }));

    const skillsSectionMetric: NormalizedSectionMetric = {
      sectionId: 'skills',
      headerHeight: 35,
      totalHeight: 35 + 13 * 28,
      items: [
        {
          id: 'cat-1',
          sectionId: 'skills',
          height: 13 * 28,
          headerHeight: 0,
          bullets: bulletMetrics,
          splitStrategy: 'bullets',
        },
      ],
    };

    // Suppose main column has experience and projects
    const mainSectionMetrics: NormalizedSectionMetric[] = [
      {
        sectionId: 'summary',
        headerHeight: 25,
        totalHeight: 60,
        items: [
          {
            id: 'summary-0',
            sectionId: 'summary',
            height: 35,
            headerHeight: 0,
            bullets: [],
            splitStrategy: 'atomic',
          },
        ],
      },
      {
        sectionId: 'experience',
        headerHeight: 25,
        totalHeight: 120,
        items: [
          {
            id: 'exp-1',
            sectionId: 'experience',
            height: 95,
            headerHeight: 25,
            bullets: [{ idx: 0, height: 70 }],
            splitStrategy: 'atomic',
          },
        ],
      },
      {
        sectionId: 'projects',
        headerHeight: 25,
        totalHeight: 150,
        items: [
          {
            id: 'proj-1',
            sectionId: 'projects',
            height: 125,
            headerHeight: 25,
            bullets: [
              { idx: 0, height: 40 },
              { idx: 1, height: 40 },
            ],
            splitStrategy: 'bullets',
          },
        ],
      },
    ];

    const partitioner = new ColumnPartitioner();
    // Simulate constrained budget where sidebar capacity page 1 is 250px!
    const constrainedBudget = {
      ...budget,
      capacities: [250, 950],
      pageNextCapacity: 950,
      sidebarBudget: {
        ...sidebarBudget,
        capacities: [250, 950],
        pageNextCapacity: 950,
      },
    };

    const sidebarPartitions = partitioner.partitionColumn([skillsSectionMetric], constrainedBudget.sidebarBudget);
    console.log('Sidebar partitions count:', sidebarPartitions.length);
    sidebarPartitions.forEach((p, idx) => {
      console.log(`Sidebar Partition ${idx + 1} slots:`, p.slots);
    });

    const mainPartitions = partitioner.partitionColumn(mainSectionMetrics, constrainedBudget);
    console.log('Main partitions count:', mainPartitions.length);
    mainPartitions.forEach((p, idx) => {
      console.log(`Main Partition ${idx + 1} slots:`, p.slots);
    });

    const assembler = new ResumePageAssembler();
    const pages = assembler.assemblePages(testData, 'double', {
      main: mainPartitions,
      sidebar: sidebarPartitions,
    });

    console.log('\n--- ASSEMBLED PAGES COUNT ---', pages.length);
    pages.forEach((p, idx) => {
      console.log(`\nPage ${idx + 1}:`);
      console.log('  sectionOrder.mainColumn:', p.sectionOrder?.mainColumn);
      console.log('  sectionOrder.sidebarColumn:', p.sectionOrder?.sidebarColumn);
      const resOrder = getResolvedTemplateSectionOrder('neon_creative', p);
      console.log('  resolvedOrder.mainColumn:', resOrder.mainColumn);
      console.log('  resolvedOrder.sidebarColumn:', resOrder.sidebarColumn);
      console.log('  experience items count:', p.experience?.length);
      console.log('  projects items count:', p.projects?.length);
      console.log('  skills items:', p.skills?.[0]?.items);
    });

    expect(pages[0].skills?.[0]?.items?.length).toBe(6);
    expect(pages[1].skills?.[0]?.items?.length).toBe(7);
    expect(pages[0].skills?.[0]?.items?.[0]).toBe('TypeScript');
    expect(pages[1].skills?.[0]?.items?.[0]).toBe('Data Structures');
  });

  it('ensures skills are not duplicated on Page 2 when sidebar fits on Page 1', () => {
    const partitioner = new ColumnPartitioner();
    const assembler = new ResumePageAssembler();

    const mainPartitions = [
      {
        pageIndex: 0,
        slots: [{ sectionId: 'experience' as const, itemId: 'exp-1', isFirstItemOfSection: true }],
        usedHeight: 800,
      },
      {
        pageIndex: 1,
        slots: [{ sectionId: 'projects' as const, itemId: 'proj-1', isFirstItemOfSection: true }],
        usedHeight: 400,
      },
    ];

    const sidebarPartitions = [
      {
        pageIndex: 0,
        slots: [{ sectionId: 'skills' as const, itemId: 'cat-1', isFirstItemOfSection: true }],
        usedHeight: 250,
      },
    ];

    const testData: ResumeData = {
      id: 'test-fit',
      title: 'Test Fit',
      templateId: 'neon_creative',
      status: 'draft',
      updatedAt: new Date().toISOString(),
      themeColor: '#7c3aed',
      fontFamily: 'space_grotesk',
      spacing: 'normal',
      personalInfo: {
        fullName: 'Rahul Kumar',
        jobTitle: 'Developer',
        email: 'r@test.com',
        phone: '123',
        location: 'BLR',
        summary: 'Dev',
      },
      skills: [
        {
          id: 'cat-1',
          category: 'Core Skills',
          items: ['React', 'TypeScript', 'Node.js'],
        },
      ],
      experience: [{ id: 'exp-1', role: 'Dev', company: 'Co', startDate: '2020', endDate: '2022', location: '', current: false, highlights: [] }],
      projects: [{ id: 'proj-1', title: 'App', technologies: [], highlights: [] }],
      education: [],
      certifications: [],
      languages: [],
    };

    const pages = assembler.assemblePages(testData, 'double', {
      main: mainPartitions,
      sidebar: sidebarPartitions,
    });

    expect(pages.length).toBe(2);
    // Page 1 has skills
    expect(pages[0].skills?.length).toBe(1);
    expect(pages[0].skills?.[0]?.items).toEqual(['React', 'TypeScript', 'Node.js']);
    // Page 2 must NOT have skills
    expect(pages[1].skills?.length).toBe(0);
    const p2Order = getResolvedTemplateSectionOrder('neon_creative', pages[1]);
    expect(p2Order.sidebarColumn).not.toContain('skills');
  });
});
