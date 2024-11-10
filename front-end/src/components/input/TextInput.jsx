export default function TextInput({
  label = "",
  name,
  register = () => {}, // Default to a no-op function if not provided
  errors = {},
  icon = null, // Optional icon element
  suffixIcon = null,
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
    labelColorProp || (hasError ? "text-redError" : "text-gray-100");
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
          className={`p-2 rounded border-2 outline-none ${borderColor} ${focusBorderColor} ${textColor} w-full ${
            icon ? "pl-10" : ""
          } disabled:bg-gray-200 disabled:text-gray-400`}
          {...props}
        />
        {suffixIcon && (
          <div className="absolute right-3 text-gray-500">{suffixIcon}</div>
        )}
      </div>
    </div>
  );
}
