export const generateOrderId = () => {
  return 'ORDER-' + Math.floor(Math.random() * 1000);
};