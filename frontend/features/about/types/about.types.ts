export interface AboutTeamMember {
  id: string;
  name: string;
  role: string;
  qualification: string;
  phone: string;
  avatarUrl?: string;
  bio?: string;
}

export interface AboutService {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface AboutValue {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface AboutContent {
  brand: {
    name: string;
    tagline: string;
    description: string;
  };
  mission: {
    heading: string;
    description: string;
    highlights: readonly string[];
  };
  targetAudience: readonly string[];
  values: readonly AboutValue[];
  services: readonly AboutService[];
  team: readonly AboutTeamMember[];
  contact: {
    email: string;
    location: string;
  };
}
