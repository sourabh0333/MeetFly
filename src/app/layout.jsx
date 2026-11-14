import { Outfit, JetBrains_Mono, Inter, Source_Serif_4 } from "next/font/google";
import { SiteHeader } from "@/components/header/site-header";
import { siteConfig } from "@/config/site";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-outfit", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jetbrains", display: "swap" });
// The demo draws MeetFly's own interface, which uses Inter and a book serif.
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-inter", display: "swap" });
const serif = Source_Serif_4({ subsets: ["latin"], weight: ["400", "600"], style: ["normal", "italic"], variable: "--font-serif", display: "swap" });

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "MeetFly · AI copilot for every call",
  description: siteConfig.description,
  // The site is not ready for search engines yet.
  robots: { index: false, follow: false },
};

export const viewport = {
  themeColor: "#fbfbf8",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${jetbrains.variable} ${inter.variable} ${serif.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
