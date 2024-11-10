import React from "react";
import { useState } from "react";
const MembersIncrementer = () => {
  let [numOfMembers, setNumOfMembers] = useState(1);

  const editNumOfMembers = (operation) => {
    if (numOfMembers === 8) {
      if (operation === "-") setNumOfMembers(--numOfMembers);
      else {
        return;
      }
    }
    if (operation === "+") {
      setNumOfMembers(++numOfMembers);
    } else {
      if (numOfMembers !== 1) setNumOfMembers(--numOfMembers);
    }
  };
  return (
    <span className="bg-lightBlue  flex items-center justify-between rounded-xl px-2 my-2">
      <h2
        className="text-lightGray p-2 text-4xl border-r-2 border-lightGray hover:cursor-pointer"
        onClick={() => editNumOfMembers("-")}
      >
        -
      </h2>
      <h2 className=" p-2 text-2xl">{numOfMembers}</h2>
      <h2
        className="text-lightGray p-2 text-3xl border-l-2 border-lightGray hover:cursor-pointer"
        onClick={() => editNumOfMembers("+")}
      >
        +
      </h2>
    </span>
  );
};

export default MembersIncrementer;
