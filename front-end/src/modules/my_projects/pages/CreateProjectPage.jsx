import React, { useState } from "react";
import HomeHeader from "../../../components/layout/HomeHeader";
import StepLabel from "../components/StepLabel";
import TextInput from "../../../components/input/TextInput";
import TextArea from "../../../components/input/TextArea";
import SubmitButton from "../../../components/buttons/SubmitButton";
import MembersIncrementer from "../components/MembersIncrementer";
import majors from "../../../helpers/majors";
import Select from "react-select";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateProjectPage = () => {
  const [requirements, setRequirements] = useState([""]);
  const [selectedMajors, setSelectedMajors] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const [submitionState, setSubmitionState] = useState({
    loading: false,
    error: false,
    success: false,
    data: undefined,
    errorMessage: undefined,
  });

  const [numOfMembers, setNumOfMembers] = useState(1);

  const addRequirement = () => setRequirements([...requirements, ""]);
  const handleRequirementChange = (index, value) => {
    const updatedRequirements = [...requirements];
    updatedRequirements[index] = value;
    setRequirements(updatedRequirements);
  };
  const removeRequirement = (index) => {
    const updatedRequirements = requirements.filter((_, i) => i !== index);
    setRequirements(updatedRequirements);
  };

  const handleSelectChange = (selectedOptions) => {
    setSelectedMajors(
      selectedOptions ? selectedOptions.map((opt) => opt.value) : []
    );
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitionState({
      loading: true,
      error: false,
      success: false,
      data: undefined,
      errorMessage: undefined,
    });

    try {
      const formData = {
        title,
        description,
        requirements,
        majors: selectedMajors,
        leader: localStorage.getItem("username"),
      };

      const response = await axios.post(
        `http://localhost:8080/projects`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        setSubmitionState((old) => ({
          ...old,
          success: true,
          data: response.data,
        }));
        navigate("/projects/" + response.data.record._id);
      } else {
        // Handle unexpected non-401 errors
        setSubmitionState((old) => ({
          ...old,
          success: false,
          error: true,
          errorMessage:
            response.data.message?.message || "An unknown error occurred.",
        }));
      }
    } catch (e) {
      // Check for 401 Unauthorized
      if (e.response?.status === 401) {
        localStorage.removeItem("token"); // Clear invalid token
        navigate("/login");
        console.error("Unauthorized: Redirecting to login.");
      } else {
        let errorMessage = "An error occurred.";

        // Extract meaningful error message from the backend response
        if (e.response?.data?.message?.errors) {
          const errors = e.response.data.message.errors;
          errorMessage = Object.values(errors)
            .map((err) => err.message)
            .join(", ");
        } else if (e.response?.data?.message) {
          errorMessage = e.response.data.message;
        } else if (e.message) {
          errorMessage = e.message;
        }

        setSubmitionState((old) => ({
          ...old,
          success: false,
          error: true,
          errorMessage,
        }));
      }
    } finally {
      setSubmitionState((old) => ({ ...old, loading: false }));
    }
  }

  return (
    <main className="bg-darkGray min-h-screen w-full flex flex-col text-white">
      <span className="mb-4 p-8">
        <HomeHeader variant="myProjects" />
      </span>
      <section className="flex flex-col items-center">
        <h1 className="text-4xl sm:text-5xl mb-10">Create New Project</h1>

        <form
          className="w-[80vw] sm:w-[50vw] flex flex-col space-y-2"
          onSubmit={handleSubmit}
        >
          <section>
            <StepLabel stepNumber={1} label={"Project Name"} />
            <TextInput
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </section>
          <section>
            <StepLabel stepNumber={2} label={"Description"} />
            <TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
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
          <section>
            <StepLabel stepNumber={4} label={"Majors"} />
            <Select
              isMulti
              options={majors.map((major) => ({
                value: major.name,
                label: major.name,
              }))}
              onChange={handleSelectChange}
              value={selectedMajors.map((major) => ({
                value: major,
                label: major,
              }))}
              className="m-4 text-lightGray font-bold w-[50vw]"
            />
          </section>
          <section className=" w-[40vw] sm:w-min text-nowrap space-y-4 ">
            <StepLabel stepNumber={5} label={"Number Of Members"} />
            <MembersIncrementer
              numOfMembers={numOfMembers}
              setNumOfMembers={setNumOfMembers}
            />
          </section>
          <section className="font-bold my-8 py-4 flex flex-col gap-4">
            {submitionState.error && (
              <p className="text-red-400 flex justify-center ">
                {submitionState.errorMessage}
              </p>
            )}
            <SubmitButton loading={submitionState.loading}>
              Create Project
            </SubmitButton>
          </section>
        </form>
      </section>
    </main>
  );
};

export default CreateProjectPage;
