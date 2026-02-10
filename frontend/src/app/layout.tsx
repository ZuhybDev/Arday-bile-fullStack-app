import { ThemeProvider } from "@/components/custom/theme/Theme-provider";
import { ReactNode } from "react";
import "./globals.css";

//fonts
import { Montserrat, Bebas_Neue, DM_Sans } from "next/font/google";
import { Toaster } from "sonner";

const dmSans = DM_Sans({
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
  title: "Arday Bile ",
  description: "Bult by Zuhyb Dev",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${(dmSans.variable, "antialiased")} ${montserrat.variable} ${BebasNeue.variable}`}>
      <body className="font-san scroll-smooth">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          {children}

          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
