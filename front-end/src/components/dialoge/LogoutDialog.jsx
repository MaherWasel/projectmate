import { Cancel } from "@mui/icons-material";
import Dialog from "./Dialog";
import Divider from "../divider/Divider";
import Button from "../buttons/SubmitButton";
import { useNavigate } from "react-router-dom";

export default function LogoutDialog({ project, dialogRef }) {
  const navigate = useNavigate();
  return (
    <Dialog ref={dialogRef}>
      <div className="flex bg-darkGray p-4 flex-col gap-4 text-2xl text-redError font-semibold">
        <div className="flex justify-between w-full">
          <h1>Logout</h1>
          <Cancel
            onClick={() => dialogRef.current.close()}
            className="text-lightBlue hover:cursor-pointer"
          />
        </div>
        <Divider color="lightBlue" />

        <div>
          <Button
            onClick={() => {
              dialogRef.current.close();
              localStorage.removeItem("token");
              localStorage.removeItem("username");

              navigate("/login");
            }}
          >
            Confirm
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
