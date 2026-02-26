import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, MessageSquare, Phone } from "lucide-react";
import { EmailLogo } from "@/components/logos/email-logo";
import { GitHubLogo } from "@/components/logos/github-logo";
import { InstagramLogo } from "@/components/logos/instagram-logo";
import { LinkedInLogo } from "@/components/logos/linkedin-logo";
import { WhatsAppLogo } from "@/components/logos/whatsapp-logo";

export const metadata: Metadata = {
  title: "Author | The AI Agent Economy",
  description: "Meet the author and connect through email, WhatsApp, and social profiles.",
};

const author = {
  name: "Muhammad Bin Salman",
  role: "AI enthusiast and Full Stack AI-Native Developer",
  imageSrc: "/author/me1.png",
  email: "muhammad.binyammani@gmail.com",
  whatsapp: "+92 331 5777066",
  whatsappLink: "https://wa.me/923315777066",
  githubLink: "https://github.com/Muhammad-BinSalman",
  instagramLink: "https://instagram.com/vinigotgenre",
  linkedinLink: "https://www.linkedin.com/in/muhammadbinsalman-yammani",
};

export default function AuthorPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-br from-primary/20 via-red-500/10 to-transparent blur-3xl" />
        <div className="absolute -bottom-40 -left-32 h-[520px] w-[520px] rounded-full bg-gradient-to-tr from-muted/40 via-primary/10 to-transparent blur-3xl" />
        <div className="absolute -bottom-40 -right-24 h-[520px] w-[520px] rounded-full bg-gradient-to-tl from-red-500/10 via-primary/10 to-transparent blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-16 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 mt-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-background/60 backdrop-blur-md text-sm text-muted-foreground shadow-sm">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Author
            </div>
            <h1 className="mt-6 text-5xl md:text-6xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-primary to-zinc-900">
              {author.name}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {author.role}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 text-white px-6 py-3 font-bold hover:bg-red-700 transition-colors"
              >
                Read the book
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3 font-semibold text-foreground hover:bg-accent transition-colors"
              >
                Send a message
                <MessageSquare className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-1">
              <div className="bg-background/60 border rounded-2xl p-8 shadow-xl backdrop-blur-md ring-1 ring-border/50 hover:ring-primary/20 transition">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-2xl overflow-hidden border bg-muted">
                    <Image
                      src={author.imageSrc}
                      alt={author.name}
                      width={160}
                      height={160}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="text-lg font-bold leading-tight">{author.name}</div>
                    <div className="text-sm text-muted-foreground leading-snug mt-1">{author.role}</div>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <div className="flex items-start gap-4 p-2 px-3 rounded-xl bg-muted/40 border border-border/50">
                    <EmailLogo className="w-6 h-6 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1 flex items-center gap-2">
                        <Mail className="w-4 h-4 text-primary" />
                        Email
                      </h3>
                      <Link href={`mailto:${author.email}`} target="_blank">
                        <p className="text-muted-foreground underline break-all">{author.email}</p>
                      </Link>
                      <p className="text-sm text-muted-foreground mt-2">For general inquiries and feedback</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-2 px-3 rounded-xl bg-muted/40 border border-border/50">
                    <WhatsAppLogo className="w-6 h-6 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1 flex items-center gap-2">
                        <Phone className="w-4 h-4 text-primary" />
                        WhatsApp
                      </h3>
                      <Link href={author.whatsappLink} target="_blank" rel="noopener noreferrer">
                        <p className="text-muted-foreground underline">{author.whatsapp}</p>
                      </Link>
                      <p className="text-sm text-muted-foreground mt-2">For quick questions and collaboration</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-8">
              <div className="bg-background/60 border rounded-2xl p-8 shadow-xl backdrop-blur-md ring-1 ring-border/50 hover:ring-primary/20 transition">
                <h2 className="text-2xl font-bold mb-6">Social Profiles</h2>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={author.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border bg-background/50 backdrop-blur px-4 py-2 text-sm hover:bg-muted/40 transition-colors"
                  >
                    <GitHubLogo className="w-4 h-4 text-[#181717] dark:text-white" />
                    <span className="font-medium">GitHub</span>
                    <span className="text-muted-foreground">@Muhammad-BinSalman</span>
                  </a>

                  <a
                    href={author.instagramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border bg-background/50 backdrop-blur px-4 py-2 text-sm hover:bg-muted/40 transition-colors"
                  >
                    <InstagramLogo className="w-4 h-4" />
                    <span className="font-medium">Instagram</span>
                  </a>

                  <a
                    href={author.linkedinLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border bg-background/50 backdrop-blur px-4 py-2 text-sm hover:bg-muted/40 transition-colors"
                  >
                    <LinkedInLogo className="w-4 h-4" />
                    <span className="font-medium">LinkedIn</span>
                    <span className="text-muted-foreground">muhammadbinsalman-yammani</span>
                  </a>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary/15 via-primary/10 to-transparent border border-primary/20 rounded-2xl p-8 shadow-sm">
                <h3 className="text-xl font-bold mb-3 text-primary">Contact preference</h3>
                <p className="text-muted-foreground">
                  If you’re reaching out about the book, include the chapter and a short description of
                  what you’re building. If it’s collaboration, share timelines and your desired outcome.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
