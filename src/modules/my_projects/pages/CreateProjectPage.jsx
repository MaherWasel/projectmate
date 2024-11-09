import React, { useState } from "react";
import HomeHeader from "../../../components/layout/HomeHeader";
import StepLabel from "../components/StepLabel";
import TextInput from "../../../components/input/TextInput";
import TextArea from "../../../components/input/TextArea";
import SubmitButton from "../../../components/buttons/SubmitButton";
import MembersIncrementer from "../components/MembersIncrementer";

const CreateProjectPage = () => {
  const [requirements, setRequirements] = useState([""]);

  const addRequirement = () => {
    setRequirements([...requirements, ""]);
  };

  const handleRequirementChange = (index, value) => {
    const updatedRequirements = [...requirements];
    updatedRequirements[index] = value;
    setRequirements(updatedRequirements);
  };

  const removeRequirement = (index) => {
    const updatedRequirements = requirements.filter((_, i) => i !== index);
    setRequirements(updatedRequirements);
  };

  return (
    <main className="bg-darkGray min-h-screen w-full flex flex-col text-white">
      <span className="mb-4 p-8">
        <HomeHeader variant="myProjects" />
      </span>
      <section className="flex flex-col items-center">
        <h1 className="text-4xl sm:text-5xl mb-10">Create New Project</h1>

        <div className="w-[80vw] sm:w-[50vw] flex flex-col space-y-2">
          <section>
            <StepLabel stepNumber={1} label={"Project Name"} />
            <TextInput />
          </section>
          <section>
            <StepLabel stepNumber={2} label={"Description"} />
            <TextArea />
          </section>
          <section>
            <StepLabel stepNumber={3} label={"Requirements"} />
            <div className="flex flex-col items-center space-y-2">
              {requirements.map((requirement, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 w-[80vw] sm:w-[50vw]"
                >
                  <TextInput
                    value={requirement}
                    onChange={(e) =>
                      handleRequirementChange(index, e.target.value)
                    }
                  />
                  <button
                    onClick={() => removeRequirement(index)}
                    className="text-red-500 hover:text-red-700 font-bold"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <span
                className="text-lightBlue hover:cursor-pointer text-xl font-bold"
                onClick={addRequirement}
              >
                + Add Requirement
              </span>
            </div>
          </section>
          <section className=" w-[40vw] sm:w-min text-nowrap space-y-4">
            <StepLabel stepNumber={4} label={"Number Of Members"} />
            <MembersIncrementer />
          </section>
        </div>
        <div className="font-bold my-8">
          <SubmitButton>Create Project</SubmitButton>
        </div>
      </section>
    </main>
  );
};

export default CreateProjectPage;
