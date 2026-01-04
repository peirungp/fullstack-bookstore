import db from './db.js';
import { products } from './seedData.js';

async function seed() {
    for (const product of products) {
        await db.query(
            'INSERT INTO products (title, author, genre, image, alt, text, price, is_best_seller, sales_count) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [product.title, product.author, product.genre, product.image, product.alt, product.text, product.price, product.isBestSeller || false, product.salesCount || 0]
        )
    }
     process.exit(0);
}

seed().catch(() => {
    process.exit(1);
});