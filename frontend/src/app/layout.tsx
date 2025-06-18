import { ThemeProvider } from "@/components/custom/theme/Theme-provider";
import { ReactNode } from "react";
import "./globals.css";
import { Inter, Montserrat } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-primary",
  weight: ["400", "700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-secondary",
  weight: ["400", "700"],
});

export const metadata = {
  title: "Arday bile",
  description: "Built by Zuhyb",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${montserrat.variable}`}
    >
      <body className="font-san">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
