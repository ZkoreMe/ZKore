import BigNumber from "bignumber.js";
import { ParsedUrlQuery } from "querystring";
import { products } from "../lib/products";

export default function calculatePrice(query: ParsedUrlQuery): BigNumber {
  let amount = new BigNumber(0);
  for (let [id, quantity] of Object.entries(query)) {
    const product = products.find(p => p.id === id)
    if (!product) continue;

    const price = 10.5
    const productQuantity = new BigNumber(quantity as string)
    amount = amount.plus(productQuantity.multipliedBy(price))
  }

  return amount
}