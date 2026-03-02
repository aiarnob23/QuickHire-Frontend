import type { Metadata } from "next";
import localFont from "next/font/local";
import { Epilogue } from "next/font/google";
import "./globals.css";


const clashDisplay = localFont({
  src: [
    {
      path: "../public/fonts/ClashDisplay-Regular.woff2",
      weight: "400",
    },
    {
      path: "../public/fonts/ClashDisplay-Medium.woff2",
      weight: "500",
    },
    {
      path: "../public/fonts/ClashDisplay-Semibold.woff2",
      weight: "600",
    },
    {
      path: "../public/fonts/ClashDisplay-Bold.woff2",
      weight: "700",
    },
  ],
  variable: "--font-clash",
});

const epilogue = Epilogue({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-epilogue",
});

export const metadata: Metadata = {
  title: {
    default: "QuickHire | Find Your Dream Job",
    template: "%s | QuickHire"
  },
  description: "QuickHire is the ultimate platform for job seekers and employers. Find high-paying tech jobs, manage applications, and hire top talent instantly.",
  keywords: ["jobs", "hiring", "recruitment", "tech jobs", "career", "QuickHire", "Bangladesh jobs"],
  openGraph: {
    title: "QuickHire | Connecting Talent with Opportunity",
    description: "Browse thousands of job openings and find your next career move with QuickHire.",
    url: "https://quickhire-frontend-eight.vercel.app/", 
    siteName: "QuickHire",
    locale: "en_US",
    type: "website",
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
        className={`${epilogue.variable} ${clashDisplay.variable}  antialiased`}
      >
        {children}
      </body>
    </html>
  );
}