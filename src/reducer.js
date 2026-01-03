import {
  LOGIN_STATUS,
  SERVER,
  CLIENT,
} from './setting';

export const initialState = {
  error: '',
  email: '',
  isAdmin: false,
  firstName: '',
  lastName: '',
  phone: '',
  address: '',
  loginStatus: LOGIN_STATUS.PENDING,
  products:[],
  cart: {},
  isLoading: false,
  page: document.location.pathname || '/',
};

function reducer(state, action) {
  switch(action.type) {      
    case 'register':
      return {
        ...state,
        error: '',
        email: action.email,
        isAdmin: false,
        loginStatus: LOGIN_STATUS.IS_LOGGED_IN,
        isLoading: false,               
      };
    case 'login':
      return {
        ...state,
        error: '',
        email: action.email,
        firstName: action.firstName,
        lastName: action.lastName,
        phone: action.phone,
        address: action.address,
        isAdmin: action.isAdmin,
        loginStatus: LOGIN_STATUS.IS_LOGGED_IN,
        isLoading: false,
      };
    case 'loading':
      return {
        ...state,
        isLoading: true,
      };            
    case 'set-page':
      return {
        ...state,
        page: action.page,
      };             
    case 'products-loaded':
      return {
        ...state,
        error: '',
        products: action.products,
        isLoading: false,
      };
    case 'product-deleted':
      return {
        ...state,
        products: action.products,
      };            
    case 'cart-loaded':
      return {
        ...state,
        error: '',
        cart: action.cart.cart || {},
      };
    case 'cart-checkout':
      return {
        ...state,
        error: '',
        cart: {},
        isLoading: false,
      };                         
    case 'logout':
      return {
        ...state,
        error: '',
        email: '',
        isAdmin: false,
        loginStatus: LOGIN_STATUS.NOT_LOGGED_IN,
        isLoading: false,
      };
    case 'error':
      return {
        ...state,
        error: action.error,
        errorType: action.errorType || '',
        isLoading: false, 
      };
    case 'clear-error':
      return {
        ...state,
        error: '',
      };   
    case 'update-profile': 
      return {
        ...state,
        firstName: action.firstName,
        lastName: action.lastName,
        phone: action.phone,
        address: action.address,
      }           
            
    default: 
      throw new Error(`Unknown action type: detail:${action.type}`);
  }
}

export default reducer;