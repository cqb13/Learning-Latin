import { Analytics } from "@vercel/analytics/react";
import type { Metadata, Viewport } from "next";
import Image from "@/node_modules/next/image";
import NavBar from "@/components/shared/nav";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f2f2f2",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://learninglatin.net"),
  title: "Learning Latin",
  description:
    "A comprehensive platform for both novice and seasoned Latin enthusiasts.",
  keywords: [
    "learning latin",
    "latin",
    "latin language",
    "latin translator",
    "learninglatin",
    "translate latin",
    "whitakers words",
    "latin translation",
  ],
  category: "education",
  generator: "Next.js",
  applicationName: "Learning Latin",
  referrer: "origin-when-cross-origin",
  authors: [{ name: "Maksim Straus", url: "https://maksimstraus.dev" }],
  creator: "Maksim Straus",
  publisher: "Maksim Straus",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: "https://learninglatin.net/manifest.json",
  openGraph: {
    title: "Learning Latin",
    description:
      "A comprehensive platform for both novice and seasoned Latin enthusiasts.",
    url: "https://learninglatin.net",
    siteName: "Learning Latin",
    images: [
      {
        url: "https://learninglatin.net/favicon.svg",
        width: 600,
        height: 600,
        alt: "Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": "auto",
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen bg-background-white text-accent-900 flex flex-col`}
      >
        <NavBar />
        <main className={`flex-1`}>{children}</main>
        <footer className="flex shrink-0 justify-between items-center px-2 my-1 text-xs">
          <a
            href="https://github.com/cqb13/Learning-Latin/blob/main/LICENSE"
            target="_blank"
          >
            Learning Latin © 2025| By: Maksim Straus
          </a>
          <a href="https://github.com/cqb13" target="_blank">
            <Image src="/github.svg" alt="github" width={30} height={30} />
          </a>
        </footer>{" "}
        <Analytics />
      </body>
    </html>
  );
}
