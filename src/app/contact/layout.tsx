import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Support & Help Desk',
  description:
    'Need help with your resume or templates? Contact ResumeBabu support for technical assistance, template requests, or account inquiries.',
  alternates: {
    canonical: 'https://resumebabu.com/contact',
  },
  openGraph: {
    title: 'Contact Support & Help Desk | ResumeBabu',
    description:
      'Need help with your resume or templates? Contact ResumeBabu support for technical assistance, template requests, or account inquiries.',
    url: 'https://resumebabu.com/contact',
    images: [
      {
        url: 'https://resumebabu.com/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'ResumeBabu Support & Help',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Support & Help Desk | ResumeBabu',
    description:
      'Need help with your resume or templates? Contact ResumeBabu support for assistance.',
    images: ['https://resumebabu.com/twitter-image'],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
