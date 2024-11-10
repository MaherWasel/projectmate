import ForgotPasswordForm from "./ForgotPasswordForm";
import CloseIcon from "../../../assets/icons/CloseIcon.svg";
import { forwardRef } from "react";
const ForgotPasswordModal = forwardRef(function ForgotPasswordModal(
  props,
  ref
) {
  return (
    <dialog
      ref={ref}
      className="bg-lightGray drop-shadow-xl overflow-hidden rounded-2xl "
    >
      <header className=" text-2xl text-lightBlue border-b-2 border-lightBlue">
        <div className="m-4 flex justify-between items-center">
          Reset Password
          <form method="dialog">
            <button type="submit">
              <img
                src={CloseIcon}
                className="w-10 cursor-pointer text-black hover:text-black"
                alt="Close Icon"
              />
            </button>
          </form>
        </div>
      </header>
      <main className="m-12 w-96">
        <ForgotPasswordForm />
      </main>
    </dialog>
  );
});

export default ForgotPasswordModal;
