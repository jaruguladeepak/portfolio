import type { Metadata } from "next";
import { SITE_URL, AUTHOR_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Projects",
  description: `Explore the projects of ${AUTHOR_NAME}, showcasing applications in Artificial Intelligence, Computer Vision, Machine Learning, Automation, and Full Stack Development.`,
  alternates: {
    canonical: `${SITE_URL}/projects`,
  },
  openGraph: {
    title: `${AUTHOR_NAME} - AI & Full Stack Projects`,
    description: `Explore the software engineering and machine learning projects developed by ${AUTHOR_NAME}.`,
    url: `${SITE_URL}/projects`,
    type: "website",
  },
  twitter: {
    title: `${AUTHOR_NAME} - AI & Full Stack Projects`,
    description: `Explore the software engineering and machine learning projects developed by ${AUTHOR_NAME}.`,
  }
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": SITE_URL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Projects",
        "item": `${SITE_URL}/projects`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      {children}
    </>
  );
}
