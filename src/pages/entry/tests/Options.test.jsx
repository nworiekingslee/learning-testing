import { logRoles, render, screen } from "@testing-library/react";
import Options from "../Options";

test("Displays image for each scoop from the server", async () => {
  render(<Options optionType="scoops" />);
  // Find images
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);
  // confirm alt text of images
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("Display image for each topping from server", async () => {
  render(<Options optionType="toppings" />);
  // Find images
  const toppingImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });
  expect(toppingImages).toHaveLength(3);
  // Confirm alt text of images
  const altText = toppingImages.map((img) => img.alt);

  expect(altText).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});
