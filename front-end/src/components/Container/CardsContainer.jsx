import ProjectCard from "../Cards/ProjectCards";
// Note that variant indicate which page is the card displayed on by defualt is home it can be invites also
export default function CardsContainer({ projects, variant = "home" }) {
  if (projects.length === 0) {
    return (
      <p className="flex flex-1 justify-center items-center text-white text-3xl">
        No Projects Found
      </p>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((e) => (
        <ProjectCard key={e._id} project={e} variant={variant} />
      ))}
    </div>
  );
}
