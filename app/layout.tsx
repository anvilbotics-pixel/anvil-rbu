import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "ANVIL — RBU Engineering & Robotics Club",
  description:
    "Automation, Networks, Vision & Intelligent Labs. Engineering and robotics club at Ramdeobaba University, Nagpur.",
  openGraph: {
    title: "ANVIL — RBU",
    description: "Engineering & Robotics Club at Ramdeobaba University",
    siteName: "ANVIL RBU",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1 max-w-6xl mx-auto w-full px-5 md:px-10 pt-24 pb-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
