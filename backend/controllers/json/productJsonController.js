import fs from 'fs';
import path from 'path';

const filePath = path.join('data', 'jsonData', 'products.json');

// Helper to read JSON file
const readData = () => {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, 'utf8');
  return data ? JSON.parse(data) : [];
};

// Helper to write to JSON file
const writeData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// CREATE
export const createJsonProduct = (req, res) => {
  const { name, description, category, price } = req.body;
  const products = readData();

  const newProduct = {
    id: Date.now(),
    name,
    description,
    category,
    price
  };

  products.push(newProduct);
  writeData(products);

  res.status(201).json({ message: 'Product created', product: newProduct });
};

// READ ALL
export const getAllJsonProducts = (req, res) => {
  const products = readData();
  res.json(products);
};

// READ ONE
export const getJsonProductById = (req, res) => {
  const { id } = req.params;
  const products = readData();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.json(product);
};

// UPDATE
export const updateJsonProduct = (req, res) => {
  const { id } = req.params;
  const { name, description, category, price } = req.body;
  const products = readData();
  const index = products.findIndex(p => p.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  products[index] = {
    ...products[index],
    name: name || products[index].name,
    description: description || products[index].description,
    category: category || products[index].category,
    price: price !== undefined ? price : products[index].price
  };

  writeData(products);
  res.json({ message: 'Product updated', product: products[index] });
};

// DELETE
export const deleteJsonProduct = (req, res) => {
  const { id } = req.params;
  let products = readData();
  const index = products.findIndex(p => p.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const deleted = products.splice(index, 1);
  writeData(products);
  res.json({ message: 'Product deleted', product: deleted[0] });
};
