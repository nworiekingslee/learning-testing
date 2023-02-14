import userEvent from "@testing-library/user-event";
import App from "../../../App";
import {
  logRoles,
  render,
  screen,
} from "../../../test-utils/testing-library-utils";
import OrderSummary from "../../summary/OrderSummary";
import Options from "../Options";

test("Update scoop subtotal when scoops change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);

  // Starts out with a total of $0.00
  const scoopSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopSubtotal).toHaveTextContent("0.00");

  // Update vanilla scoops to 1 and check subtotal
  const scoopInput = await screen.findAllByRole("spinbutton");
  await user.clear(scoopInput[0]); // Vanilla
  await user.type(scoopInput[0], "1");
  expect(scoopSubtotal).toHaveTextContent("2.00"); // $2 per scoop

  // Update the chocolate option to 2 and check scoop total
  await user.clear(scoopInput[1]); // Chocolate
  await user.type(scoopInput[1], "2");
  expect(scoopSubtotal).toHaveTextContent("6.00"); // $4 per scoop
});

test("Update toppings subtotal when topping change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="toppings" />);

  // Start out with a totoal of $0.00
  const toppingSubTotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingSubTotal).toHaveTextContent("0.00");

  // Update Cherries Topping and check subtotal
  const toppingInput = await screen.findAllByRole("spinbutton");
  await user.clear(toppingInput[0]);
  await user.type(toppingInput[0], "1");
  expect(toppingSubTotal).toHaveTextContent("1.50");

  // Update M&Ms Toppping and check subtotal
  await user.clear(toppingInput[1]);
  await user.type(toppingInput[1], "1");
  expect(toppingSubTotal).toHaveTextContent("3");

  // Remove Cherries Topping and check subtotal
  await user.clear(toppingInput[0]);
  await user.type(toppingInput[0], "0");
  expect(toppingSubTotal).toHaveTextContent("1.50");
});

describe("Grand total", () => {
  const user = userEvent.setup();

  // test that the grand total starts at $0.00
  test("starts with $0.00", () => {
    render(<OrderSummary />);
    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    expect(grandTotal).toHaveTextContent("0.00");
  });

  // Test that it updates properly if scoop is added
  test("update properly when scoop is added/ removed", async () => {
    render(<App />);

    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    const scoopInputs = await screen.findAllByRole("spinbutton");

    await user.clear(scoopInputs[0]); // Chocolate
    await user.type(scoopInputs[0], "1");
    expect(grandTotal).toHaveTextContent("2.00"); // $2 per scoop

    await user.clear(scoopInputs[1]);
    await user.type(scoopInputs[1], "1");
    expect(grandTotal).toHaveTextContent("4.00");

    await user.clear(scoopInputs[0]);
    await user.type(scoopInputs[0], "0");
    expect(grandTotal).toHaveTextContent("2.00");
  });

  // Test that it updates properly if topping is added
  test("update properly when toppings is added/ removed", async () => {
    render(<App />);

    const grandTotal = screen.getByText("grand total: $", { exact: false });
    const toppingsInput = await screen.findAllByRole("spinbutton");

    await user.clear(toppingsInput[2]);
    await user.type(toppingsInput[2], "1");
    expect(grandTotal).toHaveTextContent("1.50");

    await user.clear(toppingsInput[3]);
    await user.type(toppingsInput[3], "1");
    expect(grandTotal).toHaveTextContent("3.00");

    await user.clear(toppingsInput[2]);
    await user.type(toppingsInput[2], "0");
    expect(grandTotal).toHaveTextContent("1.50");
  });
});
