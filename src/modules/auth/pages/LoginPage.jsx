import LoginForm from "../../../components/Forms/LoginForm";
import Sidebar from "../../../components/Forms/Sidebar";

export default function LoginPage() {
  return (
    <div className="w-full h-screen bg-darkGray md:bg-white flex justify-center items-center">
      <main className="w-full md:w-3/4 2xl:w-1/2 h-full md:h-3/4 m-12 shadow-md shadow-darkGray md:m-4 overflow-hidden rounded-md flex flex-col-reverse md:flex-row justify-center">
        <section className="w-full md:w-1/2 p-4 md:p-0 bg-lightGray flex flex-col justify-center rounded-lg md:rounded-none">
          <LoginForm />
        </section>
        <Sidebar />
      </main>
    </div>
  );
}
