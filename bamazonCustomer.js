var connection;
var inqQuantity;
var inquirer = require("inquirer");
var isValid = false;
var dbItemID;
var mysql = require("mysql");
var dbPrice;
var dbStock_quantity;

// Make a connection to the bamazon database
connection = mysql.createConnection(
  {
    host: "localhost",
    port: 3306,
    user: "root",           // Username for the database
    password: "woodface94", // Password for the database
    database: "bamazon"     // Database name
  }
);

// Did an error occur while opening the database?
connection.connect(function(dbError) {

  if (dbError) {
    throw dbError;
  }
  else {
    displayItemsForSale();
  }
});

// Select and display all rows from the products table.
function displayItemsForSale() {

  var i = 0;
  var sql = "SELECT * FROM products";

// Query the products table and return all rows and columns
  connection.query(sql, function(dbError, dbResults, dbFields) {

// Did an error occur while querying the database?
    if (dbError) {
      throw dbError;
    }
    else {
// Display the results in the console
      console.log();
      for (i = 0; i < dbResults.length; i++) {
        console.log("Item ID: " + dbResults[i].item_id +
                    "\tProduct Description: " + dbResults[i].product_name +
                    "\tDepartment Name: " + dbResults[i].department_name +
                    "\tPrice: " + dbResults[i].price);
      }
      promptForItemID(dbResults);
    }
  });
}

// The user enters the Item ID they want to buy or 0 to exit the program
function promptForItemID(dbResults) {

  var i = 0;
  isValid = false;

  inquirer.prompt(
    [
      {
        name: "inqItemID",
        type: "input",
        message: "\nEnter the Item ID you would like to purchase or 0 to exit:"
      }
    ]
  )
// Validate the Item ID entered by the user
    .then(function(answer) {

// Exit the program?
      if (answer.inqItemID === '0') {
        console.log("\n*** Goodbye!");
        closeDatabase();
        return;
      }

// Find the entered item ID in the database results
      for (i = 0; i < dbResults.length; i++) {
        if (answer.inqItemID.toLowerCase() === dbResults[i].item_id.toLowerCase()) {
          isValid = true;
          break;
        }
      }

      if (isValid) {
        dbItemID = dbResults[i].item_id;
        dbPrice = dbResults[i].price;
        dbStock_quantity = dbResults[i].stock_quantity; 
        promptForQuantity();
      }
      else {
        console.log("\n*** Please Enter a valid Item ID you would like to purchase or 0 to exit.");
        promptForItemID(dbResults);
      }
    })
}

// The user enters the quantity they want to buy or 0 to exit
function promptForQuantity() {

  inquirer.prompt(
    [
      {
        name: "inqQuantity",
        type: "input",
        message: "\nEnter the quantity you would like to purchase or 0 to exit:"
      }
    ]
  )
// Validate the quantity entered by the user
    .then(function(answer) {

// Exit the program?
      if (answer.inqQuantity === '0') {
        console.log("\n*** Goodbye!");
        closeDatabase();
        return;
      }

      if (isNaN(answer.inqQuantity) || answer.inqQuantity === "") {
        console.log("\n*** Please enter a number for the quantity you would like to purchase or 0 to exit");
        promptForQuantity();
      }
      else {
        inqQuantity = parseInt(answer.inqQuantity);

// Are enough items in stock?
        if (inqQuantity <= dbStock_quantity) {
          dbStock_quantity += - inqQuantity;
          updateDatabase();
        }
        else {
          console.log("\n*** You can order, at most, " + dbStock_quantity + " of that item.");
          promptForQuantity();
        }
      }
  })
}

// Update the products table with the new stock_quantity
function updateDatabase() {

  var sql = "UPDATE products SET stock_quantity = " + dbStock_quantity +
            " WHERE item_id = " + "'" + dbItemID + "'";

  connection.query(sql, function(dbError, dbResult) {

// Did an error occur while updating the database?
    if (dbError) {
      throw dbError;
    }
    else {
      console.log("\n*** Your order total is $" + dbPrice * inqQuantity);
      displayItemsForSale();
    }
  }
)}

// Close the database connection
function closeDatabase() {
  connection.end();
}
