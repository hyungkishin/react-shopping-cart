import { RouterProvider } from "react-router-dom";
import router from "./router";

import "../src/css/reset.css";
import { ProductsProvider } from "store/context/ProductsContext";

function App() {
  return (
    <ProductsProvider>
      <RouterProvider router={router} />
    </ProductsProvider>
  );
}

export default App;
