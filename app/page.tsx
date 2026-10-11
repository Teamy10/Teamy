import { Benefits } from "@/components/sections/Benefits";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { FloatingWhatsApp } from "@/components/sections/FloatingWhatsApp";
import { Pricing } from "@/components/sections/Pricing";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { SharkTank } from "@/components/sections/SharkTank";
import { Story } from "@/components/sections/Story";
import { Testimonials } from "@/components/sections/Testimonials";
import { siteConfig } from "@/content/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteConfig.brand,
  slogan: siteConfig.tagline,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.svg`,
  email: siteConfig.contact.email,
  areaServed: "IN",
  makesOffer: {
    "@type": "Offer",
    name: "Online store, designed, built and launched",
    price: siteConfig.plan.price,
    priceCurrency: "INR",
  },
};

// Escape "<" so the JSON can never close the script tag.
const jsonLdHtml = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml }} />
      <Header />
      <main id="main">
        <Hero />
        <Marquee />
        <Story />
        <Benefits />
        <Services />
        <Process />
        <SharkTank />
        <Testimonials />
        <Pricing />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
