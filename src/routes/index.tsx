import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/refract/Nav";
import { Hero } from "@/components/refract/Hero";
import { Context } from "@/components/refract/Context";
import { HowItWorks } from "@/components/refract/HowItWorks";
import { LiveDemo } from "@/components/refract/LiveDemo";
import { Features } from "@/components/refract/Features";
import { Footer } from "@/components/refract/Footer";

const title = "Refract — See how AI systems describe your project";
const description =
  "Refract asks AI systems realistic questions about a project, shows what the answers get right or miss, and turns the gaps into documentation you can publish.";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-ink">
      <Nav />
      <main>
        <Hero />
        <Context />
        <HowItWorks />
        <LiveDemo />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
