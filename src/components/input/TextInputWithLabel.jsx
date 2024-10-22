export default function TextInputWithLabel({
  label = "",
  errorMessage = "",
  variant = "default", // default or error
  labelColorProp = "", // Custom label color prop
  required = false, // Determines if the field is required
  ...props
}) {
  // Determine border color based on variant
  const borderColor =
    variant === "error" ? "border-redError" : "border-gray-300";

  // Determine focus color for border
  const focusBorderColor =
    variant === "error"
      ? "focus:border-redErrorFocus"
      : "focus:border-lightBlueFocus";

  // Determine text color inside input based on variant
  const textColor = variant === "error" ? "text-redError" : "text-black";

  // Handle label color customization with fallback to variant-specific color
  const labelColor =
    labelColorProp || (variant === "error" ? "text-redError" : "text-gray-700");

  // Handle focus color for label
  const focusLabelColor =
    variant === "error"
      ? "focus-within:text-redErrorFocus"
      : "focus-within:text-lightBlueFocus";

  return (
    <div
      className={`flex flex-col w-full mb-4 focus-within:${focusLabelColor}`}
    >
      {/* Label and Error Message in a row */}
      <div className="flex justify-between items-center mb-3">
        <label className={`font-semibold ${labelColor}`}>
          {label}
          {/* Show a red star if the field is required */}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>

        {/* Error message, shown in red if present */}
        {errorMessage && <span className="text-redError">{errorMessage}</span>}
      </div>

      {/* Input field with dynamic border color, text color, and focus color */}
      <input
        {...props}
        className={`p-3 rounded border-2 outline-none ${borderColor} ${focusBorderColor} ${textColor} w-full`} // Set width to full
        type="text"
      />
    </div>
  );
}
