interface ProjectDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProjectDetailsPage({
  params,
}: Readonly<ProjectDetailsPageProps>) {
  const { id } = await params;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-slate-900">Project Details</h1>
      <p className="mt-2 text-sm text-slate-500">Project ID: {id}</p>
    </div>
  );
}
