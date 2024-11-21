import React from "react";
import { GenericSelectInputControl } from "./gSelectController";

const GSelectInput: React.FC<{
  label?: string;
  control: GenericSelectInputControl;
}> = ({ label, control}) => {
  return (
    <>
      {label && <label className="form-label">{label}</label>}
      <select
        className="form-control"
        value={control.value}
        onChange={(e) => control.setValue(e.target.value)}
      >
        {control.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
};

export default GSelectInput;