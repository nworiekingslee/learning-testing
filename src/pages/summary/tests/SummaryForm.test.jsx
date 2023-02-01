import { fireEvent, logRoles, render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

test("Submit is disabled by default", () => {
  render(<SummaryForm />);
  const submitButton = screen.getByRole("button", {
    name: /Submit/i,
  });

  expect(submitButton).toBeDisabled();
});

test("Checkbox is unchecked by default", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: "I agree to the terms and conditions",
  });

  expect(checkbox).not.toBeChecked();
});

test("Checking checkbox enables submit button and unchecking disables button", () => {
  render(<SummaryForm />);
  const submitButton = screen.getByRole("button", { name: /Submit/i });
  const checkbox = screen.getByRole("checkbox", {
    name: /I agree to the terms and conditions/i,
  });

  fireEvent.click(checkbox);

  expect(checkbox).toBeChecked();
  expect(submitButton).toBeEnabled();

  fireEvent.click(checkbox);

  expect(checkbox).not.toBeChecked();
  expect(submitButton).toBeDisabled();
});
