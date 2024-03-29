# MakMak Market Simulator

## Introduction

The MakMak Market Simulator is a command-line application that simulates a marketplace.
It allows users to interact with a list of items, place orders, and manage inventory.
This project is designed to demonstrate basic CRUD operations and command-line interaction in Node.js.

## Usage

- Run: **npm install readline**
- Run: **node makmak-supermarket.js**
- The simulator will prompt you with a question: **How can I help you?**.
- supermartket items: **sugar, rice, tea, pasta, oil**.
  maximum quantity of every item is **10**.

## You can interact with the marketplace enter commands:

- **price [item name]**: Check the price of an item.
- **search [item name] [quantity]**: Check the availability of an item.
- **order [item name] [quantity]**: Add an item to your order.
- **order done**: Complete your order and view the total.
- **sales**: View total sales.
- **most selling**: View the most selling item.
- **most sales**: View the item with the highest sales.
- **restock**: Check items that need restocking.
- **exit**: Exit the simulator.
