import express from 'express';
import cookieParser from 'cookie-parser';
import users from './users.js';
import sessions from './sessions.js';
import products from './products.js';
import orders from './orders.js';
import path from 'path';
import cors from 'cors';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'bookSpace_images',
    allowed_formats: ['jpg', 'png', 'jpeg']
  }
});

const upload = multer({ storage });

const __dirname = import.meta.dirname;

const app = express();
const PORT = 3000;

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.static('./dist'));
app.use(express.json());
app.use(cookieParser());

// sessions
app.get('/api/v1/session', async (req, res) => {
  const sid = req.cookies.sid;
  const email = sid ? sessions.getSessionUser(sid) : '';

  if(!sid || !users.isValidEmail(email)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const userData = await users.getUser(email);
  const isAdmin = userData ? userData.isAdmin === 1 : false;

  res.json({ email, firstName: userData.firstName || 'Admin', lastName: userData.lastName, phone: userData.phone, address: userData.address, isAdmin });
});

app.post('/api/v1/session', async (req, res) => {
  const { email, password } = req.body;
  if(!users.isValidEmail(email)) {
    res.status(400).json({ error: 'invalid-email' });
    return;
  }
    
  if(!(await users.isUserRegistered(email))) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  if(!(await users.validatePassword(email, password))) {
    res.status(401).json({ error: 'password-wrong' });
    return;
  }

  const userData = await users.getUser(email);
  await users.updateLoginTime(email);

  const sid = sessions.addSession(email);

  res.cookie('sid', sid);

  const userCart = await users.getCart(email);
  res.json({ email, firstName: userData.firstName || 'Admin', lastName: userData.lastName, phone: userData.phone, address: userData.address, isAdmin: userData.isAdmin === 1, cart: userCart });
});

app.delete('/api/v1/session', (req, res) => {
  const sid = req.cookies.sid;
  const email = sid ? sessions.getSessionUser(sid) : '';
  res.clearCookie('sid');

  if(email) {
    sessions.deleteSession(sid);
  }

  res.json({ email });
});

// register
app.post('/api/v1/register', async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  if(!users.isValidEmail(email)) {
    res.status(400).json({ error: 'invalid-email' });
    return;
  }

  if(await users.isUserRegistered(email)) {
    res.status(409).json({ error: 'user-exists'});
    return;
  }

  await users.addUser(email, password, firstName, lastName);
  const userData = await users.getUser(email);
  const sid = sessions.addSession(email);

  res.cookie('sid', sid);
  res.json({ email, firstName: userData.firstName, lastName: userData.lastName, isAdmin:false, cart: {} });
});

// update profile
app.put('/api/v1/profile', async (req, res) => {
  
  const sid = req.cookies.sid;
  const email = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValidEmail(email)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const { firstName, lastName, phone, address } = req.body;

  try { 
  await users.updateUser(email, firstName, lastName, phone, address);
  const user = await users.getUser(email);

    res.json({ email, firstName: user.firstName, lastName: user.lastName, phone: user.phone, address: user.address, isAdmin: user.isAdmin === 1});
  } catch (error) {
    res.status(500).json({ error: 'internal-error', errorMessage: error.message });
  }
});

app.put('/api/v1/change-password', async (req, res) => {
  const sid = req.cookies.sid;
  const email = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValidEmail(email)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const { currentPassword, newPassword } = req.body;

  if(!(await users.validatePassword(email, currentPassword))) {
    res.status(401).json({ error: 'invalid-current-password' });
    return;
  }

  await users.updatePassword(email, newPassword);

  res.json({ message: 'password-updated' });
});

// cart
app.get('/api/v1/cart', async (req, res) => {
  const sid = req.cookies.sid;
  const email = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValidEmail(email)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const cart = await users.getCart(email);
  res.json(cart);
});

app.post('/api/v1/cart', async (req, res) => {
  const sid = req.cookies.sid;
  const email = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValidEmail(email)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const { productId, quantity = 1 } = req.body;
  if(!productId) {
    res.status(400).json({ error: 'invalid-product-id' });
    return;
  }

  const allProducts = await products.getProductsFromDB();
  const product = allProducts.find(product => product.id === productId);
  
  if(!product) {
    res.status(404).json({  error:`product-not-found` });
    return;
  }

  await users.addToCart(email, productId, quantity);
  
  const cart = await users.getCart(email);

  res.json(cart);
});

