import { Footer } from "@/components/layout/Footer";
import { MobileContactBar } from "@/components/layout/MobileContactBar";
import { Navbar } from "@/components/layout/Navbar";
import { company, headOffice } from "@/data/company";
import { solutions } from "@/data/solutions";
import { absoluteUrl, siteConfig, siteUrl } from "@/lib/site";

const organisationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": absoluteUrl("/#organization"),
  name: company.name,
  alternateName: company.shortName,
  url: siteUrl,
  slogan: company.tagline,
  description: company.description,
  foundingDate: String(company.foundedYear),
  founder: { "@type": "Person", name: company.founder.name },
  email: company.email,
  telephone: company.phones.map((phone) => phone.tel),
  address: {
    "@type": "PostalAddress",
    streetAddress: "#7, 6th Cross, 3rd Main, Hoysala Nagar, Ramamurthy Nagar",
    addressLocality: "Bangalore",
    postalCode: "560016",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
  areaServed: ["Bangalore", "Mumbai", "Chennai", "Tirupur", "Sweden"],
  makesOffer: solutions.map((solution) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: solution.name,
      description: solution.summary,
      url: absoluteUrl(`/solutions/${solution.slug}`),
    },
  })),
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": absoluteUrl("/#localbusiness"),
  name: company.name,
  image: absoluteUrl(siteConfig.ogImage),
  url: siteUrl,
  email: company.email,
  telephone: company.phones[0].tel,
  parentOrganization: { "@id": absoluteUrl("/#organization") },
  address: {
    "@type": "PostalAddress",
    streetAddress: headOffice.address.slice(0, 2).join(", "),
    addressLocality: "Bangalore",
    postalCode: "560016",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main id="main">{children}</main>
      <Footer />
      <MobileContactBar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
    </>
  );
}
