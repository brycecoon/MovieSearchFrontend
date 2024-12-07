import React from "react";
import { GenericSelectInputControl } from "./gSelectController";

const GSelectInput: React.FC<{
  control: GenericSelectInputControl;
}> = ({ control }) => {
  return (
    <>
      <select
        className="bg-gray-100 border border-gray-300 rounded-lg px-1 py-2 shadow focus:ring focus:ring-blue-200 hover:cursor-pointer text-gray-800"
        value={control.value}
        onChange={(e) => control.setValue(e.target.value)}
      >
        {control.options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default GSelectInput;
