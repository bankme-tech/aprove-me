type FormPickerProps = {
  showPayable: boolean;
  setShowPayable: (showPayable: boolean) => void;
}

function FormPicker({ showPayable, setShowPayable }: FormPickerProps) {
  return (
    <div className="flex gap-8">
      <div className="flex flex-col items-center">
        <label htmlFor="payable-btn">Create Payable</label>
        <input
          type="radio"
          checked={showPayable}
          onChange={() => setShowPayable(true)}
          id="payable-btn"
          className="w-5 h-5 text-orange-500"
        />
      </div>
      <div className="flex flex-col items-center">
        <label htmlFor="assignor-btn">Create Assignor</label>
        <input
          type="radio"
          checked={!showPayable}
          onChange={() => setShowPayable(false)}
          id="assignor-btn"
          className="w-5 h-5"
        />
      </div>
    </div>

  )
}

export default FormPicker;
