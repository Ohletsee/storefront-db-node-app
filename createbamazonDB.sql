-- Drop the bamazon database if it exists
DROP DATABASE IF EXISTS bamazon;

-- Creates the bamazon database --
CREATE DATABASE bamazon;

-- Use bamazon as the default database so all of the code applies to it
USE bamazon;

-- Createa a table called products within the bamazon database
-- The products table contains:
-- * item_id (unique id for each product)
-- * product_name (Name of product)
-- * department_name
-- * price (cost to customer)
-- * stock_quantity (how much of the product is available in stores)
CREATE TABLE products (
  item_id VARCHAR(5) NOT NULL PRIMARY KEY,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(5,2) NOT NULL,
  stock_quantity INTEGER NOT NULL
);

-- Do a bulk Insert of rows into the bamazon database. All database columns must be populated.
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
 VALUES("A1234", "LED Light Bulbs", "Home Lighting", 13.99, 100),
	   ("B5678", "Incandescent Light Bulbs", "Home Lighting", 8.88, 25),
       ("C9012", "MAXX Power Drill", "Hardware", 59.78, 12),
       ("D3456", "Travelers Deluxe Luggage", "Travel Accessories", 239.42, 4),
       ("E7890", "8 Place Settings Dinnerware", "Home Living", 186.60, 12),
       ("F1234", "8 Place Settings Flatware", "Home Living", 79.52, 13),
       ("G5678", "Hot Water Heater", "Plumbing", 601.99, 7),
       ("H9012", "Stainless Steel Kitchen Sink", "Home Improvement", 204.66, 10),
       ("I3456", "Tan Window Mini Blinds", "Home Living", 24.99, 70),
       ("J7689", "Christmas Tree", "Holiday Decorations", 104.38, 5);
