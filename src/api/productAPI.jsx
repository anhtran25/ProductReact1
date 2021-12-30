import instance from "./instance";

export const create = (products) => {
  const url = "/products";
  return instance.post(url, products);
};
export const list = () => {
  const url = "/products?_sort=id&_order=desc";
  return instance.get(url);
};
export const read = (id) => {
  const url = "/products/" + id;
  return instance.get(url);
};
export const remove = (id) => {
  const url = "/products/" + id;
  return instance.delete(url);
};
export const update = (products) => {
  const url = "/products/" + products.id;
  return instance.patch(url, products);
};
export const lists = (params="") => {
  const url = "/products?"+params;
  return instance.get(url);
};