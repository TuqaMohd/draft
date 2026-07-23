export const COMPANIES = ["Rihal", "Transformers Pioneers", "Codeline"] as const;

export type Company = (typeof COMPANIES)[number];

export const COMPANY_SHORT_LABEL: Record<Company, string> = {
  Rihal: "Rihal",
  "Transformers Pioneers": "TP",
  Codeline: "Codeline",
};

export const APP_NAME = "Amanah";
export const APP_TAGLINE = "Group Operations Platform";
