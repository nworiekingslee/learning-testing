import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:3000/scoops", (req, res, ctx) => {
    return res(
      ctx.json([
        { product: "chocolate", imagePath: "/image/chocolate.png" },
        { product: "vanilla", imagePath: "/image/vanilla.png" },
      ])
    );
  }),
];
