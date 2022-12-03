const catalog = [
  { product: "iPhone 11", price: 320, currency: "$", discount: 5 },
  { product: "Samsung Galaxy s10", price: 250, currency: "$", discount: 10 },
  { product: "Tecno Camon 18i", price: 223, currency: "$", discount: 5 },
  { product: "Infinix Smart 6", price: 153, currency: "$", discount: 0 },
  { product: "Samsung Galaxy A03", price: 192, currency: "$", discount: 19 },
];

const total = catalog.reduce((prev, curr) => {
  return prev + curr.price;
}, 0);

console.log(total);
