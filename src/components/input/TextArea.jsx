export default function Textarea({
  label = "",
  name,
  register = () => {}, // Default to no-op function if not provided
  errors = {},
  labelColorProp = "",
  required = false,
  validation = {},
  rowNum = 3, // Default row number
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
      <textarea
        {...(register
          ? register(name, {
              required: required ? "This field is required" : false,
              ...validation,
            })
          : {})}
        rows={rowNum}
        className={`p-3 rounded border-2 outline-none ${borderColor} ${focusBorderColor} ${textColor} w-full disabled:bg-gray-200 disabled:text-gray-400`}
        {...props}
      />
    </div>
  );
}
