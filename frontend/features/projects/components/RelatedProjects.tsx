import Link from "next/link";

interface RelatedProject {
  id: string;
  title: string;
}

interface RelatedProjectsProps {
  projects: RelatedProject[];
}

export default function RelatedProjects({ projects }: RelatedProjectsProps) {
  return (
    <section>
      <h2>Related Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <Link href={`/projects/${project.id}`}>{project.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
