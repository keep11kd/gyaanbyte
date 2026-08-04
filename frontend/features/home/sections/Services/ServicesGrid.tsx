import ServiceCard from "./ServiceCard";

import { servicesContent } from "../../data/services.data";

export default function ServicesGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {servicesContent.services.map((service) => (
        <ServiceCard
          key={service.title}
          {...service}
          icon={<service.icon className="h-7 w-7" />}
        />
      ))}
    </div>
  );
}
