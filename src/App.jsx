import { useState, useEffect, useReducer } from 'react';
import './App.css';
import {
  fetchSession,
  fetchRegister,
  fetchLogin,
  fetchLogout,
  fetchCart,
  fetchAddToCart,
  fetchUpdateCart,
  fetchRemoveFromCart,
  fetchProducts,
  fetchAddProduct,
  fetchUpdateProduct,
  fetchDeleteProduct,
  fetchCheckout,
 } from './services';
import { 
  LOGIN_STATUS,
  SERVER,
  CLIENT, 
} from './setting';
import reducer, { initialState } from './reducer';
import LoginForm from './LoginForm';
import Header from './Header';
import About from './About';
import Footer from './Footer';
import RegisterForm from './RegisterForm';
import ErrorMessage from './ErrorMessage';
import Spinner from './Spinner';
import Products from './Products';
import Cart from './Cart';
import ManageAccount from './ManageAccount.jsx';

function App() {
    
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showCart, setShowCart] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  function navigateTo(path) {
    if (path === '/login') {
      setShowLoginForm(true); 
      return;
    } 
    if (path === '/register') {
      setShowRegisterForm(true)
      return;
    }
 
    dispatch({ type: 'set-page', page: path });
    dispatch({ type: 'clear-error' });
    window.history.pushState(null, '', path);
  }

  function onClearCartError() {
    dispatch({ type: 'clear-error' });
  }

  function checkSession() {
    fetchSession()
    .then( session => {
      dispatch({ 
        type: 'login', 
        email: session.email, 
        firstName: session.firstName, 
        lastName: session.lastName, 
        phone: session.phone, 
        address: session.address, 
        isAdmin: session.isAdmin 
      });
      return fetchCart();
    })
    .catch( err => {
      if ( err.error === SERVER.AUTH_MISSING ) {
        return Promise.reject({ error: CLIENT.NO_SESSION });
      }
      return Promise.reject(err);
    })
    .then( cart => {
      dispatch({ type: 'cart-loaded', cart });
    })
    .catch( err => {
      if ( err.error === CLIENT.NO_SESSION ) {
        dispatch({ type: 'logout' });
        return;
      }
      dispatch({ type: 'error', error: err.error });
    });
  }

  function onRegister(email, password, firstName, lastName) {
    dispatch({ type: 'loading' });
    fetchRegister(email, password, firstName, lastName)
    .then( () => {
      dispatch({ type: 'clear-error' });
      setShowRegisterForm(false); 
      setShowLoginForm(true);
    })
    .catch( err => {
      dispatch({ type: 'error', error: err.error });
    });
  }

  function onLogin(email, password) {
    dispatch({ type: 'loading' });
    fetchLogin(email, password)
    .then( user => {
      dispatch({ 
        type: 'login', 
        email: user.email, 
        firstName: user.firstName, 
        lastName: user.lastName, 
        phone: user.phone, 
        address: user.address, 
        isAdmin: user.isAdmin 
      });
      dispatch({ type: 'clear-error' });
      setShowLoginForm(false);
      navigateTo('/');
    })
    .catch( err => {
      dispatch({ type: 'error', error: err.error, errorType: 'login' });
    });
  }

  function onLogout() {
    dispatch({ type: 'logout'});
    fetchLogout()
    .catch( err => {
      dispatch({ type: 'error', error: err.error });
    });
    navigateTo('/');
  }

  function onAddToCart(id) {
    if (state.loginStatus !== LOGIN_STATUS.IS_LOGGED_IN) {
      setShowLoginForm(true);
      return;
    }
    
    fetchAddToCart(id)
    .then(cart => {
      dispatch({ type: 'cart-loaded', cart });      
    })
    .catch(err => {
      if (err.error === CLIENT.NO_SESSION) {
        dispatch({ type: 'logout' });
      }
      dispatch({ type: 'error', error: err.error });
    });
  }

  function onCheckout() {
    fetchCheckout()
    .then( () => {
      dispatch({ type: 'cart-checkout' });
      setShowCart(true);
    })
    .catch( err => {
      dispatch({ type: 'error', error: err.error });
    }); 
  }

  function onUpdatedCart(id, quantity) {
    fetchUpdateCart(id, quantity)
    .then( cart => {
      dispatch({ type: 'cart-loaded', cart });
    })
    .catch( err => {
      dispatch({ type: 'error', error: err.error });
    });  
  }

  function onRemoveFromCart(id) {
    fetchRemoveFromCart(id)
    .then( cart => {
      dispatch({ type: 'cart-loaded', cart });
    })
    .catch( err => {
      dispatch({ type: 'error', error: err.error });
    });
  }

  function onProducts() {
    fetchProducts()
    .then( products => {
      dispatch({ type: 'products-loaded', products });
    })
    .catch( err => {
      dispatch({ type: 'error', error: err.error });
    });
  }

  function onUpdatedProduct(formData) {
    const id = formData.get('id');
    
    fetchUpdateProduct(id, formData)
    .then( products => {
      dispatch({ type: 'products-loaded', products });
    })
    .catch( err => {
      dispatch({ type: 'error', error: err.error });
    });
  }

  function onAddProduct(newProduct) {
    fetchAddProduct(newProduct)
    .then( products => {
      dispatch({ type: 'products-loaded', products });
    })
    .catch( err => {
      dispatch({ type: 'error', error: err.error });
    });    
  }

  function onDeleteProduct(id) {
    fetchDeleteProduct(id)
    .then( products => {
      dispatch({ type: 'product-deleted', products });
    })
    .catch( err => {
      dispatch({ type: 'error', error: err.error });
    });
  }

  function onProfileUpdated(firstName, lastName, phone, address) {
    dispatch({
      type: 'update-profile',
      firstName,
      lastName,
      phone,
      address,
    });
  }

  useEffect(() => {
    const handlePageChange = () => {
      dispatch({ 
        type: 'set-page', page: document.location.pathname + window.location.search });
    };

    window.addEventListener('popstate', handlePageChange);

    checkSession();
    onProducts();

    return () => {
      window.removeEventListener('popstate', handlePageChange);
    };
  }, []);

  return (
    <div className="app">
      <div className="header__container">
        <Header 
          className="header"
          loginStatus={state.loginStatus}
          navigateTo={navigateTo}
          onLogout={onLogout}
          isAdmin={state.isAdmin}    
        />
      </div>
      <div className="main__area">
        <div className="car__container">
          <Cart
            loginStatus={state.loginStatus}
            isAdmin={state.isAdmin}          
            cart={state.cart}
            products={state.products}
            page={state.page}
            showCart={showCart}
            error={state.error}
            setShowCart={setShowCart} 
            onClearCartError={onClearCartError}    
            onUpdatedCart={onUpdatedCart}
            onRemoveFromCart={onRemoveFromCart}
            onCheckout={onCheckout}           
          />        
        </div>
        <div className="product__container">
          { typeof state.error === 'string'
            && !state.error.includes('cart') 
            && !showLoginForm 
            && !showRegisterForm 
            && <ErrorMessage error={state.error}/>
          }
          { state.loginStatus === LOGIN_STATUS.PENDING && <Spinner/>}
          { state.isLoading && <Spinner/>}
          { (state.page === 'products' || state.page === '/' || state.page.startsWith('/search')) && (
            <div className="main-content">
              {(() => {
                let searchProducts = state.products;
                if (state.page.startsWith('/search')) {
                  const params = new URLSearchParams(state.page.split('?')[1]);
                  const query = (params.get('query') || '').toLowerCase();
                  searchProducts = state.products.filter(p =>
                    (p.title && p.title.toLowerCase().includes(query)) ||
                    (p.author && p.author.toLowerCase().includes(query)) 
                  );
                }
                return (
                  <Products 
                    products={searchProducts}
                    isAdmin={state.isAdmin}
                    loginStatus={state.loginStatus}
                    email={state.email}
                    firstName={state.firstName}
                    navigateTo={navigateTo}
                    onAddToCart={onAddToCart}
                    onUpdatedProduct={onUpdatedProduct}
                    onAddProduct={onAddProduct}
                    onDeleteProduct={onDeleteProduct}
                  />
                );
              })()}               
            </div>
          )}
          { state.page === '/about' && <About/> }       
        </div>           
      </div>
      {showLoginForm && (
        <LoginForm
          onLogin={(email, password) => {onLogin(email, password);           
          }}
          navigateTo={ navigateTo }
          onClose={() => setShowLoginForm(false)} 
          error={state.errorType === 'login' ? state.error : ''}
        />
      )}
      {showRegisterForm && (
        <RegisterForm
          onRegister={ onRegister }           
          navigateTo={ navigateTo }
          onClose={() => setShowRegisterForm(false)}
          error={state.errorType === 'register' ? state.error : ''}
        />
      )}    
      {state.page === '/manage-account' && !showLoginForm && !showRegisterForm && <ManageAccount
        email={state.email}
        firstName={state.firstName}
        lastName={state.lastName}
        phone={state.phone}
        address={state.address}
        onProfileUpdated={onProfileUpdated}
      />} 
      <Footer/> 
    </div>
  );
}

export default App;
