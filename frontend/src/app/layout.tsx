import { ThemeProvider } from "@/components/custom/theme/Theme-provider";
import { ReactNode } from "react";
import "./globals.css";
import { Inter, Montserrat, Bebas_Neue } from "next/font/google";
import { Toaster } from "sonner";

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
const BebasNeue = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-logo",
  weight: "400",
});

export const metadata = {
  title: {
    default: "Arday Bile",
    template: "Arday Bile | %s ",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${montserrat.variable} ${BebasNeue.variable}`}
    >
      <body className="font-san scroll-smooth">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
