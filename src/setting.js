export const LOGIN_STATUS = {
  PENDING: 'pending',
  NOT_LOGGED_IN: 'not-logged-in',
  IS_LOGGED_IN: 'logged-in',
};

export const SERVER = {
  AUTH_INSUFFICIENT: 'auth-insufficient',
  AUTH_MISSING: 'auth-missing',
  USER_EXISTS: 'user-exists',
  PRODUCT_NOT_FOUND: 'product-not-found',
  CART_EMPTY: 'cart-empty',
  INVALID_EMAIL: 'invalid-email',
  PASSWORD_WRONG: 'password-wrong',
  INVALID_CURRENT_PASSWORD: 'invalid-current-password',
};

export const CLIENT = {
  NETWORK_ERROR: 'network-error',
  NO_SESSION: 'no-session',
};

export const FORM = {
  REQUIRED_AREA: 'rquired-area',
  PRICE_ERROR: 'price-error',
  REQUIRED_INPUT: 'required-input',
  REQUIRED_FILL_OUT: 'required-fill-out',
  EMAIL_INVALID: 'required-email',
  EMAIL_MISMATCHING: 'email-mismatching',
  PASSWORD_MISMATCHING: 'password-mismatch',
  PASSWORD_TOO_SHORT: 'password-too-short',
  PASSWORD_INVALID: 'password-invalid',
  IMAGE_REQUIRED: 'image-required',
  LOADING_FAILED: 'loading-failed',
}

export const ERRORLIST = {
  [CLIENT.NETWORK_ERROR]: 'Failed to connect. Please try again later.',
  [SERVER.AUTH_INSUFFICIENT]: 'This email or password is not match any records. Please try again.',
  [SERVER.AUTH_MISSING]: 'New to BookSpace? Please create an account first.',
  [SERVER.PASSWORD_WRONG]: 'Incorrect password. Please try again.',
  [SERVER.USER_EXISTS]: 'This email already registered. Please register with another email.',
  [SERVER.PRODUCT_NOT_FOUND]: 'Sorry, this product is no longer available.',
  [SERVER.CART_EMPTY]: 'Your cart is empty. please add some products to your cart.',
  [SERVER.INVALID_CURRENT_PASSWORD]: 'The current password you entered is incorrect. Please try again.',
  [FORM.PRICE_ERROR]: 'Price must be greater than 1.00.',
  [FORM.REQUIRED_AREA]: 'Please fill in all required fields.',
  [FORM.REQUIRED_INPUT]: 'Please enter a message.',
  [FORM.REQUIRED_FILL_OUT]: 'Please fill out all the required fields',
  [FORM.EMAIL_INVALID]: 'Please enter a valid email address. It must be letters, numbers, or underscores.',
  [FORM.EMAIL_MISMATCHING]: 'Email addresses do not match. Please try again.',
  [FORM.PASSWORD_MISMATCHING]: 'Passwords do not match. Please try again.',
  [FORM.PASSWORD_TOO_SHORT]: 'Password must be at least 6 characters long.',
  [FORM.PASSWORD_INVALID]: 'Password must be 8-16 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character.',
  [FORM.IMAGE_REQUIRED]: 'Please upload an image.',
  [FORM.LOADING_FAILED]: 'Failed to load orders. Please try again.',
};


