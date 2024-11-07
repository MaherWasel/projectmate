import React from "react";
import avatar from "../../../assets/icons/ProfileIcon.svg";
import ownerIcon from "../../../assets/icons/ownerIcon.svg";
import Button from "../../../components/buttons/SubmitButton";
import requirementsIcon from "../../../assets/icons/requirementsIcon.svg";
import RequirementItem from "./RequirementItem";
import MemberItem from "./MemberItem";
const ProjectDetails = ({ project }) => {
  const maxLength = 4;
  const requirements = ["AI Engineer", "CS/SWE Major", "JavaScript Experience"];
  const members = ["Abdullah Almajed", "Maher", "Turki"];
  return (
    <main className="text-white">
      <section className="flex items-center text-white justify-between">
        <span className="flex items-center space-x-1 sm:space-x-4 px-2 sm:px-8">
          <img src={avatar} alt="Profile Icon" className="h-10 sm:h-14" />
          <span className="flex space-x-1 sm:space-x-2 items-baseline">
            <h2 className="text-xl sm:text-3xl font-semibold">
              Abdullah Almajed
            </h2>
            <img src={ownerIcon} alt="Profile Icon" className="h-4 sm:h-6" />
          </span>
        </span>
        <div className="w-[2vm] p-2 px-4 sm:px-8">
          <Button>Request To Join</Button>
        </div>
      </section>
      <section className="justify-center px-4 sm:px-10 py-6 sm:py-12">
        <p className="text-xl sm:text-3xl">
          Our AI project team consists of data scientists, engineers, and domain
          experts collaborating to develop cutting-edge machine learning
          solutions.
        </p>
      </section>
      <section>
        <div className="px-2">
          <span className="flex items-center space-x-2 px-2 sm:px-8 sm:pb-4">
            <img
              src={requirementsIcon}
              alt="Requirements Icon"
              className="h-8 sm:h-10"
            />
            <p className="text-lightBlue text-xl sm:text-3xl font-semibold">
              Requirements:
            </p>
          </span>
        </div>

        {requirements.map((requirement) => (
          <RequirementItem requirement={requirement} />
        ))}
      </section>
      <div className="h-16"></div>
      <section>
        <div className="px-2">
          <span className="flex items-center space-x-2 px-2 sm:px-8 sm:pb-4">
            <img
              src={requirementsIcon}
              alt="Requirements Icon"
              className="h-8 sm:h-10"
            />
            <p className="text-lightBlue text-xl sm:text-3xl font-semibold">
              Members: {members.length}/{maxLength}
            </p>
          </span>
        </div>

        {members.map((name) => (
          <MemberItem memberName={name} />
        ))}
      </section>
    </main>
  );
};

export default ProjectDetails;
