import type { Project } from "../types/project.types";

export const iotProjects: Project[] = [
  {
    id: "iot-smart-agriculture",
    title: "IoT Smart Agriculture & Automated Irrigation System",
    category: "IoT & Embedded",
    subcategory: "Smart Farming",
    academicBranches: [
      "B.Tech (EC)",
      "B.Tech (EE)",
      "B.Tech (IT)",
    ],
    description:
      "Smart irrigation system using ESP32, cloud telemetry, soil moisture sensors and weather monitoring for precision farming.",
    image: "/images/projects/smart-agriculture-iot.webp",
    technologies: [
      "ESP32",
      "Arduino",
      "MQTT",
      "ThingsBoard",
      "Node.js",
    ],
    duration: "3 Weeks",
    difficulty: "Intermediate",
    featured: true,
    client: "Student",
    ieeePaperSupported: true,
    deliverables: [
      "Hardware Prototype",
      "Source Code",
      "Circuit Diagram",
      "IEEE Report",
    ],
  },

  {
    id: "smart-home-automation",
    title: "Smart Home Automation System",
    category: "IoT & Embedded",
    subcategory: "Home Automation",
    academicBranches: [
      "B.Tech (EC)",
      "B.Tech (EE)",
      "B.Tech (IT)",
    ],
    description:
      "IoT-enabled smart home system with lighting control, security monitoring, appliance automation and mobile app integration.",
    image: "/images/projects/smart-home-automation.webp",
    technologies: [
      "ESP32",
      "Arduino",
      "Firebase",
      "Flutter",
      "MQTT",
    ],
    duration: "4 Weeks",
    difficulty: "Intermediate",
    featured: true,
    client: "Business",
    ieeePaperSupported: true,
    deliverables: [
      "Hardware Kit",
      "Android App",
      "Circuit Diagram",
      "Documentation",
    ],
  },

  {
    id: "smart-traffic-management",
    title: "AI Smart Traffic Management System",
    category: "IoT & Embedded",
    subcategory: "Smart City",
    academicBranches: [
      "B.Tech (CS)",
      "B.Tech (EC)",
    ],
    description:
      "AI-powered traffic monitoring system with vehicle detection, adaptive traffic lights and congestion analytics.",
    image: "/images/projects/smart-traffic-management.webp",
    technologies: [
      "Python",
      "YOLO",
      "OpenCV",
      "ESP32",
      "MQTT",
    ],
    duration: "5 Weeks",
    difficulty: "Advanced",
    featured: true,
    client: "Government",
    ieeePaperSupported: true,
    deliverables: [
      "Source Code",
      "Hardware Prototype",
      "Research Paper",
      "Presentation",
    ],
  },

  {
    id: "smart-parking-system",
    title: "IoT Smart Parking Management",
    category: "IoT & Embedded",
    subcategory: "Smart City",
    academicBranches: [
      "B.Tech (EC)",
      "B.Tech (IT)",
    ],
    description:
      "Real-time parking management system using ultrasonic sensors, ESP32 and mobile monitoring dashboard.",
    image: "/images/projects/smart-parking-system.webp",
    technologies: [
      "ESP32",
      "Arduino",
      "Firebase",
      "Flutter",
    ],
    duration: "3 Weeks",
    difficulty: "Intermediate",
    featured: false,
    client: "Student",
    ieeePaperSupported: true,
    deliverables: [
      "Hardware Prototype",
      "Circuit Diagram",
      "Source Code",
      "IEEE Report",
    ],
  },
];
