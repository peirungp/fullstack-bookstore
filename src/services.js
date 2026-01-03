export function fetchSession(){
  return fetch('/api/v1/session')
    .catch( () => Promise.reject({ error: 'network-error' }) )
    .then( response => {
      if(response.ok) {
        return response.json();
    }
      return response.json()
      .catch( error => Promise.reject({ error }))
      .then( err => Promise.reject(err));
  });
}

export function fetchRegister(email, password, firstName, lastName){
  return fetch('/api/v1/register', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({ email, password, firstName, lastName})
  })
  .catch( () => Promise.reject({ error: 'network-error' }) )
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    return response.json()
    .catch( error => Promise.reject({ error }))
    .then( err => Promise.reject(err));
  });
}

export function fetchUpdateProfile(firstName, lastName, phone, address) {
  return fetch('/api/v1/profile', {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({ firstName, lastName, phone, address })
  })
  .catch( () => Promise.reject({ error: 'network-error' }) )
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    return response.json()
    .catch( error => Promise.reject({ error }))
    .then( err => Promise.reject(err));
  });
}

export function fetchChangePassword(currentPassword, newPassword) {
  return fetch(`/api/v1/change-password`, {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({ currentPassword, newPassword })
  })
  .catch( () => Promise.reject({ error: 'network-error' }) )
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    return response.json()
    .catch( error => Promise.reject({ error }))
    .then( err => Promise.reject(err));
  });
}

export function fetchLogin(email, password){
  return fetch('/api/v1/session', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({ email, password })
  })
  .catch( () => Promise.reject({ error: 'network-error' }) )
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    return response.json()
    .catch( error => Promise.reject({ error }))
    .then( err => Promise.reject(err));
  });
}

export function fetchLogout(){
  return fetch('/api/v1/session', {
    method: 'DELETE'
  })
  .catch( () => Promise.reject({ error: 'network-error' }) )
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    return response.json()
    .catch( error => Promise.reject({ error }))
    .then( err => Promise.reject(err));
  });    
}

export function fetchCart(){
  return fetch('/api/v1/cart')
    .catch( () => Promise.reject({ error: 'network-error' }) )
    .then( response => {
      if(response.ok) {
        return response.json();
      }
    return response.json()
    .catch( error => Promise.reject({ error }))
    .then( err => Promise.reject(err));
  });    
}

export function fetchAddToCart(productId){
  return fetch('/api/v1/cart', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({ productId })
  })
  .catch( () => Promise.reject({ error: 'network-error' }) )
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    return response.json()
    .catch( error => Promise.reject({ error }))
    .then( err => Promise.reject(err));
  });    
}

export function fetchCheckout() {
  return fetch('/api/v1/cart/checkout', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
  })
  .catch( () => Promise.reject({ error: 'network-error' }) )
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    return response.json()
    .catch( error => Promise.reject({ error }))
    .then( err => Promise.reject(err));
  });  
}

export function fetchUpdateCart(id, quantity){
  return fetch(`/api/v1/cart/${id}`, {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
      body: JSON.stringify({ quantity })
  })
  .catch( () => Promise.reject({ error: 'network-error' }) )
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    return response.json()
    .catch( error => Promise.reject({ error }))
    .then( err => Promise.reject(err));
  });     
}

export function fetchRemoveFromCart(id){
  return fetch(`/api/v1/cart/${id}`, {
    method: 'DELETE'
  })
  .catch( () => Promise.reject({ error: 'network-error' }) )
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    return response.json()
    .catch( error => Promise.reject({ error }))
    .then( err => Promise.reject(err));
  });     
}

export function fetchProducts(){
  return fetch('/api/v1/products')
    .catch( () => Promise.reject({ error: 'network-error' }) )
    .then( response => {
      if(response.ok) {
        return response.json();
      }
      return response.json()
      .catch( error => Promise.reject({ error }))
      .then( err => Promise.reject(err));
    });        
}
export function fetchAddProduct(formData){
  return fetch('/api/v1/products', {
    method: 'POST',
    body: formData,
    credentials: 'include'
  })
  .catch( () => Promise.reject({ error: 'network-error' }) )
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    return response.json()
    .catch( error => Promise.reject({ error }))
    .then( err => Promise.reject(err));
  });    
}

export function fetchUpdateProduct(id, formData){
  return fetch(`/api/v1/products/${id}`, {
      method: 'PUT',
      body: formData,
      credentials: 'include'
  })
  .catch( () => Promise.reject({ error: 'network-error' }) )
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    return response.json()
    .catch( error => Promise.reject({ error }))
    .then( err => Promise.reject(err));
  }); 
}

export function fetchDeleteProduct(id){
  return fetch(`/api/v1/products/${id}`, {
    method: 'DELETE'
  })
  .catch( () => Promise.reject({ error: 'network-error' }) )
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    return response.json()
    .catch( error => Promise.reject({ error }))
    .then( err => Promise.reject(err));
  }); 
}

export function fetchOrder() {
  return fetch(`/api/v1/orders`, {
    method: 'GET'
  })
  .catch( () => Promise.reject({ error: 'network-error' }) )
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    return response.json()
    .catch( error => Promise.reject({ error }))
    .then( err => Promise.reject(err));
  });
}
