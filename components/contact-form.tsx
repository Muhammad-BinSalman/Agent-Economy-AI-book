"use client";

import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";

interface ContactFormProps {
  className?: string;
}

export function ContactForm({ className }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitted(true);
        // Reset form
        (e.currentTarget as HTMLFormElement)?.reset();
      } else {
        setError(result.error || "Failed to send message");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      console.error("Error submitting form:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
        <div className="flex items-center gap-3 text-green-800 dark:text-green-200 mb-4">
          <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
          <h3 className="font-bold text-lg">Message Sent Successfully!</h3>
        </div>
        <p className="text-green-700 dark:text-green-300 mb-8">
          Thank you for reaching out. I'll get back to you within 24-48 hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-sm text-green-700 dark:text-green-300 hover:text-green-900 dark:hover:text-green-100 font-medium underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-center gap-2 text-red-800 dark:text-red-200">
            <p className="font-medium">{error}</p>
          </div>
        </div>
      )}

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          disabled={isLoading}
          className="w-full px-4 py-3 rounded-lg border bg-background mb-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="Your name"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          disabled={isLoading}
          className="w-full px-4 py-3 rounded-lg border bg-background mb-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="your.email@example.com"
        />
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium mb-2">
          Subject
        </label>
        <select
          id="subject"
          name="subject"
          required
          disabled={isLoading}
          className="w-full px-4 py-3 rounded-lg border bg-background mb-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <option value="">Select a topic</option>
          <option value="feedback">Feedback on the book</option>
          <option value="question">Question about content</option>
          <option value="collaboration">Collaboration opportunity</option>
          <option value="speaking">Speaking engagement</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          disabled={isLoading}
          className="w-full px-4 py-3 rounded-lg border bg-background mb-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="Your message..."
        ></textarea>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary text-primary-foreground font-semibold py-4 px-6 rounded-lg hover:bg-red-800/90 bg-red-700 transition-colors flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            Send Message
          </>
        )}
      </button>

      {/* Note about email */}
      <p className="text-xs text-muted-foreground mt-4 text-center">
        Your email will only be used to respond to your message. We respect your privacy.
      </p>
    </form>
  );
}
