import { FC } from "react";
import close from "../assets/close.svg";

interface DeleteUserProps {
  index: number;
  show: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteUser: FC<DeleteUserProps> = ({ index, show }) => {
  const deleteUser = async (id: number) => {
    await fetch(`http://localhost:3001/delete/${id}`, {
      method: "DELETE",
    });
    show(false);
    window.location.href = "/";
  };
  return (
    <div className="absolute top-1/3 flex justify-center items-center w-full">
      <div className="flex flex-col gap-5 md:gap-10 p-5 border border-black rounded-lg bg-white">
        <div className="flex justify-between items-center gap-10 md:gap-20">
          <p>Are you sure you to delete?</p>
          <span className="cursor-pointer" onClick={() => show(false)}>
            <img src={close} className="h-5 w-5" alt="close.svg" />
          </span>
        </div>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => show(false)}
            className="border border-black rounded-lg px-5 py-1"
          >
            Cancel
          </button>
          <button
            onClick={() => deleteUser(index)}
            className="bg-orange-600 text-white px-5 py-1 rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;
