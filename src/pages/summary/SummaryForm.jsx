import React, { useState } from "react";
import SundaeButton from "../../components/SundaeButton";
import "../../styles/pages/summary/SummaryForm.css";

export default function SummaryForm() {
  const [agree, setAgreed] = useState(false);
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
      <label htmlFor="terms-and-condition" className="checkbox-label">
        I agree to the <span className="blue-link">terms and conditions</span>
      </label>
      <div className="button-wrapper">
        <SundaeButton isDisabled={!agree} />
      </div>
    </div>
  );
}
