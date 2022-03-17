"use strict";
const { v4 } = require("uuid");
const Hapi = require("@hapi/hapi");
const { Store } = require("./cart/mocks/store");
const { CartItems } = require("./cart/mocks/cartItems");
const {
  addItemstoExistingCartItems,
  getFormattedTotal,
} = require("./cart/shared/helpers");
const { flatten } = require("lodash");

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  server.route({
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "Node Back-end store API Test";
    },
  });

  server.route({
    method: "GET",
    path: "/store",
    handler: (request, h) => {
      return Store;
    },
  });

  server.route({
    method: "GET",
    path: "/carts",
    handler: (request, h) => {
      return CartItems;
    },
  });

  /*
  GET: return cart contents
  should contain items in cart, qty of each item and total price formatted to 2 decimal points

  {id} is optional, if no id is passed-in you need to create a new cart with unique id
  if id is passed-in find the cart with that id, handle when cart is not found
  */
  server.route({
    method: "GET",
    path: "/cart/{id?}",
    handler: async (request, response) => {
      const id = request.params.id || null;

      if (id) {
        const getItem = CartItems.filter((cart) => cart.id === id);

        return getItem;
      } else {
        CartItems.push({ id, items: [] });
        return `Create cart id: ${v4()}`;
      }
    },
  });

  /*
  POST/PUT: add item to cart and return the entire cart
  */
  server.route({
    method: "POST",
    path: "/cart/{id?}",
    handler: (request, response) => {
      let { id } = request.params || null;
      if (!id) {
        id = v4();
      }
      const payload = request.payload;

      const isCartExist = Boolean(
        CartItems.filter((cart) => cart.id === id).length > 0
      );

      if (!payload) {
        return `first add Items to the Cart`;
      }

      const cartItemsWithTotalPrice =
        payload.items.length > 0 && payload.items.map((item) => item);

      const items =
        cartItemsWithTotalPrice.length > 0 &&
        cartItemsWithTotalPrice.reduce((item, { name, price, qty }) => {
          item[name] = item[name] || { name, price, qty: 0 };
          item[name].qty += qty;
          return item;
        }, {});

      const mergedNewCartItems = Object.values(items);
      const getcartTotals = flatten(
        mergedNewCartItems.map((item) => item.price * item.qty)
      );

      isCartExist
        ? addItemstoExistingCartItems(id, CartItems, mergedNewCartItems)
        : cartItemsWithTotalPrice.length > 0
        ? CartItems.push({
            id,
            items: mergedNewCartItems,
            cartTotal: Number(getFormattedTotal(getcartTotals)),
          })
        : CartItems;

      const getItems = CartItems.filter((cart) => cart.id === id);

      return getItems;
    },
  });

  /*
  DELETE: remove an item from the cart
  */
  server.route({
    method: "DELETE",
    path: "/cart/{id}",
    handler: (request, h) => {
      const { id } = request.params;
      const getItems = CartItems.filter((cart) => cart.id !== id);
      CartItems.length = 0;
      CartItems.push(...getItems);
      return `deleted cart ${id}`;
    },
  });

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

init();
