import { About } from "@/components/sections/About";
import { AiAgents } from "@/components/sections/AiAgents";
import { Audit } from "@/components/sections/Audit";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { Contact } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Pricing } from "@/components/sections/Pricing";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { SharkTank } from "@/components/sections/SharkTank";
import { Stats } from "@/components/sections/Stats";
import { Story } from "@/components/sections/Story";
import { Testimonials } from "@/components/sections/Testimonials";
import { Videos } from "@/components/sections/Videos";
import { Work } from "@/components/sections/Work";
import { WorksWith } from "@/components/sections/WorksWith";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/content/site";
import { localBusinessSchema, organizationSchema, websiteSchema } from "@/lib/schema";

export default function Home() {
  return (
    <>
      <JsonLd data={[organizationSchema(), localBusinessSchema(), websiteSchema()]} />
      <Header />
      <main id="main">
        <Hero />
        <ClientLogos />
        <SharkTank />
        <Stats />
        <Work />
        <Videos />
        <Services />
        <AiAgents />
        <Process />
        <Story />
        <Testimonials />
        <Pricing />
        <WorksWith />
        <About />
        <Faq faqs={siteConfig.faqs} />
        <Audit />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
