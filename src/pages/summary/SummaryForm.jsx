import React, { useState } from "react";
import SundaeButton from "../../components/SundaeButton";
import "../../styles/pages/summary/SummaryForm.css";

export default function SummaryForm() {
  const [agree, setAgreed] = useState(false);
  const [popover, setPopover] = useState(false);

  function Popover() {
    return (
      <>
        {popover && (
          <div className="popover">No ice cream will actually be delivered</div>
        )}
      </>
    );
  }

  return (
    <div className="form-group">
      <input
        type="checkbox"
        id="terms-and-condition"
        name="terms-and-condition"
        value="Agreed"
        checked={agree}
        onChange={() => setAgreed((prev) => !prev)}
      />
      <label
        htmlFor="terms-and-condition"
        className="checkbox-label"
        onMouseEnter={() => setPopover(true)}
        onMouseLeave={() => setPopover(false)}
      >
        I agree to the <span className="blue-link">terms and conditions</span>
      </label>

      <Popover />
      <div className="button-wrapper">
        <SundaeButton isDisabled={!agree} />
      </div>
    </div>
  );
}
