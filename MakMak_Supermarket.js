/* 
Project Description

1- First install readline npm package

2- Second in Item array you will find all supermarket products and to run this supermarket enter inputs as below 

3- If you want to ask about price of any product enter price and product name 
   for example : price Sugar
   
4- If you want to ask about quantity of product enter search and product name and quantity you want
   for example : search Sugar 2
   
5- If you want make order enter order and product name and quantity you want
   for example : order Sugar 2
   
6- If you finished your order enter "order done"

7- If you want to know the products need to restock enter "restock"

8- If you want to know the profit you gained it enter "sales"

9- If you want to know which is the most selling product enter "most selling" 

10- If you want to know the product that got most sales enter "most sales"
*/

const readline = require('readline');

const rl = readline.createInterface
({
  input: process.stdin,
  output: process.stdout
});

var recursiveAsyncReadLine = function () 
{
    rl.question('\nHow can I help you?\n', function (answer)
    {
        if (answer == 'exit') //we need some base case, for recursion
            return rl.close(); //closing RL and returning from function.
        handleInput(answer);
        recursiveAsyncReadLine(); //Calling this function again to ask new question
    });
};

recursiveAsyncReadLine();

//Products in MakMak market
var items = [
  {
    id: 1,
    name: "sugar", 
    price: 30,
    quantity: 10
  },
  {
    id: 2,
    name: "rice", 
    price: 10,
    quantity: 5
  },
  {
    id: 3,
    name: "tea", 
    price: 5,
    quantity: 0
  },
  {
    id: 4,
    name: "pasta", 
    price: 15,
    quantity: 3
  },
  {
    id: 5,
    name: "oil", 
    price: 20,
    quantity: 2
  }
];

//Global variables
var checkout =[];   //for sum of price which will be paid
var total =[];      //for each order alone
var sales =[];      //for profits we made
var selling =[];    //for all orders we done it

//Functions definitions 
function restock()
{
  var length = items.length;
  for(i=0;i<length;i++)
  {
    if (items[i].quantity<10)
    {
      var itemsNeeded = -items[i].quantity + 10;
      console.log(items[i].name+" needed to restocked\n"+"ID : "+items[i].id+
      "\nItem Name : "+items[i].name+"\nItems needed to full the stock : "+itemsNeeded);
    }
    else
    {
      console.log(items[i].name+" is full in stock");
    }
  }
}
//--------------------------------------------------
function search_for_item(arr,n)
{
  var arrLenght = arr.length;
  var test;
  for(i=0 ; i<arrLenght ; i++)
  {
    if (arr[i].name == n)
    {
      test=1;
    }
  }
  if(test == 1)
  {
    return (n);
  }
  else
  {
    return "soory this item not found";
  } 
}
//--------------------------------------------------
function search_for_item_price(arr,n)
{
  var arrLenght = arr.length;
  for(i=0 ; i<arrLenght ; i++)
  {
    if (arr[i].name == n)
    {
      var itemPrice = arr[i].price;
      return (itemPrice);
    }
  }
}
//--------------------------------------------------
function search_for_item_quantity(arr,n)
{
  var arrLenght = arr.length;
  for(i=0 ; i<arrLenght ; i++)
  {
    if (arr[i].name == n)
    {
      var itemQuantity = arr[i].quantity;
      return (itemQuantity);
    }
  }
}
//--------------------------------------------------
function search_for_most_selling_item_name(arr,n)
{
  var arrLenght = arr.length;
  for(i=0 ; i<arrLenght ; i++)
  {
    if (arr[i].quantity == n)
    {
      var itemQuantity = arr[i].name;
      return (itemQuantity);
    }
  }
}
//--------------------------------------------------
function search_for_most_selling_item_price(arr,n)
{
  var arrLenght = arr.length;
  for(i=0 ; i<arrLenght ; i++)
  {
    if (arr[i].quantity == n)
    {
      var itemQuantity = arr[i].price;
      return (itemQuantity);
    }
  }
}
//--------------------------------------------------
function search_for_most_sales_item_name(arr,n)
{
  var arrLenght = arr.length;
  for(i=0 ; i<arrLenght ; i++)
  {
    if (arr[i].price == n)
    {
      var itemQuantity = arr[i].name;
      return (itemQuantity);
    }
  }
}
//--------------------------------------------------
function search_for_most_sales_item_quantity(arr,n)
{
  var arrLenght = arr.length;
  for(i=0 ; i<arrLenght ; i++)
  {
    if (arr[i].price == n)
    {
      var itemQuantity = arr[i].quantity;
      return (itemQuantity);
    }
  }
}

