import { InfiniteSlider } from "../ui/infinite-slider";
import { ProgressiveBlur } from "../ui/progressive-blur";

const AI_LOGOS = [
    { src: "/logos/openai.svg", alt: "OpenAI", h: "h-5" },
    { src: "https://cdn.simpleicons.org/google/4285F4", alt: "Google Gemini", h: "h-5" },
    { src: "/logos/claude.png", alt: "Claude", h: "h-5" },
    { src: "https://cdn.simpleicons.org/anthropic/000000", alt: "Anthropic", h: "h-5" },
    { src: "https://cdn.simpleicons.org/python/3776AB", alt: "Python", h: "h-6" },
    { src: "https://cdn.simpleicons.org/meta/0082FB", alt: "Meta (LLaMA)", h: "h-5" },
    { src: "https://cdn.simpleicons.org/huggingface/FFD21E", alt: "Hugging Face", h: "h-6" },
    { src: "/logos/mistral.png", alt: "Mistral AI", h: "h-5" },
    { src: "https://cdn.simpleicons.org/langchain/1C3C3C", alt: "LangChain", h: "h-5" },
    { src: "/logos/azure.jfif", alt: "Azure AI", h: "h-5" },
    { src: "/logos/grok.jfif", alt: "Grok", h: "h-5" },
    { src: "https://cdn.simpleicons.org/ollama/000000", alt: "Ollama", h: "h-5" },
];

export default function LogoCloud() {
    return (
        <section className="mx-auto">
            <div className="group relative max-w-5xl">
                <div className="flex flex-col items-center md:flex-row -ml-6">
                    <div className="md:max-w-44 md:border-r md:border-white/30 md:pr-6 px-4">
                        <p className="text-end text-sm font-thin">
                            including the latest AI technologies
                        </p>
                    </div>
                    <div className="relative py-6 md:w-[calc(100%-11rem)]">
                        <InfiniteSlider speedOnHover={20} speed={40} gap={56}>
                            {AI_LOGOS.map(({ src, alt, h }) => (
                                <div key={alt} className="flex items-center">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={src}
                                        alt={alt}
                                        className={`mx-auto ${h} w-auto opacity-80 hover:opacity-100 transition-opacity`}
                                    />
                                </div>
                            ))}
                        </InfiniteSlider>

                        <ProgressiveBlur
                            className="pointer-events-none absolute left-0 top-0 h-full w-20"
                            direction="left"
                        />
                        <ProgressiveBlur
                            className="pointer-events-none absolute right-0 top-0 h-full w-20"
                            direction="right"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}