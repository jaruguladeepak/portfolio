import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});
import { 
  SITE_URL, 
  SITE_NAME, 
  AUTHOR_NAME, 
  DEFAULT_DESCRIPTION, 
  DEFAULT_KEYWORDS,
  LINKEDIN_URL,
  GITHUB_USERNAME
} from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${AUTHOR_NAME} | AI Developer & Full Stack Developer`,
    template: `%s | ${AUTHOR_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: DEFAULT_KEYWORDS,
  authors: [{ name: AUTHOR_NAME }],
  creator: AUTHOR_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: `${AUTHOR_NAME} Portfolio`,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/icon.jpeg",
        width: 400,
        height: 400,
        alt: `${AUTHOR_NAME} Portfolio Icon`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${AUTHOR_NAME} Portfolio`,
    description: DEFAULT_DESCRIPTION,
    images: ["/icon.jpeg"],
  },
  verification: {
    google: "google-site-verification-placeholder",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": AUTHOR_NAME,
    "jobTitle": "AI Software Engineer",
    "url": SITE_URL,
    "image": `${SITE_URL}/icon.jpeg`,
    "sameAs": [
      `https://github.com/${GITHUB_USERNAME}`,
      LINKEDIN_URL,
    ],
    "knowsAbout": [
      "Artificial Intelligence",
      "Machine Learning",
      "Computer Vision",
      "Software Engineering",
      "Full Stack Development",
      "Python",
      "Next.js"
    ]
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": SITE_NAME,
    "url": SITE_URL,
  };

  return (
    <html lang="en" className={`${outfit.variable} ${plusJakarta.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        {/* Inject JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
