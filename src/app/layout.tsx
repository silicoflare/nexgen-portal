import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import {
  Electrolize,
  Montserrat,
  Nunito,
  Poiret_One,
  Poppins,
  Raleway,
} from "next/font/google";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "NexGen 2.0",
  description: "Portal for NexGen 2.0",
};

const raleway = Raleway({ subsets: ["latin"] });
const mont = Montserrat({ subsets: ["latin"] });
const elec = Electrolize({ subsets: ["latin"], weight: ["400"] });
const poi = Poiret_One({ subsets: ["latin"], weight: ["400"] });
const pop = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const nun = Nunito({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${raleway.className} antialiased`}>
        <Toaster richColors position="top-center" className="z-50" />
        <ThemeProvider attribute="class">{children}</ThemeProvider>
      </body>
    </html>
  );
}
