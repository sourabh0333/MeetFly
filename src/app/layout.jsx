import { Outfit, JetBrains_Mono, Inter, Source_Serif_4 } from "next/font/google";
import { SiteHeader } from "@/components/header/site-header";
import { SiteFooter } from "@/components/footer/site-footer";
import { siteConfig } from "@/config/site";
import { JsonLd, siteJsonLd } from "@/lib/seo";
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
  applicationName: siteConfig.name,
  // Listed by search engines only once the real public address is set (see siteConfig.isLive).
  robots: siteConfig.isLive ? { index: true, follow: true } : { index: false, follow: false },
  // Defaults for shared links; every page sets its own title, description and address (lib/seo.js).
  openGraph: { type: "website", siteName: siteConfig.name, locale: "en_US" },
  twitter: { card: "summary_large_image" },
};

export const viewport = {
  themeColor: "#fbfbf8",
};

export default function RootLayout({ children }) {
  return (
    // data-scroll-behavior="smooth": globals.css makes in-page scrolling smooth, and since Next.js 16
    // this attribute is what lets Next turn smoothing off while it scrolls a new page to the top.
    // Without it, changing page from the header animated part-way down and stopped near the second
    // section instead of staying on the hero.
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${outfit.variable} ${jetbrains.variable} ${inter.variable} ${serif.variable}`}
    >
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <JsonLd data={siteJsonLd} />
      </body>
    </html>
  );
}
