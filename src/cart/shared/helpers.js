function addItemstoExistingCartItems(id, CartContents, newItems) {
  const getExistingItems = CartContents.filter((cart) => cart.id === id);
  const allItems = getExistingItems[0].items.concat(newItems);

  const items =
    allItems.length > 0 &&
    allItems.reduce((item, { name, price, qty }) => {
      item[name] = item[name] || { name, price, qty: 0 };
      item[name].qty += qty;
      return item;
    }, {});

  const totalitems = Object.values(items);
  const getcartTotals = totalitems.map((item) => item.price * item.qty);
  CartContents.length = 0;

  return CartContents.push({
    id,
    items: Object.values(items),
    cartTotal: Number(getFormattedTotal(getcartTotals)),
  });
}

function getTotal(getcartTotals) {
  return getcartTotals.reduce((partialSum, a) => partialSum + a, 0);
}

function getFormattedTotal(getcartTotals) {
  return parseFloat(getTotal(getcartTotals)).toFixed(2);
}

module.exports = { addItemstoExistingCartItems, getTotal, getFormattedTotal };
