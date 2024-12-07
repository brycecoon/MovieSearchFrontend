import { GenericTextInputControl } from "./gTextInput";

const GTextInput: React.FC<{
  placeHolder: string;
  control: GenericTextInputControl;
  className: string;
}> = ({ className, placeHolder, control }) => {
  return (
    <>
      <input
        type="text"
        placeholder={placeHolder}
        className={className}
        value={control.value}
        onChange={(e) => {
          control.setValue(e.target.value);
        }}
      />
    </>
  );
};
export default GTextInput;
