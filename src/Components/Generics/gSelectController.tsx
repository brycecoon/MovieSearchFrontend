import { useState } from "react";

export interface GenericSelectInputControl {
  label: string;
  value: string;
  setValue: (value: string) => void;
  options: string[];
}

export const useGSelectInput = (
  initialValue: string,
  options: string[],
  label: string
): GenericSelectInputControl => {
  const [value, setValue] = useState(initialValue);

  return {
    label,
    value,
    setValue,
    options,
  };
};
