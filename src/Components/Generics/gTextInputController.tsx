import { GenericTextInputControl } from "./gTextInput";

const gTextInput: React.FC<{
  label?: string;
  control: GenericTextInputControl;
}> = ({ label, control }) => {
  return (
    <>
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <input
        type="text"
        className="form-control"
        value={control.value}
        onChange={(e) => {
          control.setValue(e.target.value);
        }}
      />
      </div>
    </>
  );
};
export default gTextInput;