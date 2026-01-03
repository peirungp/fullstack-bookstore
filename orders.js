import db from './db.js';

async function createOrder(email, firstName, lastName, items, totalAmount) {
    const orderNumber = `ORD-${Date.now()}`;
    const [result] = await db.query(
        'INSERT INTO orders (order_number, email, first_name, last_name, items, total_amount) VALUES (?, ?, ?, ?, ?, ?)',
        [orderNumber, email, firstName, lastName, JSON.stringify(items), totalAmount]
    );
    return {
        id: result.insertId,
        orderNumber,
        email,
        firstName,
        lastName,
        items,
        totalAmount,
        createAt: new Date()
    };
}

async function getUserOrders(email) {
    const [orders] = await db.query(
        'SELECT * FROM orders WHERE email = ? ORDER BY created_at DESC',
        [email]
    );
    return orders;
}

export default {
    createOrder,
    getUserOrders
};