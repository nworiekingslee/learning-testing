// { name: "Chocolate", imagePath: "/image/chocolate.png" },
// { name: "Vanilla", imagePath: "/image/vanilla.png" },

// { name: "Cherries", imagePath: "/images/cherries.png" },
// { name: "M&Ms", imagePath: "/images/m-and-ms.png" },
// { name: "Hot fudge", imagePath: "/images/hot-fudge.png" },

import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
    localStorage.setItem("Topping", "true");
    return res(
      ctx.status(200),
      ctx.json([
        {
          name: "Cherries",
          imagePath:
            "https://cdn.pixabay.com/photo/2017/05/04/21/23/cupcakes-2285209_1280.jpg",
        },
        {
          name: "M&Ms",
          imagePath:
            "https://cdn.pixabay.com/photo/2017/05/04/21/23/cupcakes-2285209_1280.jpg",
        },
        {
          name: "Hot fudge",
          imagePath:
            "https://cdn.pixabay.com/photo/2017/05/04/21/23/cupcakes-2285209_1280.jpg",
        },
      ])
    );
  }),

  rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          name: "Chocolate",
          imagePath:
            "https://cdn.pixabay.com/photo/2017/01/11/11/33/cake-1971552_1280.jpg",
        },
        {
          name: "Vanilla",
          imagePath:
            "https://cdn.pixabay.com/photo/2017/01/11/11/33/cake-1971552_1280.jpg",
        },
      ])
    );
  }),
];
