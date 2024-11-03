import TextInput from "../../../components/input/TextInput";
import Form from "./Form";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import ForgotPasswordModal from "./ForgotPasswordModal";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

// Not Finished //
export default function LoginForm() {
  const dialog = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    console.log(e);
    navigate("/home");
    // later it will send a request to the server //
  };
  return (
    <main>
      <section className="flex flex-col justify-center items-center text-center">
        <h1 className="text-white text-2xl lg:text-3xl font-semibold  mt-4">
          Welcome to ProjectMates
        </h1>
      </section>
      <Form
        buttonText="Login"
        action="/home"
        // change it to POST later //
        method="GET"
        onSubmit={() => handleSubmit(onSubmit)}
      >
        <TextInput
          label="Username"
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
              value: /^[A-Za-z0-9]+$/,
              message: "Only alphabets and numbers are allowed",
            },
          }}
          placeholder="Enter your username"
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

        <p className="text-white flex justify-around items-center">
          you don't have an account ?
          <Link
            to="/register"
            className="text-lightBlue cursor-pointer text-lg"
          >
            sign up
          </Link>
        </p>
        <p className="text-white flex justify-around items-center">
          <Link
            onClick={() => dialog.current.showModal()}
            className="text-lightBlue cursor-pointer text-lg"
          >
            Forgot Password
          </Link>
        </p>
      </Form>
      <ForgotPasswordModal ref={dialog} />
    </main>
  );
}
