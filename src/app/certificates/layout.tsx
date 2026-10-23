import type { Metadata } from "next";
import { SITE_URL, AUTHOR_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Certificates & Awards",
  description: `Professional certifications, credentials, and achievements earned by ${AUTHOR_NAME} in Artificial Intelligence, programming, machine learning, and web development.`,
  alternates: {
    canonical: `${SITE_URL}/certificates`,
  },
  openGraph: {
    title: `${AUTHOR_NAME} - Certifications & Achievements`,
    description: `Explore the credentials and academic achievements earned by ${AUTHOR_NAME}.`,
    url: `${SITE_URL}/certificates`,
    type: "website",
  },
  twitter: {
    title: `${AUTHOR_NAME} - Certifications & Achievements`,
    description: `Explore the credentials and academic achievements earned by ${AUTHOR_NAME}.`,
  }
};

export default function CertificatesLayout({
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
        "name": "Certificates",
        "item": `${SITE_URL}/certificates`
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
