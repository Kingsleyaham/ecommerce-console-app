const catalog = [
  { product: "iPhone 11", price: 320, currency: "$", discount: 5 },
  { product: "Samsung Galaxy s10", price: 250, currency: "$", discount: 10 },
  { product: "Tecno Camon 18i", price: 223, currency: "$", discount: 5 },
  { product: "Infinix Smart 6", price: 153, currency: "$", discount: 0 },
  { product: "Samsung Galaxy A03", price: 192, currency: "$", discount: 19 },
];

let user = "";
const cart = [];
let itemCount = 1;

function increment() {
  itemCount++;
  return itemCount;
}

const commandLine = require("readline");
var prompts = commandLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

prompts.question("Enter your name: ", function (username) {
  user = username;
  print(`\nHi ${username}, Welcome to our store`);
  print(
    `\n**********Here are the list and prices of our Phone Catalog********** \n`
  );
  printCatalog(catalog);
  questionPopup();
});

const questionPopup = () => {
  prompts.question(
    `\n*****Select the device you'd like to add to your shopping cart: *****\n****or type *checkout* to checkout****\nitem ${itemCount}: `,
    (selectedItem) => {
      if (selectedItem.toLowerCase() === "checkout") {
        checkout();
        return;
      }
      if (!itemExists(selectedItem)) {
        print(selectedItem + " is not in stock");
        questionPopup();
        return;
      } else {
        addToCart(selectedItem);
        questionPopup();
      }
    }
  );
};

const checkoutQuestion = () => {
  prompts.question(
    `\n***** Please enter *checkout* to checkout or cancel to cancel transactions: `,
    (msg) => {
      msg = msg.toLowerCase();
      switch (msg) {
        case "cancel":
          print("***Your Transaction has been cancelled***");
          process.exit();
          break;
        case "checkout":
          print("checkout successful");
          checkout();
          break;
        default:
          checkoutQuestion();
          break;
      }
    }
  );
};

const itemExists = (str) => {
  let exist = false;
  for (let i = 0; i < catalog.length; i++) {
    const item = catalog[i];
    if (item.product.toLowerCase() === str.toLowerCase()) {
      exist = true;
      break;
    } else {
      continue;
    }
  }

  return exist;
};

const print = (message) => {
  console.log(message);
};

const printCatalog = (items) => {
  items.forEach((item) => {
    console.log(
      `product: ${item.product} \nprice: ${item.currency}${item.price} \ndiscount: ${item.discount}%\n`
    );
  });
};

const viewCart = () => {
  print("***Your items includes***");
  for (let i = 0; i < cart.length; i++) {
    const element = cart[i];
    print(`${i + 1}. ${element.product} - ${element.price}`);
  }
};

const addToCart = (prod) => {
  try {
    catalog.forEach((item) => {
      let discount = (item.price * item.discount) / 100;
      if (item.product.toLowerCase() === prod.toLowerCase()) {
        cart.push({
          product: item.product,
          price: `${item.currency}${item.price - discount}`,
        });
      }
    });

    print(`*${prod}* has been added to shopping cart\n`);
    viewCart();
    increment();

    if (itemCount > catalog.length) {
      print(
        "There is no more item to add to cart\n Type in *checkout* to checkout or cancel to cancel transactions"
      );
      checkoutQuestion();
      return;
    } else {
      questionPopup();
    }
  } catch (error) {
    print(`Error adding ${prod} to cart`);
    questionPopup();
  }
};

const checkout = () => {
  viewCart();
  printInvoice();
  process.exit();
};

const printInvoice = () => {
  const total = catalog.reduce((prev, curr) => {
    return prev + curr.price;
  }, 0);

  print(`Total Amount: $${total}`);
  print(
    `***It was nice doing business with you we hope to see you next time ${user}***`
  );
};
