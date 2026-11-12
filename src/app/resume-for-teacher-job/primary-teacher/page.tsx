import React from 'react';
import { Metadata } from 'next';
import { TEACHER_SUBPAGES } from '@/data/teacher-cluster/subpages';
import { SubTeacherPage } from '@/components/teacher-cluster/SubTeacherPage';
import {
  buildTeacherSubpageJsonLd,
  buildTeacherSubpageMetadata,
} from '@/lib/seo/teacherClusterSeo';

const data = TEACHER_SUBPAGES['primary-teacher'];

export const metadata: Metadata = buildTeacherSubpageMetadata(data);

export default function PrimaryTeacherPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildTeacherSubpageJsonLd(data)),
        }}
      />
      <SubTeacherPage data={data} />
    </>
  );
}
