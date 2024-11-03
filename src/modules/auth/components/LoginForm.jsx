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
      <Form buttonText="Login" action="/" method="POST">
        <TextInput label="Username" placeholder="Username" />
        <TextInput label="Password" placeholder="Password" />
        <p className="text-white flex justify-around items-center">
          you don't have an account ?
          <Link
            to="/register"
            className="text-lightBlue cursor-pointer text-lg"
          >
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
