import { useNavigate } from "react-router-dom";
import Divider from "../../../components/divider/Divider";
import Button from "../../../components/buttons/SubmitButton";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <main className="w-full h-svh bg-darkGray flex justify-center items-center  ">
      <div className="w-full  bg-lightGray xl:w-2/3 rounded-2xl">
        <p className="m-4 p-4 font-bold text-lightBlue justify-center flex">
          Page Not Found 404
        </p>
        <Divider color="lightBlue" />
        <div className=" p-4 flex justify-center items-center">
          <Button onClick={() => navigate("/")}>Home Page</Button>
        </div>
      </div>
    </main>
  );
}
