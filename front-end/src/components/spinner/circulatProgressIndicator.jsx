export default function CircularProgressIndicator({ color = "primary" }) {
  const spinnerColor =
    color === "secondary" ? "border-blue-500" : "border-lightblue";

  return (
    <div className="flex items-center justify-center">
      <div
        className={`w-6 h-6 border-4 ${spinnerColor} border-t-transparent rounded-full animate-spin`}
      ></div>
    </div>
  );
}
