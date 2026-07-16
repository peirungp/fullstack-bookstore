import { useState } from 'react';
import { FORM } from './setting.js';
import './UpdateProductForm.css';
import Button from './Button';
import ErrorMessage from './ErrorMessage';



function UpdateProduct({ onSubmit, onCancel, product, isNew = false }) {

  const [editingProduct, setEditingProduct] = useState(product || {});
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState(null);

  function updateField(field, value) {
    setEditingProduct({ ...editingProduct, [field]: value });
    if(error) {
      setError('');
    }
  }

  function handleEdit(e) {
    e.preventDefault();

    if(!editingProduct.alt ||
        !editingProduct.title ||
        !editingProduct.author ||
        !editingProduct.text ||
        editingProduct.genre === 'select'
    ) {
        setError(FORM.REQUIRED_AREA);
        return;
    }

    if(isNew && !imageFile) {
      setError(FORM.IMAGE_REQUIRED);
      return;
    }

    if(!editingProduct.price || Number(editingProduct.price) <= 1) {
    setError(FORM.PRICE_ERROR); 
    return;
    }

    setError('');
    const formData = new FormData();

    if(imageFile) {
      formData.append('image', imageFile);
    } else if(editingProduct.image) {
      formData.append('image', editingProduct.image);
    }
    formData.append('alt', editingProduct.alt);
    formData.append('genre', editingProduct.genre);
    formData.append('title', editingProduct.title);
    formData.append('author', editingProduct.author);
    formData.append('text', editingProduct.text);
    formData.append('price', editingProduct.price);
    onSubmit(formData);
  }

  return (
    <form onSubmit={handleEdit} className="update__product__form">
      <label htmlFor="image">Image:
        {!isNew && editingProduct.image && (
          <div className="current__image__container">
            Current: {editingProduct.image.includes('cloudinary.com') 
            ? editingProduct.image.split('/').pop() 
            : editingProduct.image}
          </div>
        )}
        <input 
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
        />
      </label>
      <label htmlFor="alt">Image description:
        <textarea 
          value={editingProduct.alt || ''} 
          onChange={(e) => updateField('alt', e.target.value)}
        />
      </label>
      <label htmlFor="genre" >Genre:
        <select 
          value={editingProduct.genre || 'select'} 
          onChange={(e) => updateField('genre', e.target.value)}
          className="genre__select"
        >
          <option value="select">- Select -</option>
          <option value="business strategy">Business Strategy</option>
          <option value="fiction">Fiction</option>
          <option value="non-fiction">Non-Fiction</option>
          <option value="fantasy">Fantasy</option>
        </select>    
      </label>
      <label htmlFor="title">Title:
        <input 
          value={editingProduct.title || ''} 
          onChange={(e) => updateField('title', e.target.value)}
        />
      </label>
      <label htmlFor="author">Author:
        <input 
          value={editingProduct.author || ''} 
          onChange={(e) => updateField('author', e.target.value)}
        />
      </label>
      <label htmlFor="text">Description:
        <textarea 
          value={editingProduct.text || ''} 
          onChange={(e) => updateField('text', e.target.value)}
        />
      </label> 
      <label htmlFor="price">Price:
          <input 
            type="number"
            min="0"
            value={editingProduct.price || ''} 
            onChange={(e) => updateField('price', Number(e.target.value))}
          />
      </label>
        <ErrorMessage error={error}/>
        <div className="buttons_container">
          <Button type="submit" className="update__save">Save</Button> 
          <Button type="button" onClick={onCancel} className="update__cancel">Cancel</Button>                                                                                                                                                  
        </div>
    </form>
  );
}

export default UpdateProduct;