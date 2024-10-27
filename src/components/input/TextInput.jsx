// note that you can auto validate this textinput while submitting the form if you provide required attribute
// and register function
//note that register function is coming from useForm hook
// if the textinput is not optionally do not provide register function
// observe how the validation object is created
// navigate to /formExample for an example

export default function TextInput({
  label = "",
  name,
  register = () => {}, // Default to a no-op function if not provided
  errors = {},
  icon = null, // Optional icon element
  labelColorProp = "",
  required = false,
  validation = {},
  ...props
}) {
  const hasError = errors[name];
  const borderColor = hasError ? "border-redError" : "border-gray-300";
  const focusBorderColor = hasError
    ? "focus:border-redErrorFocus"
    : "focus:border-lightBlueFocus";
  const textColor = hasError ? "text-redError" : "text-black";
  const labelColor =
    labelColorProp || (hasError ? "text-redError" : "text-gray-700");
  const focusLabelColor = hasError
    ? "focus-within:text-redErrorFocus"
    : "focus-within:text-lightBlueFocus";

  return (
    <div
      className={`flex flex-col w-full mb-4 focus-within:${focusLabelColor}`}
    >
      <div className="flex justify-between items-center mb-3">
        <label className={`font-semibold ${labelColor}`}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {hasError && (
          <span className="text-redError font-semibold">
            {errors[name]?.message}
          </span>
        )}
      </div>
      <div className="relative flex items-center">
        {/* Icon if provided */}
        {icon && <div className="absolute left-3 text-gray-500">{icon}</div>}
        <input
          {...(register
            ? register(name, {
                required: required ? "This field is required" : false,
                ...validation,
              })
            : {})}
          className={`p-3 rounded border-2 outline-none ${borderColor} ${focusBorderColor} ${textColor} w-full ${
            icon ? "pl-10" : ""
          }`} // Add padding for the icon
          {...props}
        />
      </div>
    </div>
  );
}
