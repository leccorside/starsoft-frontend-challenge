import cartReducer, { addItem, removeItem, toggleCart, updateQuantity } from '@/store/slices/cartSlice';

describe('Cart Reducer', () => {
  const initialState = {
    items: [],
    isOpen: false,
  };

  it('should handle initial state', () => {
    expect(cartReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle addItem', () => {
    const newItem = { id: 1, name: 'Item 1', price: 10, image: 'img', quantity: 1 };
    const actual = cartReducer(initialState, addItem(newItem));
    expect(actual.items).toHaveLength(1);
    expect(actual.items[0]).toEqual(newItem);
  });

  it('should handle toggleCart', () => {
    const actual = cartReducer(initialState, toggleCart());
    expect(actual.isOpen).toBe(true);
  });

  it('should handle removeItem', () => {
    const stateWithItem = {
      items: [{ id: 1, name: 'Item 1', price: 10, image: 'img', quantity: 1 }],
      isOpen: false,
    };
    const actual = cartReducer(stateWithItem, removeItem(1));
    expect(actual.items).toHaveLength(0);
  });

  it('should handle updateQuantity', () => {
    const stateWithItem = {
      items: [{ id: 1, name: 'Item 1', price: 10, image: 'img', quantity: 1 }],
      isOpen: false,
    };
    const actual = cartReducer(stateWithItem, updateQuantity({ id: 1, quantity: 5 }));
    expect(actual.items[0].quantity).toBe(5);
  });
});
