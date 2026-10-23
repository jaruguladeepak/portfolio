import type { Metadata } from "next";
import { SITE_URL, AUTHOR_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description: `About ${AUTHOR_NAME} - AI Software Engineer, computer science student, and machine learning enthusiast. Learn about my skills, background, and what drives my software development journey.`,
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: `About ${AUTHOR_NAME} | AI & Full Stack Developer`,
    description: `Learn more about ${AUTHOR_NAME}'s background, skillset, experience, and journey as an AI and Full Stack Developer.`,
    url: `${SITE_URL}/about`,
    type: "profile",
    username: "jaruguladeepak",
    gender: "male",
    firstName: "Deepak",
    lastName: "Jarugula",
  },
  twitter: {
    title: `About ${AUTHOR_NAME} | AI & Full Stack Developer`,
    description: `Learn more about ${AUTHOR_NAME}'s background, skillset, experience, and journey as an AI and Full Stack Developer.`,
  }
};

export default function AboutLayout({
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
        "name": "About",
        "item": `${SITE_URL}/about`
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
