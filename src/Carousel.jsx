import { useState } from 'react';
import './Carousel.css';
import Card from './Card';
import Button from './Button';

function Carousel({ title, products, onAddToCart }) {
    const booksToShow = 4;
    const books = [];
    for (let i = 0; i < products.length; i+= booksToShow) {
        books.push(products.slice(i, i+booksToShow));
    }

    const [currentPage, setCurrentPage] = useState(0);
    const goToPrevious = () => {
        setCurrentPage(prev => (prev === 0 ? books.length - 1 : prev - 1));
    }
        const goToNext = () => {
        setCurrentPage(prev => (prev === books.length - 1 ? 0 : prev + 1));
    }

    return (
        <div className="carousel">
            <div className="carousel__header">
                <h2 className="carousel__title">{title}</h2>
            </div>          
            <div className="carousel__cards">
                {books.length > 1 && (
                    <button
                      className="carousel__left-arrow"
                      onClick={goToPrevious}
                      aria-label="Previous"
                    >
                      &#8592;
                    </button>
                  )}
                {books.map((book, index) => (
                    <div key={index} className={`carousel__page ${index === currentPage ? 'active' : ''}`}>
                        {book.map(book => (
                            <div key={book.id} className="carousel__item">
                                <div className="carousel__card">
                                    <div className="carousel__card-image-wrapper">
                                        <img 
                                          src={book.image} 
                                          alt={book.title} 
                                          className="carousel__card-image"
                                        />
                                        <div className="carousel-card__overlay">
                                        <button
                                            className="carousel__add-to-cart"
                                            onClick={() => onAddToCart(book.id)}
                                        >
                                            Quick Add
                                        </button>
                                    </div>
                                    </div>
                                </div>
                                <h3 className="carousel-card__title">{book.title}</h3>
                                <p className="carousel-card__author">by {book.author}</p>
                                <p className="carousel-card__price">${book.price.toFixed(2)}</p>
                            </div>
                        ))}
                    </div>                
                ))}
                {books.length > 1 && (
                <button
                    className="carousel__right-arrow"
                    onClick={goToNext}
                    aria-label="Next"
                >
                    &#8594;
                </button>
            )}
            </div>
            <div className="carousel__dots">
              {books.map((_, index) => (         
                <a
                  key={index}
                  className={`carousel__dot ${index === currentPage ? 'active' : ''}`}
                  onClick={() => setCurrentPage(index)}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
        </div>
    )
}

export default Carousel;