//Main function
var handleInput = function(input)
{
  var words = input.split(' ');

  //Asking for price
  if (words[0] == "price" && words[1] == search_for_item(items,words[1]))
  {
    console.log("The unit price for Sugar is "+search_for_item_price(items,words[1])+" EGP");
  }

  //Asking for quantity
  else if (words[0] == "search" && words[1] == search_for_item(items,words[1]) && words[2]>0)
  {
    if(search_for_item_quantity(items,words[1]) == 0)
    {
      console.log("Sorry, we are out of "+words[1]+".");
    }
    else if(search_for_item_quantity(items,words[1]) < words[2])
    {
      console.log("We only have "+search_for_item_quantity(items,words[1])+" "+words[1]+" Units available.");
    }
    else if(search_for_item_quantity(items,words[1]) > words[2])
    {
      console.log("Yes we have "+words[2]+" "+words[1]+" Units available");
    }
  }

  //Making order
  else if (words[0] == "order" && words[1] == search_for_item(items,words[1]) && words[2]>0)
  {

    //don't have this product
    if(search_for_item_quantity(items,words[1]) == 0)
    {
      console.log("Sorry, we are out of "+words[1]+", could not add it to your order.");
    }

    //don't have enough from this product
    else if(search_for_item_quantity(items,words[1]) < words[2])
    {
      console.log("We only have "+search_for_item_quantity(items,words[1])+" "+words[1]+" Units available, could not add it to your order.");
    }

    //ok , we have this product and making his order
    else if(search_for_item_quantity(items,words[1]) >= words[2])
    {
      var value = search_for_item_price(items,words[1])*words[2];
      total.push({name: words[1], quantity: words[2]});

      if(search_for_item(selling,words[1]) == words[1])
      {
        selling.push({ name: words[1], quantity: parseInt(words[2])+search_for_item_quantity(selling,words[1]), price: value+search_for_item_price(selling,words[1]) });
      }
      else
      {
        selling.push({name: words[1], quantity: parseInt(words[2]), price: value });
      }
      checkout.push(value); 
      console.log(words[2]+" units of "+words[1]+" available and added to your order.");
    }

  }

  //Ending order
  else if(words[0] == "order" && words[1] == "done")
  {
    var currentDateTime = new Date(); 
    console.log("Here is your order:\n"+"Order Date: "+currentDateTime+"\n");
    
    var length = total.length;
    for(i=0;i < length;i++)
    {
      console.log("Quantity: "+total[i].quantity+" | "+"Item: "+total[i].name+"\n");
    }

    var sum = checkout.reduce(function(a, b){return a + b;}, 0);
    console.log("Total : "+sum+" EGP");
    sales.push(sum);
    checkout =[];
    total =[];
  }

  //MakMak Asking for the profits we made 
  else if(words[0] == "sales")
  {
    var sum = sales.reduce(function(a, b){return a + b;}, 0);
    console.log("Total Sales is "+sum+" EGP");
  }

  //MakMak Asking for Most selling
  else if(words[0] == "most" && words[1] == "selling")
  {
    var products = []
    var length = selling.length;
    for(i=0; i< length ;i++)
    {
      products.push(selling[i].quantity); 
    }
    var mostSelling = Math.max(...products);
    var mostItem =search_for_most_selling_item_name(selling,mostSelling);
    var mostPrice =search_for_most_selling_item_price(selling,mostSelling);
    console.log("The most selling item is "+mostItem+", we sold "+mostSelling+" units for "+mostPrice+" EGP");
  }

  //MakMak Asking for Most sales
  else if(words[0] == "most" && words[1] == "sales")
  {
    var floos = [];
    var length = selling.length;
    for(i=0; i< length ;i++)
    {
      floos.push(selling[i].price); 
    }
    var mostSales = Math.max(...floos);
    var mostNameSelling = search_for_most_sales_item_name(selling,mostSales);
    var mostQuantselling = search_for_most_sales_item_quantity(selling,mostSales);
    console.log("The most sales came from "+mostNameSelling+", we sold "+mostQuantselling+" units for "+mostSales+" EGP");
  }

  //MakMak Asking for products need to Restock
  else
  {
    switch(input)
    {
      case 'restock':
      restock();
      break;

      //invalid input
      default:
      console.log('Please check the input you entered');
    }
  }
  
  console.log('You asked for: "', input, '"');
}
