import TextInput from "../../../components/input/TextInput";
import Form from "./Form";
import { useForm } from "react-hook-form";
import { useState } from "react";
// Not Finished //
export default function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isSent, setIsSent] = useState(false);
  const onSubmit = (e) => {
    setTimeout(() => {
      setIsSent(false);
    }, 2000);
    setIsSent(true);
    // later it will send a request to the server //
  };

  return (
    <main>
      <Form
        buttonText="Send"
        action="/"
        // change it to POST later //
        method="GET"
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
        {isSent && (
          <p className="text-center text-white">
            Reset Password Steps are sent to Your Email
          </p>
        )}
      </Form>
    </main>
  );
}
