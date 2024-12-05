import React, { useRef } from "react";
import avatar from "../../../assets/icons/ProfileIcon.svg";
import ownerIcon from "../../../assets/icons/ownerIcon.svg";
import Button from "../../../components/buttons/SubmitButton";
import requirementsIcon from "../../../assets/icons/requirementsIcon.svg";
import RequirementItem from "./RequirementItem";
import MemberItem from "./MemberItem";
import { useNavigate } from "react-router-dom";
import JoinProjectDialog from "./JoinProjectDialog";
import ReportDialog from "./ReportDialog";
import InviteTeamMemberDialog from "./InviteTeamMemberDialog";

const ProjectDetails = ({ project }) => {
  // let isTeamLeader = currentUser.id === project.teamLeader.id;
  const navigate = useNavigate();
  const joinProjectDialogRef = useRef();
  const reportDialogRef = useRef();
  const inviteDialogRef = useRef();

  return (
    <main className="text-white">
      <JoinProjectDialog project={project} dialogRef={joinProjectDialogRef} />
      <ReportDialog project={project} dialogRef={reportDialogRef} />
      <InviteTeamMemberDialog project={project} dialogRef={inviteDialogRef} />

      {/* ToDo: add team leader */}
      <section className="flex items-center text-white justify-between">
        <span className="flex items-center space-x-1 sm:space-x-4 px-2 sm:px-8">
          <img
            src={project.members[0].image.url ?? avatar}
            alt="Profile Icon"
            className="w-16 h-16 rounded-full object-cover"
          />

          <span className="flex space-x-1 sm:space-x-2 items-baseline">
            <h2
              onClick={() =>
                navigate("/profile/" + project.members[0].username)
              }
              className="text-xl sm:text-3xl font-semibold hover:underline hover:cursor-pointer"
            >
              {project.members[0].username}
            </h2>
            <img src={ownerIcon} alt="Profile Icon" className="h-4 sm:h-6" />
          </span>
        </span>

        <div className=" p-2 px-4 sm:px-8 flex flex-col gap-6">
          {project.isLeader && project.members.length !== project.maxMembers ? (
            <Button onClick={() => inviteDialogRef.current.open()}>
              Invite Members
            </Button>
          ) : (
            !project.isFull && (
              <Button onClick={() => joinProjectDialogRef.current.open()}>
                Request To Join
              </Button>
            )
          )}
          {!project.isLeader && (
            <button
              onClick={() => reportDialogRef.current.open()}
              className="p-2 rounded-2xl delay-75 duration-75 text-white h-full bg-redError hover:bg-redErrorHover"
            >
              Report
            </button>
          )}
        </div>
      </section>
      <section className="justify-center px-4 sm:px-10 py-6 sm:py-12">
        <p className="text-xl sm:text-3xl">{project.description}</p>
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

        {project.requirements.map((requirement, index) => (
          <RequirementItem key={index} requirement={requirement} />
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
              Majors:
            </p>
          </span>
        </div>

        {project.majors.map((major, index) => (
          <RequirementItem key={index} requirement={major} />
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
              Members: {project.members.length}/{project.maxMembers}
            </p>
          </span>
        </div>

        {project.members.map((member) => {
          return <MemberItem key={member._id} member={member} />;
        })}
      </section>
    </main>
  );
};

export default ProjectDetails;
