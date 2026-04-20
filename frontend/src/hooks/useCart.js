import { useCartStore } from '../store/cartStore';

export const useCart = () => {
  const cart = useCartStore();

  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return {
    items: cart.items,
    itemCount,
    total: total.toFixed(2),
    addItem: cart.addItem,
    removeItem: cart.removeItem,
    updateQuantity: cart.updateQuantity,
    clearCart: cart.clearCart,
  };
};
