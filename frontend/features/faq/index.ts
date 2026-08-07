// features/faq/index.ts

// Main Page View
export { default as FAQPageView } from "./FAQPageView";

// Explicitly re-export section component with a distinct alias if needed, or direct
export { FAQ, FAQAccordion, FAQHeader, FAQItem } from "./sections";

// Re-export Data & Types
export * from "./data";

// Type export - type word use karne se TypeScript name collision avoid karta hai
export type { FAQ as FAQType, FAQCategory, FAQContent } from "./types";
