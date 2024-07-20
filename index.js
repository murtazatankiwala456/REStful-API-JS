const fs = require("node:fs");
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const products = data.products;
const express = require("express");
const app = express();
app.use(express.json());
// C R U D
// Create POST
app.post("/products", (req, res) => {
  console.log(req.body);
  products.push(req.body);
  res.json(req.body);
});
//  Read GET All Products
app.get("/products", (req, res) => {
  res.json(products);
});
// Read GET Specific Product
app.get("/products/:id", (req, res) => {
  const id = +req.params.id;
  const product = products.find((p) => {
    return p.id === id;
  });
  res.json(product);
});
// Update Full Product
app.put("/products/:id", (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => {
    return p.id === id;
  });
  products.splice(productIndex, 1, { ...req.body, id: id });
  res.status(201).json();
});
// Update Specific field
app.patch("/products/:id", (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => {
    return p.id === id;
  });
  const product = products[productIndex];
  products.splice(productIndex, 1, { ...product, ...req.body });
  res.status(201).json();
});

// Delete Particular product
app.delete("/products/:id", (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => {
    return p.id === id;
  });
  const product = products[productIndex];
  products.splice(productIndex, 1);
  res.status(201).json(product);
});

// Delete All Products
app.delete("/products", (req, res) => {
  products.splice(0, products.length);
  res.json({ message: "All products deleted successfully" });
});

app.listen(3000, () => {
  console.log("Server Started!");
});
