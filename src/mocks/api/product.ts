import { products } from "mocks/db/products";
import { rest } from "msw";

export const getProducts = rest.get(`${process.env.REACT_APP_SERVER_HOST}/products`, (_, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json(products)
  );
})

export const getProductItem = rest.get(`${process.env.REACT_APP_SERVER_HOST}/products/:id`, (req, res, ctx) => {
  const { id } = req.params;
  const product = products.find((product) => product.id === Number(id));
  return res(
    ctx.status(200),
    ctx.json(product)
  );
})