import { useState, useEffect } from 'react';
import './Products.css';
import Card from './Card';
import Button from './Button';
import UpdateProductForm from './UpdateProductForm';
import Carousel from './Carousel';


function Products({ products, onAddToCart, isAdmin, email, firstName, onUpdatedProduct, onDeleteProduct, onAddProduct, navigateTo }) {

  const [filter, setFilter] = useState('all');
  const filteredProducts = filter === 'all' ? products : products.filter(product => product && product.genre === filter);
  const [isUpdateProduct, setIsUpdateProduct] = useState(null);
  const bestSellers = Array.from(
  new Map(
    products
    .filter(product => product.isBestSeller)
    .map(product => [product.title, product])
  ).values()
  ).sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0));
  
  const isSearchPage = window.location.pathname.startsWith('/search');


  useEffect(() => {
    if(!isAdmin) {
      setIsUpdateProduct(null);
    }
  }, [isAdmin]);

  const handleFilter = (type) => {
    setFilter(type);
    if (navigateTo && window.location.pathname.startsWith('/search')) {
      navigateTo('/');
    }
  }
  

  return (
      <div className="products__container">
        {email &&
          <p className="greeting">
            Welcome to BookSpace, {isAdmin ? `Admin` : firstName || email}.
          </p>}
        {bestSellers.length > 0 && !isSearchPage && (
          <Carousel 
            title="Bestsellers"
            products={bestSellers}
            onAddToCart={onAddToCart}
            isAdmin={isAdmin}
            onEdit={onUpdatedProduct}
            onDelete={onDeleteProduct}
          />
        )}
        <h2 className="products__title">Collection of Books</h2>
        <div className="products__filter">
          {['all', 'business strategy', 'fiction', 'non-fiction', 'fantasy'].map((type) => (
            <Button 
              key={type} 
              type="button" 
              visual="button"
              className={`products__filter ${filter === type ? 'active' : ''}`}
              onClick={() => handleFilter(type)}
            >
              {type === 'all' ? 'All Products' : type}
            </Button>
        ))}
        </div>
         {isAdmin && (
          <div className="products__add">
            <Button
              type="button"
              visual="button"
              onClick={() => setIsUpdateProduct({})}
              className="add__new__item"
            >
              Add New Item
            </Button>
          </div>
          )}
          <dialog className="products__dialog" open={isUpdateProduct !== null}>
            <p className="products__dialog__title">New Item</p>
              {isAdmin && isUpdateProduct && (
                  <div className="products__editing">
                      <UpdateProductForm 
                          onSubmit={formData => {
                            if(isUpdateProduct.id) {
                              formData.append('id', isUpdateProduct.id);
                              onUpdatedProduct(formData);
                            }
                            else {
                              onAddProduct(formData);
                            }
                              setIsUpdateProduct(null);
                          }}
                          onCancel={() => setIsUpdateProduct(null)}
                          product={isUpdateProduct}
                          isNew={!isUpdateProduct.id} 
                      />
                  </div>
               )}
          </dialog>
          <div className="products__list">
            {Array.isArray(filteredProducts) && filteredProducts.filter(product => product && product.id).map(product => (
              <Card
                key={`${product.id}-${product.image}`}
                {...product}
                onAddToCart={onAddToCart}
                onEdit={isAdmin ? () => setIsUpdateProduct(product) : null}
                onDelete={isAdmin ? () => onDeleteProduct(product.id) : null}
              />
            ))}
          </div>
      </div>
  );
}

export default Products;