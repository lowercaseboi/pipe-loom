import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/refract/Nav";
import { Hero } from "@/components/refract/Hero";
import { Context } from "@/components/refract/Context";
import { HowItWorks } from "@/components/refract/HowItWorks";
import { LiveDemo } from "@/components/refract/LiveDemo";
import { Features } from "@/components/refract/Features";
import { Footer } from "@/components/refract/Footer";

const title = "Refract — See what AI says about your brand";
const description =
  "Refract shows you what ChatGPT, Gemini, and Perplexity tell customers about your brand — and how to fix the gaps. Try the live AI demo.";

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
