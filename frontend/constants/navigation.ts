export interface NavigationChild {
  title: string;
  href: string;
}

export interface NavigationItem {
  title: string;
  href?: string;
  children?: NavigationChild[];
}

export const navigation: NavigationItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Services",
    children: [
      {
        title: "Website Development",
        href: "/services/website-development",
      },
      {
        title: "Software Development",
        href: "/services/software-development",
      },
      {
        title: "Final Year Projects",
        href: "/services/final-year-projects",
      },
      {
        title: "AI Solutions",
        href: "/services/ai-solutions",
      },
    ],
  },
  {
    title: "Training",
    children: [
      {
        title: "Java Full Stack",
        href: "/training/java",
      },
      {
        title: "Python Full Stack",
        href: "/training/python",
      },
      {
        title: "Spring Boot",
        href: "/training/spring-boot",
      },
      {
        title: "DSA",
        href: "/training/dsa",
      },
    ],
  },
  {
    title: "Projects",
    href: "/projects",
  },
  {
    title: "Resources",
    children: [
      {
        title: "Blog",
        href: "/blog",
      },
      {
        title: "Roadmaps",
        href: "/resources/roadmaps",
      },
      {
        title: "FAQs",
        href: "/faq",
      },
    ],
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];
