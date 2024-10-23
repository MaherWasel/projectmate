import ProjectCard from "../Cards/ProjectCards";
// Note that variant indicate which page is the card displayed on by defualt is home it can be invites also
export default function CardsContainer({ projects, variant = "home" }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((e) => (
        <ProjectCard
          project={{
            title: e.title,
            requirements: e.requirements,
            description: e.description,
            status: e.status,
          }}
          variant={variant}
        />
      ))}
    </div>
  );
}
