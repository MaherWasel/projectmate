import TextInput from "../../../components/input/TextInput";
import Form from "../../../components/Forms/Form";
import { Link } from "react-router-dom";

// Not Finished //
export default function LoginForm() {
  return (
    <main>
      <section className="flex flex-col justify-center items-center text-center">
        <h1 className="text-white text-2xl lg:text-3xl font-semibold  mt-4">
          Welcome to ProjectMates
        </h1>
      </section>
      <Form buttonText="Register" action="/" method="POST">
        <TextInput label="Email" placeholder="Example@gmail.com" />
        <TextInput label="Username" placeholder="username" />
        <TextInput label="Password" placeholder="password" />
        <p className="text-white flex justify-around items-center">
          do you have an account ?
          <Link to="/login" className="text-lightBlue cursor-pointer text-lg">
            sign in
          </Link>
        </p>
        <p className="text-white flex justify-around items-center">
          <Link
            to="/register"
            className="text-lightBlue cursor-pointer text-lg"
          >
            Forgot Password
          </Link>
        </p>
      </Form>
    </main>
  );
}
