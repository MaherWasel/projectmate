import projectMatesIcon from "../../assets/icons/mainIcon.svg";

export default function Sidebar() {
  return (
    <section className="w-full md:w-1/2 bg-darkGray flex flex-col justify-center items-center p-4 md:p-8 ">
      <div className="flex flex-col justify-center items-center">
        <img src={projectMatesIcon} width="150px" alt="projectMates Icon" />
        <h1 className="text-white text-2xl md:text-3xl font-semibold mt-4">
          ProjectMates
        </h1>
      </div>
    </section>
  );
}
