export default function LargeInfoCard({ message, count = 0, icon = "" }) {
  return (
    <div className="relative w-full sm:max-w-sm xl:max-w-xl flex flex-col bg-white rounded-xl border-2 border-darkGray transition-all duration-300 ease-in-out shadow-2xl">
      {icon && (
        <img
          src={icon}
          alt="Icon"
          className="absolute -top-8 -right-10 w-20 h-20"
        />
      )}

      <h1 className="font-bold text-center text-4xl mt-2 pb-4 w-5/6 mx-auto border-b-2 border-gray-300">
        {message}
      </h1>
      <h1 className="font-bold text-center text-3xl mt-10 mb-10">{count}</h1>
    </div>
  );
}
