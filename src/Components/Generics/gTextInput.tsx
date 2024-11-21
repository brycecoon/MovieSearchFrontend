import { useState } from "react";

export interface GenericTextInputControl {
  value: string;
  setValue: (v: string) => void;
}

export const useGTextInput = (startValue: string = "") => {
  const [value, setValue] = useState(startValue);

  return {
    value,
    setValue,
  };
};