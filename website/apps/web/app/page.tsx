import { Hero } from "@/components/sections/hero";
import { FeatureBadges } from "@/components/sections/feature-badges";
import { Stats } from "@/components/sections/stats";
import { TechnologyGrid } from "@/components/sections/technology-grid";
import { IndustryShowcase } from "@/components/sections/industry-showcase";
import { FeaturedProducts } from "@/components/sections/featured-products";
import { Process } from "@/components/sections/process";
import { ClosingCta } from "@/components/sections/closing-cta";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo({
  title:
    "Elevate: Custom Flexible Packaging, Made in America",
  description:
    "Elevate makes flexible packaging in the USA: custom printed pouches, laminated films, and rotogravure and flexo printing for brands across the country.",
  path: "/",
  absoluteTitle: true
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeatureBadges />
      <FeaturedProducts />
      <Process />
      <div className="band-dark">
        <Stats />
      </div>
      <TechnologyGrid />
      <IndustryShowcase />
      <div className="band-dark">
        <ClosingCta />
      </div>
    </>
  );
}
