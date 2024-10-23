import CardsContainer from "../../../components/Container/CardsContainer";
import HomeHeader from "../../../components/layout/HomeHeader";
export default function MyInvitesScreen() {
  const projects = [
    {
      title: "Merchant Analysis",
      requirements: ["flutter", "bloc", "provider"],
      description: "Merchant Handler with Ease",
      status: "Open",
    },
    {
      title: "E-Commerce Platform",
      requirements: ["react", "tailwind", "supabase"],
      description: "A platform for online shopping.",
      status: "In Progress",
    },
    {
      title: "Social Media App",
      requirements: ["flutter", "firebase", "riverpod"],
      description: "An app to connect people.",
      status: "Completed",
    },
    {
      title: "Task Management Tool",
      requirements: ["nextjs", "react", "graphql"],
      description: "A tool to manage tasks and projects.",
      status: "Open",
    },
    {
      title: "Blog Website",
      requirements: ["nextjs", "markdown", "tailwind"],
      description: "A website for writing and sharing blogs.",
      status: "In Progress",
    },
    {
      title: "Weather App",
      requirements: ["flutter", "api integration", "riverpod"],
      description: "An app that provides weather updates.",
      status: "Completed",
    },
  ];

  return (
    <main className="bg-darkGray min-h-screen w-full p-8 flex justify-center flex-col">
      <span className="mb-4">
        <HomeHeader variant="myInvites" />
      </span>
      <CardsContainer variant="invites" projects={projects} />
    </main>
  );
}
