/**
 * Please read README.md file
 */

const readline = require("readline");

// Create readline interface for standard input and output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Recursive function to continuously ask for user input
function recursiveAsyncReadLine() {
  rl.question("\nHow can I help you?\n", function (answer) {
    if (answer == "exit") {
      // Close readline interface and exit the function
      return rl.close();
    }
    handleInput(answer);
    recursiveAsyncReadLine(); // Call this function again for the next question
  });
}

// Start the recursive function
recursiveAsyncReadLine();

// List of items in the MakMak market
const items = [
  { id: 1, name: "sugar", price: 30, quantity: 10 },
  { id: 2, name: "rice", price: 10, quantity: 5 },
  { id: 3, name: "tea", price: 5, quantity: 0 },
  { id: 4, name: "pasta", price: 15, quantity: 3 },
  { id: 5, name: "oil", price: 20, quantity: 2 },
];

// Global variables for tracking sales and orders
let checkout = []; // Total price of items in the current order
let total = []; // Quantity of each item in the current order
let sales = []; // Total sales made
let selling = []; // All orders made

// Function to restock items
function restock() {
  items.forEach((item) => {
    if (item.quantity < 10) {
      const itemsNeeded = 10 - item.quantity;
      console.log(
        `${item.name} needs to be restocked. ID: ${item.id}. Items needed to full the stock: ${itemsNeeded}`
      );
    } else {
      console.log(`${item.name} is full in stock.`);
    }
  });
}

// Function to search for an item by name
function searchForItem(arr, name) {
  return arr.find((item) => item.name === name);
}

// Function to search for an item's price by name
function searchForItemPrice(arr, name) {
  const item = searchForItem(arr, name);
  return item ? item.price : null;
}

// Function to search for an item's quantity by name
function searchForItemQuantity(arr, name) {
  const item = searchForItem(arr, name);
  return item ? item.quantity : null;
}

// Main function to handle user input
function handleInput(input) {
  const words = input.split(" ");

  // Handle price inquiry
  if (words[0] === "price" && searchForItem(items, words[1])) {
    console.log(
      `The unit price for ${words[1]} is ${searchForItemPrice(
        items,
        words[1]
      )} EGP`
    );
  }

  // Handle quantity inquiry
  else if (
    words[0] === "search" &&
    searchForItem(items, words[1]) &&
    words[2] > 0
  ) {
    const quantity = searchForItemQuantity(items, words[1]);
    if (quantity === 0) {
      console.log(`Sorry, we are out of ${words[1]}.`);
    } else if (quantity < words[2]) {
      console.log(`We only have ${quantity} ${words[1]} Units available.`);
    } else {
      console.log(`Yes we have ${words[2]} ${words[1]} Units available`);
    }
  }

  // Handle order placement
  else if (
    words[0] === "order" &&
    searchForItem(items, words[1]) &&
    words[2] > 0
  ) {
    const quantity = searchForItemQuantity(items, words[1]);
    if (quantity === 0) {
      console.log(
        `Sorry, we are out of ${words[1]}, could not add it to your order.`
      );
    } else if (quantity < words[2]) {
      console.log(
        `We only have ${quantity} ${words[1]} Units available, could not add it to your order.`
      );
    } else {
      const value = searchForItemPrice(items, words[1]) * words[2];
      total.push({ name: words[1], quantity: words[2] });
      const existingOrder = selling.find((order) => order.name === words[1]);
      if (existingOrder) {
        existingOrder.quantity += parseInt(words[2]);
        existingOrder.price += value;
      } else {
        selling.push({
          name: words[1],
          quantity: parseInt(words[2]),
          price: value,
        });
      }
      checkout.push(value);
      console.log(
        `${words[2]} units of ${words[1]} available and added to your order.`
      );
    }
  }

  // Handle order completion
  else if (words[0] === "order" && words[1] === "done") {
    const currentDateTime = new Date();
    console.log(`Here is your order:\nOrder Date: ${currentDateTime}`);
    total.forEach((item) =>
      console.log(`Quantity: ${item.quantity} | Item: ${item.name}`)
    );
    const sum = checkout.reduce((a, b) => a + b, 0);
    console.log(`Total : ${sum} EGP`);
    sales.push(sum);
    checkout = [];
    total = [];
  }

  // Handle sales inquiry
  else if (words[0] === "sales") {
    const sum = sales.reduce((a, b) => a + b, 0);
    console.log(`Total Sales is ${sum} EGP`);
  }

  // Handle most selling item inquiry
  else if (words[0] === "most" && words[1] === "selling") {
    const mostSellingItem = selling.reduce((prev, current) =>
      prev.quantity > current.quantity ? prev : current
    );
    console.log(
      `The most selling item is ${mostSellingItem.name}, we sold ${mostSellingItem.quantity} units for ${mostSellingItem.price} EGP`
    );
  }

  // Handle most sales inquiry
  else if (words[0] === "most" && words[1] === "sales") {
    const mostSalesItem = selling.reduce((prev, current) =>
      prev.price > current.price ? prev : current
    );
    console.log(
      `The most sales came from ${mostSalesItem.name}, we sold ${mostSalesItem.quantity} units for ${mostSalesItem.price} EGP`
    );
  }

  // Handle restock command
  else if (input === "restock") {
    restock();
  }

  // Handle invalid input
  else {
    console.log("Please check the input you entered");
  }
}
