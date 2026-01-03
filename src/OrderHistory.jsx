import { useState, useEffect } from 'react';
import './OrderHistory.css';
import { fetchOrder } from './services';
import Spinner from './spinner';
import { FORM } from './setting';
import { ERRORLIST } from './setting';
import ErrorMessage from './ErrorMessage';

function OrderHistory({ isAdmin }) {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchOrder()
        .then(data => {
            setOrders(data.orders);
        })
        .catch( () => {
            setError(ERRORLIST[FORM.LOADING_FAILED]);
        });
    }, []);

    if (isAdmin) {
        return null;
    }


    return (
        <div className="order__history__container">
            <h2 className="order__history__title">Order History</h2>
            {error ? (
                <ErrorMessage error={error} />
            ): orders.length === 0 ? (
                <p className="no__orders__message">You have no orders yet.</p>   
            ) : (
               orders.map(order => (
                 <details key={order.id} className="order__card">
                    <summary className="order__summary" key={order.id}>
                      <div className="order__summary__left">
                        <h3>Order# {order.order_number}</h3>
                        <p className="order__date">{new Date(order.created_at).toLocaleDateString()}</p>
                      </div>  
                      <div className="order__summary__right">
                        <p className="order__total">Total: ${order.total_amount}</p>
                      </div>
                    </summary> 
                      <div className="order__details">
                        <h4>View Details</h4>
                        <ul className="order__items__list">
                        {order.items.map(item => (
                          <li className="order__item" key={item.id}>
                            <img className="order__item__image" src={item.image} alt={item.title} />
                            <div className="order__item__details">
                                <p className="order__item__title">{item.title}</p>
                                <p className="order__item__author">by {item.author}</p>
                            </div>
                            <div className="order__item__details__right">
                                <p className="order__item__qty">Qty: {item.quantity}</p>
                                <p className="order__item__price">Price: ${item.price.toFixed(2)}</p>
                            </div>
                          </li>
                          ))}
                        </ul>
                      </div>
                                   
                 </details>
                ))
            )}
        </div>
    );
}

export default OrderHistory;