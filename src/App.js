import "./App.css";
import OrderSummary from "./pages/summary/OrderSummary";
import { setupWorker } from "msw";
import OrderEntry from "./pages/entry/OrderEntry";
import { OrderDetailsProvider } from "./context/OrderDetails";

if (process.env.NODE_ENV === "development") {
  const { handlers } = require("./mocks/handlers");
  const worker = setupWorker(...handlers);
  worker.start();
}

export default function App() {
  return (
    <div className="App">
      <OrderDetailsProvider>
        <OrderEntry />
        <OrderSummary />
      </OrderDetailsProvider>
    </div>
  );
}
