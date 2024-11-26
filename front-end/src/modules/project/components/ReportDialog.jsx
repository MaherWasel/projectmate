import { Cancel } from "@mui/icons-material";
import Dialog from "../../../components/dialoge/Dialog";
import Divider from "../../../components/divider/Divider";
import Textarea from "../../../components/input/TextArea";
import Button from "../../../components/buttons/SubmitButton";

export default function ReportDialog({ project, dialogRef }) {
  return (
    <Dialog ref={dialogRef}>
      <div className="flex bg-darkGray p-4 flex-col gap-4 text-2xl text-redError  font-semibold">
        <div className="flex justify-between w-full">
          <h1>Report Reason</h1>
          <Cancel
            onClick={() => dialogRef.current.close()}
            className="text-lightBlue hover:cursor-pointer"
          />
        </div>
        <Divider color="lightBlue" />
        <Textarea rowNum={6} />
        <div>
          <Button onClick={() => dialogRef.current.close()}>Submit</Button>
        </div>
      </div>
    </Dialog>
  );
}
