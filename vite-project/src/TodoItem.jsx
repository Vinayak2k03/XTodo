import React from "react";
import { RxCrossCircled } from "react-icons/rx";

function Checkbox({ id, name, done, check }) {
  return (
    <li className="flex gap-3 my-2 items-center">
      <input
        className="w-5 h-5 border border-gray-300 rounded-sm 
                   checked:bg-yellow-500 checked:border-yellow-500 
                   focus:ring-yellow-500 focus:ring-offset-0 focus:ring-2
                   text-yellow-500 cursor-pointer"
        readOnly
        checked={check}
        id={id}
        onClick={done}
        type="checkbox"
      />
      <label htmlFor={id} className="text-sm font-semibold">
        {name}
      </label>
    </li>
  );
}

export default Checkbox;
