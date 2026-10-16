import React, { Suspense } from 'react';
import { BuilderEditorClient } from '@/components/builder/BuilderEditorClient';
import { BuilderSkeleton } from '@/components/builder/BuilderSkeleton';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function BuilderPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <Suspense fallback={<BuilderSkeleton />}>
      <BuilderEditorClient id={id} />
    </Suspense>
  );
}
