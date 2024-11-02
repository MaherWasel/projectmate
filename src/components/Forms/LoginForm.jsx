import SubmitButton from "../buttons/SubmitButton";
import TextInput from "../input/TextInput";


// Not Finished //
export default function LoginForm() {
  return (
    <form action="/">
      <div className="flex flex-col justify-center items-center text-center">
        <h1 className="text-white text-2xl lg:text-3xl font-semibold  mt-4">
          Welcome to ProjectMates
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center mt-8">
        <div className="w-4/5">
          <TextInput label="Username" placeholder="Username" />
          <TextInput label="Password" placeholder="Password" />
        </div>
        <div className="bg-lightBlue text-xl mt-4 rounded-lg w-24">
          <SubmitButton>
            <span className="text-white">Login</span>
          </SubmitButton>
        </div>
      </div>
    </form>
  );
}
