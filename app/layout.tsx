import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "ANVIL — RBU Engineering & Robotics Club",
  description:
    "Automation, Networks, Vision & Intelligent Labs. Engineering and robotics club at Ramdeobaba University, Nagpur. Building India's first student-built humanoid robot.",
  openGraph: {
    title: "ANVIL — RBU",
    description: "Engineering & Robotics Club at Ramdeobaba University. We Design. We Code. We Build.",
    siteName: "ANVIL RBU",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-iron-black">
        <Nav />
        <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-12 pb-0 pt-24">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
