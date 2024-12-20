import SubmitButton from "../../../components/buttons/SubmitButton";
// Not Finished //
export default function Form({
  children,
  buttonText = "Submit",
  action = "/",
  method = "GET",
  onSubmit,
}) {
  return (
    <form action={action} method={method} onSubmit={onSubmit()}>
      <div className="flex flex-col justify-center items-center mt-8">
        <div className="w-4/5">{children}</div>
        <div className="text-xl mt-4 rounded-lg w-24">
          <SubmitButton>
            <span className="text-white">{buttonText}</span>
          </SubmitButton>
        </div>
      </div>
    </form>
  );
}
