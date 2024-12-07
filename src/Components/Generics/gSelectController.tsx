import { useState } from "react";
import { List } from "../../Data/Interfaces/List";

export interface GenericSelectInputControl {
  value: string;
  setValue: (value: string) => void;
  options: List[];
}

export const useGSelectInput = (
  initialValue: string,
  options: List[]
): GenericSelectInputControl => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    options
  };
};
