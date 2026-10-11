import { Benefits } from "@/components/sections/Benefits";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { MobileCTABar } from "@/components/sections/MobileCTABar";
import { Pricing } from "@/components/sections/Pricing";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { SharkTank } from "@/components/sections/SharkTank";
import { Testimonials } from "@/components/sections/Testimonials";
import { siteConfig } from "@/site.config";

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

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\u003c") }}
      />
      <div className="scroll-progress" aria-hidden="true" />
      <Header />
      <main id="main">
        <Hero />
        <Marquee />
        <Benefits />
        <Services />
        <SharkTank />
        <Testimonials />
        <Pricing />
        <Process />
        <Contact />
      </main>
      <Footer />
      <MobileCTABar />
    </>
  );
}
