export default function TextInputWithoutLabel({ ...props }) {
  return (
    <input
      className=" p-3 rounded border-2 outline-none w-full focus-within:border-lightBlueFocus delay-75 duration-75"
      type="text"
      {...props}
    />
  );
}
