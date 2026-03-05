'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export default function FAQsTwo() {
    const faqItems = [
        {
            id: 'item-1',
            question: 'Is the book free to read online?',
            answer: 'Yes. The book is published as a web experience so you can read it online. If you want to reuse or redistribute content, please check the licensing details first.',
        },
        {
            id: 'item-2',
            question: 'Can I use the content in my product, course, or company docs?',
            answer: 'For personal learning, you’re good to go. For commercial use (products, training material, or internal documentation), reach out and we’ll discuss licensing or attribution options.',
        },
        {
            id: 'item-3',
            question: 'Do you offer consulting or team training?',
            answer: 'Yes. I offer advisory sessions, architecture reviews, and hands-on team training on AI-native product development, agentic systems, and applied LLM workflows.',
        },
        {
            id: 'item-4',
            question: 'Are you available for speaking engagements?',
            answer: 'Yes. I’m available for conferences, meetups, podcasts, and corporate events—share your topic, audience, and timeline and I’ll confirm availability.',
        },
        {
            id: 'item-5',
            question: 'How can I contribute or suggest improvements?',
            answer: 'The best way is to open an issue or pull request on GitHub. If you have corrections, examples, or chapter suggestions, send them through and I’ll review them.',
        },
    ]

    return (
        <section className="py-16 md:py-16">
            <div className="mx-auto max-w-5xl px-4 md:px-6">
                <div className="mx-auto max-w-xl text-center">
                    <h2 className="text-balance text-3xl font-bold md:text-4xl lg:text-5xl">FAQ</h2>
                    <p className="text-muted-foreground mt-4 text-balance">Quick answers about the book, licensing, collaboration, and ways to connect.</p>
                </div>

                <div className="mx-auto mt-12 max-w-xl">
                    <Accordion
                        type="single"
                        collapsible
                        className="bg-card ring-muted w-full rounded-2xl border px-8 py-3 shadow-sm ring-4 dark:ring-0">
                        {faqItems.map((item) => (
                            <AccordionItem
                                key={item.id}
                                value={item.id}
                                className="border-dashed">
                                <AccordionTrigger className="cursor-pointer text-base hover:no-underline">{item.question}</AccordionTrigger>
                                <AccordionContent>
                                    <p className="text-base text-muted-foreground">{item.answer}</p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    <p className="text-muted-foreground mt-6 text-center">
                        Enjoy Reading! ❤
                    </p>
                </div>
            </div>
        </section>
    )
}
