export const isNotEmpty = (value: string) => {
  return value.trim() !== '';
};

export const isEmailValid = (value: string) => {
  return isNotEmpty(value) && value.includes('@');
};
