import Button from './Button';
import './Card.css';

function Card({ id, title, author, genre, image, alt, text, price, onAddToCart, onEdit, onDelete }) {

  const genreDisplay = genre ? genre.charAt(0).toUpperCase() + genre.slice(1) : genre;
  const imageUpdate = image.includes('cloudinary.com') ? `${image}?${Date.now()}` : image;

  return (
    <div className="card__item">
      <img className="card__img" 
        src={imageUpdate} 
        alt={alt} 
        key={image}
      />
        <p className="card__genre">Genre: {genreDisplay}</p>
        <h3 className="card__title">{title}</h3>
        <p className="card__author">by {author}</p>
        <p className="card__content">{text}</p>
        <p className="card__price">${typeof price === 'number' ? price.toFixed(2) : price}</p>
        <div className="card__buttons">
          <Button 
            className="card__add" 
            type="button" 
            visual="button" 
            onClick={() => { onAddToCart(id); }}
          >
            Add to Cart
          </Button>
          {onEdit && (
            <Button
              className="card__edit"
              type="button"
              visual="button"
              onClick={onEdit}
            >
              Edit
            </Button>
          )}
          {onDelete && (
            <Button
              className="card__delete"
              type="button"
              visual="button"
              onClick={onDelete}
            >
              Delete
            </Button>
          )}
        </div>
    </div>
  );
}

export default Card;