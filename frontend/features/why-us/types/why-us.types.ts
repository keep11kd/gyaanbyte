export interface WhyUsMetric {
  value: string;
  label: string;
}

export interface WhyUsFeature {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  highlightBadge?: string;
  benefits: readonly string[];
  metric?: WhyUsMetric;
  accentColor?: "lime" | "emerald" | "teal" | "sky" | "indigo";
  featured?: boolean;
}

export interface WhyUsContent {
  badge: {
    text: string;
    iconName?: string;
  };
  heading: {
    line1: string;
    highlight: string;
    line2?: string;
  };
  description: string;
  stats: readonly {
    value: string;
    label: string;
    description?: string;
  }[];
  actions?: {
    primary?: {
      label: string;
      href: string;
    };
    secondary?: {
      label: string;
      href: string;
    };
  };
  features: readonly WhyUsFeature[];
}