app.put('/api/v1/cart/:id', async (req, res) => {
  const sid = req.cookies.sid;
  const email = sid ? sessions.getSessionUser(sid) : '';
  
  if(!sid || !users.isValidEmail(email)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const { id } = req.params;
  const { quantity } =req.body;
  
  if(isNaN(quantity)) {
    res.status(400).json({ error: 'invalid-quantity' });
    return;
  }

  await users.updateCartQuantity(email, id, quantity); 
  const cart = await users.getCart(email);
    
  res.json(cart);
});

app.delete('/api/v1/cart/:id', async (req, res) => {
  const sid = req.cookies.sid;
  const email = sid ? sessions.getSessionUser(sid) : '';
  
  if(!sid || !users.isValidEmail(email)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const { id } = req.params;

  await users.removeFromCart(email, id);
  const cart = await users.getCart(email);

  res.json(cart);
});

app.post('/api/v1/cart/checkout', async (req, res) => {
  const sid = req.cookies.sid;
  const email = sid ? sessions.getSessionUser(sid) : '';

  if(!sid || !users.isValidEmail(email)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const userCart = await users.getCart(email);
  const userItems = userCart.cart;
  
  if(Object.keys(userItems).length === 0) {
    res.status(400).json({ error: 'cart-empty' });
    return;
  }

  const allProducts = await products.getProductsFromDB();
  const cartItems = Object.keys(userItems).map( id => {
    const product = allProducts.find(p => p.id === Number(id));
    return {
      id: product.id,
      title: product.title,
      author: product.author,
      price: product.price,
      image: product.image,
      quantity: userItems[id]
    }
  })
  
  const checkoutTotal = cartItems.reduce((sum, item) =>
    sum + item.price * item.quantity, 0
  );

  const userData = await users.getUser(email);

  await orders.createOrder(email, userData.firstName || '', userData.lastName || '', cartItems, checkoutTotal);
   
  await users.clearCart(email);
  res.json({ checkoutTotal });
});

app.get('/api/v1/orders', async (req, res) => {
  const sid = req.cookies.sid;
  const email = sid ? sessions.getSessionUser(sid) : '';

  if(!sid || !users.isValidEmail(email)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const userOrders = await orders.getUserOrders(email);
  res.json({ orders: userOrders });
});

// products
app.get('/api/v1/products', async (req, res) => {
  const allProducts = await products.getProductsFromDB();
  res.json(allProducts);
});

app.post('/api/v1/products', upload.single('image'), async (req, res) => {
  const sid = req.cookies.sid;
  const email = sid ? sessions.getSessionUser(sid) : '';
  
  if(!sid) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const userData = await users.getUser(email);
  const admin = userData ? userData.isAdmin === 1 : false;

  if(!admin) {
    res.status(403).json({ error: 'auth-insufficient' });
    return;
  }
    
  const imageUrl = req.file ? req.file.path : req.body.image;
    
  const { title, author, genre, alt, text, price } = req.body;
      
  if(!title || !author || !genre || !alt || !text || price === undefined || price === null || price === '' || !imageUrl) {
    res.status(400).json({ error: 'invalid-product-data' });
    return;
  }

  const allProducts = await products.getProductsFromDB();
  const existingProduct = allProducts.find(p => p.title === title && p.author === author);
    
  if(existingProduct) {
    res.status(409).json({ error: 'product-exists' });
    return;
  }

  await products.addProductToDB({ 
    title, 
    author, 
    genre, 
    image: imageUrl, 
    alt, 
    text, 
    price: Number(price), 
    isBestSeller: false, 
    salesCount: 0 
  });
  const allProduct = await products.getProductsFromDB();
  res.json(allProduct);  
});


app.put('/api/v1/products/:id', upload.single('image'), async (req, res) => {
  const sid = req.cookies.sid;
  const email = sid ? sessions.getSessionUser(sid) : '';
  
  if(!sid) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const userData = await users.getUser(email);
  const admin = userData ? userData.isAdmin === 1 : false;

  if(!admin) {
    res.status(403).json({ error: 'auth-insufficient' });
    return;
  }

  const imageUrl = req.file ? req.file.path : req.body.image;
  
  const { title, author, genre, alt, text, price } = req.body;
    
  if(!title || !author || !genre || !imageUrl || !alt || !text || !price) {
    res.status(400).json({ error: 'invalid-product-data' });
    return;
  }

  const allProducts = await products.getProductsFromDB();
  const oldProduct = allProducts.find(p => p.id === Number(req.params.id));

  if(!oldProduct) {
    res.status(404).json({ error: 'not-found' });    
    return;
  }

  if(req.file && oldProduct.image && oldProduct.image.includes('cloudinary.com')) {
    const segments = oldProduct.image.split('/');
    const imageName = segments[segments.length - 1];
    const filename = imageName.split('.')[0];
    const folder = segments[segments.length - 2];
    const publicId = `${folder}/${filename}`;
    await cloudinary.uploader.destroy(publicId);
  }

  const id = Number(req.params.id);
  const updatedProduct = await products.updateProductInDB(id, { 
    title, 
    author, 
    genre, 
    image: imageUrl, 
    alt, 
    text, 
    price: Number(price) 
  });

  if(!updatedProduct) {
    res.status(404).json({ error: 'not-found'});
    return;
  }
  
  const updatedProducts = await products.getProductsFromDB();
  
  res.json(updatedProducts);
});

app.delete('/api/v1/products/:id', async (req, res) => {
  const sid = req.cookies.sid;
  const email = sid ? sessions.getSessionUser(sid) : '';

  if(!sid) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const userData = await users.getUser(email);
  const admin = userData ? userData.isAdmin === 1 : false;

  if(!admin) {
    res.status(403).json({ error: 'auth-insufficient' });
    return;
  }

  const id = Number(req.params.id);
  const allProducts = await products.getProductsFromDB();
  const product = allProducts.find(p => p.id === id);

  if(!product) {
    res.status(404).json({ error: 'not-found' });    
    return;
  }

  if(product.image && product.image.includes('cloudinary.com')) {
    const segments = product.image.split('/');
    const imageName = segments[segments.length - 1];
    const filename = imageName.split('.')[0];
    const folder = segments[segments.length - 2];
    const publicId = `${folder}/${filename}`;
    await cloudinary.uploader.destroy(publicId);
  }

  await products.deleteProductFromDB(id);

  const updatedProducts = await products.getProductsFromDB();
  res.json(updatedProducts);
});

app.get('/*splat', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(3000, () => console.log(`http://localhost:${PORT}`));