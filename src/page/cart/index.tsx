import Nav from "components/nav";

import "style/common/index.css";
import "./style.css";
import LeftSection from "./left-section";
import RightSection from "./right-section";

import { Header } from "common/ui/header";
import { useCartList } from "hooks/cart/useCartList";

const CartContent = () => {
  const { data, isLoading, isError } = useCartList();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading product data</div>;
  }

  if (!data) {
    return <div>No cart data available</div>;
  }

  return (
    <section className="cart-section">
      <Header title={"장바구니"} />
      <div className="flex">
        <LeftSection />
        <RightSection />
      </div>
    </section>
  );
};

const CartPage = () => {
  return (
    <>
      <Nav />
      <CartContent />
    </>
  );
};

export default CartPage;
