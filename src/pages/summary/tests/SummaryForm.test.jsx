import { logRoles, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from "../SummaryForm";

test("Initial Condition", () => {
  render(<SummaryForm />);
  const submitButton = screen.getByRole("button", {
    name: /Submit/i,
  });
  const checkbox = screen.getByRole("checkbox", {
    name: /I agree to the terms and conditions/i,
  });

  expect(submitButton).toBeDisabled();
  expect(checkbox).not.toBeChecked();
});

test("Checking checkbox enables submit button and unchecking disables button", async () => {
  render(<SummaryForm />);
  const submitButton = screen.getByRole("button", { name: /Submit/i });
  const checkbox = screen.getByRole("checkbox", {
    name: /I agree to the terms and conditions/i,
  });
  const user = userEvent.setup();

  await user.click(checkbox);

  expect(checkbox).toBeChecked();
  expect(submitButton).toBeEnabled();

  await user.click(checkbox);

  expect(checkbox).not.toBeChecked();
  expect(submitButton).toBeDisabled();
});

test("Popover responds to hover", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  // Popover starts hidden
  const nullPopover = screen.queryByText(
    /No ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  // Popover appears on mouseover of checkbox label
  const termsAndCondition = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndCondition);
  const popover = screen.getByText(/No ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  // Popover disappears when we unhover
  await user.unhover(termsAndCondition);
  expect(popover).not.toBeInTheDocument();
});
