import { ProductItem } from "types/type";
import { ProductContainer } from "../style";
import Item from "./item";
import Header from "components/header";
import Nav from "components/nav";
import { productListState, useProductList } from "hooks/product";
import { useRecoilState } from "recoil";

import { useEffect } from "react";


const ProductListPageContent = () => {

  const { data, isLoading, isError } = useProductList();
  const [products, setProducts] = useRecoilState(productListState);

  useEffect(() => {
    if (isError) {
      console.log("Error fetching product list", isError);
      
      alert("상품 목록을 불러오는데 실패했습니다.");
      return;
    }

    if (data) {
      setProducts(data);
    }
  }, [data, isError, setProducts]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ProductContainer>
      {products.map((item: ProductItem) => {
        return <Item key={item.id} item={item} />;
      })}
    </ProductContainer>
  );
};

const ProductListPage = () => {
  return (
    <>
      <Header />
      <Nav />
      <ProductListPageContent />
    </>
  );
};

export default ProductListPage;