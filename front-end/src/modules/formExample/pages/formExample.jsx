import { useForm } from "react-hook-form";

import TextInput from "../../../components/input/TextInput"; // Corrected path
import { Search } from "@mui/icons-material";

export default function FormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        label="User Name"
        name="username"
        register={register}
        errors={errors}
        required
        validation={{
          minLength: {
            value: 3,
            message: "Minimum length is 3 characters",
          },
          maxLength: {
            value: 15,
            message: "Maximum length is 15 characters",
          },
          pattern: {
            value: /^[A-Za-z]+$/,
            message: "Only alphabets are allowed",
          },
        }}
        placeholder="Enter your username"
      />
      <TextInput
        label="Email"
        name="email"
        register={register}
        errors={errors}
        required
        validation={{
          minLength: {
            value: 3,
            message: "Minimum length is 3 characters",
          },
          maxLength: {
            value: 50, // Optional: Adjust max length if needed
            message: "Maximum length is 50 characters",
          },
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Please enter a valid email address",
          },
        }}
        placeholder="Enter your Email"
      />
      <TextInput
        label="Password"
        name="password"
        register={register}
        errors={errors}
        required
        type="password"
        validation={{
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters long",
          },
          maxLength: {
            value: 50,
            message: "Password cannot exceed 50 characters",
          },
          pattern: {
            value:
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            message:
              "Password must contain at least one letter, one number, and one special character",
          },
        }}
        placeholder="Enter your Password"
      />

      <TextInput
        name="searchField"
        errors={errors}
        placeholder="Search"
        validation={{
          minLength: {
            value: 3,
            message: "Minimum length is 3 characters",
          },
          maxLength: {
            value: 15,
            message: "Maximum length is 15 characters",
          },
          pattern: {
            value: /^[A-Za-z]+$/,
            message: "Only alphabets are allowed",
          },
        }}
        icon={<Search />}
      />
      <button
        type="submit"
        className="mt-4 p-2 w-full bg-blue-500 text-white rounded"
      >
        Submit
      </button>
    </form>
  );
}
