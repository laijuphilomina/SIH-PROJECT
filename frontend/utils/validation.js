export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

export const isValidPassword = (password) => typeof password === 'string' && password.length >= 6;

export const isNotEmpty = (value) => typeof value === 'string' && value.trim().length > 0;

export const validateLoginForm = ({ email, password }) => {
  const errors = {};
  if (!isValidEmail(email)) errors.email = 'Enter a valid email address';
  if (!isValidPassword(password)) errors.password = 'Password must be at least 6 characters';
  return errors;
};

export const validateRegisterForm = ({ name, email, password }) => {
  const errors = {};
  if (!isNotEmpty(name)) errors.name = 'Name is required';
  if (!isValidEmail(email)) errors.email = 'Enter a valid email address';
  if (!isValidPassword(password)) errors.password = 'Password must be at least 6 characters';
  return errors;
};
