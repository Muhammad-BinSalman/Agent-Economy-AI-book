export type ThemeMode = "light" | "dark" | "system";

export interface ThemePreference {
  /** Selected theme mode */
  mode: ThemeMode;

  /** Timestamp of last update */
  updatedAt: number;
}

export const defaultPreference: ThemePreference = {
  mode: "system",
  updatedAt: Date.now(),
};
