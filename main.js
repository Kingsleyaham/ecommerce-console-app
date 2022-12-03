const catalog = [
  { product: "iPhone 11", currency: "$", price: 320, discount: 5 },
  { product: "Samsung Galaxy s10", currency: "$", price: 250, discount: 10 },
  { product: "Tecno Camon 18i", currency: "$", price: 223, discount: 5 },
  { product: "Infinix Smart 6", currency: "$", price: 153, discount: 0 },
  { product: "Samsung Galaxy A03", currency: "$", price: 192, discount: 19 },
];

let user = "";
const cart = [];
let itemCount = 1;

const commandLine = require("readline");
var prompts = commandLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

usernamePopup();

function usernamePopup() {
  prompts.question("Enter your name: ", function (username) {
    if (username !== "") {
      user = username;
      print(`\nHi ${username}, Welcome to our store`);
      print(
        `\n**********Here are the list and prices of our Phone Catalog********** \n`
      );
      printCatalog(catalog);
      questionPopup();
      return;
    }

    usernamePopup();
  });
}

const questionPopup = () => {
  prompts.question(
    `\n*****Select the device you'd like to add to your shopping cart: *****\n****type *checkout* to checkout, *delete <item name>* to delete item from cart****\nitem ${itemCount}: `,
    (selectedItem) => {
      if (selectedItem.toLowerCase() === "checkout") {
        checkout();
        return;
      }
      if (selectedItem.toLowerCase().includes("delete")) {
        deleteItemFromCart(selectedItem);
        viewCart();
        questionPopup();
        return;
      }
      if (!itemExistInCatalog(selectedItem)) {
        print(selectedItem + " is not in stock");
        questionPopup();
        return;
      }

      if (itemExistInCart(selectedItem)) {
        print(selectedItem + " already added to cart");
        questionPopup();
        return;
      }

      addToCart(selectedItem);
      questionPopup();
    }
  );
};

const checkoutQuestionPopup = () => {
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
          checkoutQuestionPopup();
          break;
      }
    }
  );
};

const itemExistInCatalog = (str) => {
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

const itemExistInCart = (str) => {
  let exist = false;

  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    if (item.product.toLowerCase() === str.toLowerCase()) {
      exist = true;
      break;
    } else {
      continue;
    }
  }

  return exist;
};

const printCatalog = (items) => {
  items.forEach((item) => {
    print(
      `product: ${item.product} \nprice: ${item.currency}${item.price} \ndiscount: ${item.discount}%\n`
    );
  });
  // console.table(items);
};

const addToCart = (prod) => {
  try {
    catalog.forEach((item) => {
      let discount = (item.price * item.discount) / 100;
      if (item.product.toLowerCase() === prod.toLowerCase()) {
        cart.push({
          product: item.product,
          price: item.price - discount,
          currency: `${item.currency}`,
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
      checkoutQuestionPopup();
      return;
    } else {
      questionPopup();
    }
  } catch (error) {
    print(`Error adding ${prod} to cart`);
    questionPopup();
  }
};

const viewCart = () => {
  print("***Your items includes***");
  for (let i = 0; i < cart.length; i++) {
    const element = cart[i];
    print(`${i + 1}. ${element.product} - ${element.currency}${element.price}`);
  }
};

const deleteItemFromCart = (str) => {
  if (!str) {
    print(`Item does not exist in cart\n`);
    questionPopup();
    return;
  }

  let itemIndex = 0;
  let itemExist = false;

  let strArr = str.split(" ");
  let action = strArr[0].toLowerCase();
  strArr.shift();
  let product = strArr.join(" ").toLowerCase();

  if (action === "delete") {
    for (let i = 0; i < cart.length; i++) {
      const item = cart[i];

      if (item.product.toLowerCase() === product) {
        itemExist = true;
        itemIndex = i;
        break;
      } else {
        itemExist = false;
      }
    }
  }

  if (itemExist) {
    cart.splice(itemIndex, 1);
    print(`\n*item deleted from cart successfully*\n`);
    itemCount--;
    return;
  }

  print(`Error deleting item\n`);
  questionPopup();
};

const checkout = () => {
  if (cart.length === 0) {
    print(
      `\n*****Dear ${user} you did not make any purchase from us we hope you buy next time*****\n`
    );
    process.exit();
  }

  print("\n");
  viewCart();
  printInvoice();
  process.exit();
};

const increment = () => {
  itemCount++;
  return itemCount;
};

const print = (message) => {
  console.log(message);
};

const printInvoice = () => {
  const total = cart.reduce((prev, curr) => {
    return prev + curr.price;
  }, 0);

  print(`\nTotal Amount: $${total}`);
  print(
    `\n***It was nice doing business with you we hope to see you next time ${user}***\n`
  );
};
