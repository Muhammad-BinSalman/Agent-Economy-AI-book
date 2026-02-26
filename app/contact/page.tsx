import { Metadata } from "next";
import { Mail, MessageSquare, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import FAQsTwo from "@/components/faqs-2";
import { EmailLogo } from "@/components/logos/email-logo";
import { GitHubLogo } from "@/components/logos/github-logo";
import { InstagramLogo } from "@/components/logos/instagram-logo";
import { LinkedInLogo } from "@/components/logos/linkedin-logo";
import { WhatsAppLogo } from "@/components/logos/whatsapp-logo";
import { XLogo } from "@/components/logos/x-logo";

export const metadata: Metadata = {
  title: "Contact | AI-Native Development",
  description: "Get in touch with the author of AI-Native Development book",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-br from-primary/20 via-red-500/10 to-transparent blur-3xl" />
        <div className="absolute -bottom-40 -left-32 h-[520px] w-[520px] rounded-full bg-gradient-to-tr from-muted/40 via-primary/10 to-transparent blur-3xl" />
        <div className="absolute -bottom-40 -right-24 h-[520px] w-[520px] rounded-full bg-gradient-to-tl from-red-500/10 via-primary/10 to-transparent blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-16 relative">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-16 mt-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-background/60 backdrop-blur-md text-sm text-muted-foreground shadow-sm">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Let’s build something AI-native
            </div>
            <h1 className="mt-6 text-5xl md:text-6xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-primary to-zinc-900">
              Get in Touch
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Have questions, feedback, or want to collaborate? I’d love to hear from you.
              Drop me a message or connect on social media.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <div className="rounded-xl border bg-background/60 backdrop-blur-md px-4 py-2 text-sm text-muted-foreground shadow-sm">
                Fast replies
              </div>
              <div className="rounded-xl border bg-background/60 backdrop-blur-md px-4 py-2 text-sm text-muted-foreground shadow-sm">
                Collaboration-friendly
              </div>
              <div className="rounded-xl border bg-background/60 backdrop-blur-md px-4 py-2 text-sm text-muted-foreground shadow-sm">
                Community-first
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16 items-start">
            {/* Contact Form */}
            <div className="bg-background/60 border rounded-2xl p-8 shadow-xl backdrop-blur-md ring-1 ring-border/50 hover:ring-primary/20 transition">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Mail className="w-6 h-6 text-primary" />
                Send a Message
              </h2>

              <ContactForm />
            </div>

            {/* Contact Info & Socials */}
            <div className="space-y-8">
              {/* Quick Info */}
              <div className="bg-background/60 border rounded-2xl p-8 shadow-xl backdrop-blur-md ring-1 ring-border/50 hover:ring-primary/20 transition">
                <h2 className="text-2xl font-bold mb-6">Other Ways to Connect</h2>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-2 px-3 rounded-xl bg-muted/40 border border-border/50">
                    <EmailLogo className="w-6 h-6 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <Link href="mailto:muhammad.binyammani@gmail.com" target="_blank">
                        <p className="text-muted-foreground underline">muhammad.binyammani@gmail.com</p>
                      </Link>
                      <p className="text-sm text-muted-foreground mt-2">
                        For general inquiries and feedback
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-2 px-3 rounded-xl bg-muted/40 border border-border/50">
                    <WhatsAppLogo className="w-6 h-6 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">WhatsApp</h3>
                      <Link href="https://wa.me/923315777066" target="_blank" rel="noopener noreferrer">
                        <p className="text-muted-foreground underline">+92 331 5777066</p>
                      </Link>
                      <p className="text-sm text-muted-foreground mt-2">
                        For quick questions and collaboration
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-background/60 border rounded-2xl p-8 shadow-xl backdrop-blur-md ring-1 ring-border/50 hover:ring-primary/20 transition">
                <h2 className="text-2xl font-bold mb-6">Follow on Social Media</h2>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="https://github.com/Muhammad-BinSalman"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border bg-background/50 backdrop-blur px-4 py-2 text-sm hover:bg-muted/40 transition-colors"
                  >
                    <GitHubLogo className="w-4 h-4 text-[#181717] dark:text-white" />
                    <span className="font-medium">GitHub</span>
                    <span className="text-muted-foreground">@Muhammad-BinSalman</span>
                  </a>

                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border bg-background/50 backdrop-blur px-4 py-2 text-sm hover:bg-muted/40 transition-colors"
                  >
                    <XLogo className="w-4 h-4 text-black dark:text-white" />
                    <span className="font-medium">Twitter</span>
                    <span className="text-muted-foreground"></span>
                  </a>


                  <a
                    href="https://instagram.com/vinigotgenre"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border bg-background/50 backdrop-blur px-4 py-2 text-sm hover:bg-muted/40 transition-colors"
                  >
                    <InstagramLogo className="w-4 h-4" />
                    <span className="font-medium">Instagram</span>
                    <span className="text-muted-foreground"></span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/muhammadbinsalman-yammani"
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

              {/* Response Time */}
              <div className="bg-gradient-to-br from-primary/15 via-primary/10 to-transparent border border-primary/20 rounded-2xl p-8 shadow-sm">
                <h3 className="text-xl font-bold mb-3 text-primary">Response Time</h3>
                <p className="text-muted-foreground mb-4">
                  I typically respond to messages within 24-48 hours. For urgent matters,
                  please reach out via social media for a quicker response.
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>All messages are read and appreciated</span>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <FAQsTwo />
          </div>
        </div>
      </div>
    </div>
  );
}
