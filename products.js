import db from './db.js';

async function getProductsFromDB() {
  const [rows] = await db.execute('SELECT * FROM products');
  return rows.map(row => ({
    id: row.id,
    title: row.title,
    author: row.author,
    genre: row.genre,
    image: row.image,
    alt: row.alt,
    text: row.text,
    price: Number(row.price),
    isBestSeller: row.is_best_seller === 1,
    salesCount: row.sales_count
  }));
}

async function addProductToDB(product) {
  const { title, author, genre, image, alt, text, price, isBestSeller, salesCount } = product;
  const [result] = await db.query(
    'INSERT INTO products (title, author, genre, image, alt, text, price, is_best_seller, sales_count) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [title, author, genre, image, alt, text, price, isBestSeller || false, salesCount || 0]
  );
  return result.insertId;
}

async function updateProductInDB(productId, updatedProduct) {
  const fields = [];
  const values = [];

  for(const key in updatedProduct) {
    fields.push(`${key} = ?`);
    values.push(updatedProduct[key]);
  }

  values.push(productId);
  const [result] = await db.query(
    `UPDATE products SET ${fields.join(', ')} WHERE id = ?`,
    values
  );
  return result.affectedRows > 0;
}

async function deleteProductFromDB(productId) {
  const[result] = await db.query(
    'DELETE FROM products WHERE id = ?',
    [productId]
  );
  return result.affectedRows > 0;
}

export default {
  getProductsFromDB,
  addProductToDB,
  updateProductInDB,
  deleteProductFromDB
}