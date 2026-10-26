import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resume Builder Studio',
  robots: {
    index: false,
    follow: false,
  },
};

export default function BuilderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
