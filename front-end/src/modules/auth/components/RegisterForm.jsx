import TextInput from "../../../components/input/TextInput";
import Form from "./Form";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../../config";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { username, password, email } = data;
    try {
      const response = await axios.post(
        `${apiUrl}/register`,
        {
          username,
          password,
          email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        // STORE IN LOCAL STORAGE
        localStorage.setItem("username", response.data.record.username);
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      } else throw new Error(response.statusText);
    } catch (error) {
      // Handle errors (e.g., incorrect username/password, server error, etc.)
      console.error(
        "Error during login:",
        error.response ? error.response.data : error.message
      );
      alert("Login failed. Please try again.");
    }
  };

  return (
    <main>
      <section className="flex flex-col justify-center items-center text-center">
        <h1 className="text-white text-2xl lg:text-3xl font-semibold  mt-4">
          Welcome to ProjectMates
        </h1>
      </section>
      <Form
        buttonText="Register"
        action="/"
        // change it to POST later //
        method="POST"
        onSubmit={() => handleSubmit(onSubmit)}
      >
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
              value: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                "Password must be at least 8 characters long, contain at least one uppercase letter, and one number.",
            },
          }}
          placeholder="Enter your Password"
        />

        <p className="text-white flex justify-around items-center">
          do you have an account ?
          <Link to="/login" className="text-lightBlue cursor-pointer text-lg">
            sign in
          </Link>
        </p>
      </Form>
    </main>
  );
}
