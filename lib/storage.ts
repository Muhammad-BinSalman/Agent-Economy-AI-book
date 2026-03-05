import type { ThemePreference } from "@/types/theme";
import type { WaitlistEntry } from "@/types/waitlist";

const THEME_KEY = "theme-preference";
const WAITLIST_KEY = "waitlist";

const defaultPreference: ThemePreference = {
  mode: "system",
  updatedAt: Date.now(),
};

export const themeStorage = {
  get(): ThemePreference {
    if (typeof window === "undefined") return defaultPreference;

    try {
      const data = localStorage.getItem(THEME_KEY);
      return data ? JSON.parse(data) : defaultPreference;
    } catch {
      return defaultPreference;
    }
  },

  set(mode: ThemePreference["mode"]): void {
    if (typeof window === "undefined") return;

    try {
      const preference: ThemePreference = {
        mode,
        updatedAt: Date.now(),
      };
      localStorage.setItem(THEME_KEY, JSON.stringify(preference));
    } catch (error) {
      console.error("Failed to save theme preference:", error);
    }
  },
};

export const waitlistStorage = {
  getAll(): WaitlistEntry[] {
    if (typeof window === "undefined") return [];

    try {
      const data = localStorage.getItem(WAITLIST_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  add(email: string): { success: boolean; error?: string } {
    if (typeof window === "undefined") {
      return { success: false, error: "localStorage unavailable" };
    }

    try {
      const entries = this.getAll();
      const sanitized = email.trim().toLowerCase();

      // Check for duplicates
      if (entries.some((e) => e.email === sanitized)) {
        return { success: false, error: "Email already registered" };
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(sanitized)) {
        return { success: false, error: "Invalid email format" };
      }

      // Add new entry
      entries.push({
        email: sanitized,
        timestamp: Date.now(),
      });

      localStorage.setItem(WAITLIST_KEY, JSON.stringify(entries));
      return { success: true };
    } catch {
      return { success: false, error: "Failed to save email" };
    }
  },

  hasEmail(email: string): boolean {
    const entries = this.getAll();
    return entries.some((e) => e.email === email.trim().toLowerCase());
  },
};
