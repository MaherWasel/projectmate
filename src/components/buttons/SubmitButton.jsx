import CircularProgressIndicator from "../spinner/circulatProgressIndicator";

// variant is either default or error
export default function Button({
  variant = "default",
  children,
  loading = false,
  disabled = false,
  ...props
}) {
  // Determine if the button should be disabled (either by loading or if disabled prop is true)
  const isDisabled = loading || disabled;

  // Set the base style for the button
  let style = "w-full p-4 rounded-2xl delay-75 duration-75 text-white h-full";

  // Set styles based on the variant and disabled state
  if (variant === "default") {
    style += ` bg-lightBlue ${
      !isDisabled ? "hover:bg-lightBlueHover" : "cursor-not-allowed opacity-50"
    }`;
  } else if (variant === "error") {
    style += ` bg-darkGray ${
      !isDisabled ? "hover:bg-redErrorHover" : "cursor-not-allowed opacity-50"
    }`;
  } 
  

  return (
    <button disabled={isDisabled} {...props} className={style} type="submit">
      {loading ? (
        <div className="flex justify-center items-center ">
          <CircularProgressIndicator />
          <span>{children}</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
}
