import dotenv from 'dotenv';
import pool from './db.js';
import bcrypt from 'bcryptjs';
dotenv.config();

const SALT_ROUNDS = 10;

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function isUserRegistered(email) {
  const [row] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
  return row.length > 0;
}

async function addUser(email, password, firstName, lastName) {
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const [result] = await pool.query('INSERT INTO users (email, password_hash, first_name, last_name) VALUES (?, ?, ?, ?)', [email, passwordHash, firstName, lastName]);

  return result.insertId;
}

async function getUser(email) {
  const [rows] = await pool.query('SELECT id, email, first_name, last_name, phone, address, is_admin, last_login FROM users WHERE email = ?', [email])
  
  if (rows.length === 0) return null;

  return {
    id: rows[0].id,
    email: rows[0].email,
    firstName: rows[0].first_name,
    lastName: rows[0].last_name,
    phone: rows[0].phone,
    address: rows[0].address,
    lastLogin: rows[0].last_login,
    isAdmin: Number(rows[0].is_admin)
  };
}

async function validatePassword(email, password) {
  const [rows] = await pool.query('SELECT password_hash FROM users WHERE email = ?', [email]);
  if (rows.length === 0) return false;
  return await bcrypt.compare(password, rows[0].password_hash);
}

async function updateUser(email, firstName, lastName, phone, address) {
  const [result] = await pool.query('UPDATE users SET first_name = ?, last_name = ?, phone = ?, address = ? WHERE email = ?', [firstName, lastName, phone, address, email]);
  return result.affectedRows > 0;
}

async function updatePassword(email, password) {
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const [result] = await pool.query('UPDATE users SET password_hash = ? WHERE email = ?', [passwordHash, email]);
  return result.affectedRows > 0;
}

async function updateLoginTime(email) {
  const [result] = await pool.query('UPDATE users SET last_login = NOW() WHERE email = ?', [email]);
  return result.affectedRows > 0;
}

async function addToCart(email, productId, quantity) {
  const [rows] = await pool.query(
    'SELECT quantity FROM cart WHERE email = ? AND product_id = ?', [email, productId]
  );

  if (rows.length > 0) {
    await pool.query(
      'UPDATE cart SET quantity = quantity + ? WHERE email = ? AND product_id = ?', [quantity, email, productId]
    );
  } else {
    await pool.query(
      'INSERT INTO cart (email, product_id, quantity) VALUES (?, ?, ?)', [email, productId, quantity]
    );
  }
}

async function getCart(email) {
  const [rows] = await pool.query(
    'SELECT product_id, quantity FROM cart WHERE email = ?', [email]
  );

  const cart = {};
  for (const row of rows) {
    cart[row.product_id] = row.quantity;
  }

  return { cart };
}

async function updateCartQuantity(email, productId, quantity) {
  if (quantity <= 0) {
    await pool.query(
      'DELETE FROM cart WHERE email = ? AND product_id = ?', [email, productId]
    );
  } else {
    await pool.query(
      'UPDATE cart SET quantity = ? WHERE email = ? AND product_id = ?',
      [quantity, email, productId]
    );
  }
}

async function removeFromCart(email, productId) {
  await pool.query(
    'DELETE FROM cart WHERE email = ? AND product_id = ?', [email, productId]
  );
}

async function clearCart(email) {
  await pool.query(
    'DELETE FROM cart WHERE email = ?', [email]
  );
}

export default {
  isValidEmail,
  isUserRegistered,
  addUser,
  getUser,
  validatePassword,
  updateUser,
  updatePassword,
  updateLoginTime,
  addToCart,
  getCart,
  updateCartQuantity,
  removeFromCart,
  clearCart
};