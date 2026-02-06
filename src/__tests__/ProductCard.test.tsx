import { renderWithProviders } from '@/utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { ProductCard } from '@/components/ProductCard';

// Mock Next.js Image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

const mockProduct = {
  id: 1,
  name: 'Test NFT',
  price: 10.5,
  image: '/test-image.png',
  description: 'Test description for the product card.',
  createdAt: '2024-01-01',
};

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Test NFT')).toBeInTheDocument();
    expect(screen.getByText('10 ETH')).toBeInTheDocument(); // Math.floor(10.5)
    expect(screen.getByText('Test description for the product card.')).toBeInTheDocument();
  });

  it('adds item to cart when clicking buy button', () => {
    const { store } = renderWithProviders(<ProductCard product={mockProduct} />);

    const buyButton = screen.getByText('Comprar');
    fireEvent.click(buyButton);

    const state = store.getState();
    expect(state.cart.items).toHaveLength(1);
    expect(state.cart.items[0].id).toBe(1);
  });

  it('changes button text and disables it when item is in cart', () => {
    renderWithProviders(<ProductCard product={mockProduct} />, {
      preloadedState: {
        cart: {
          items: [{ ...mockProduct, quantity: 1 }],
          isOpen: false,
        },
      },
    });

    const addedButton = screen.getByText('Adicionado ao Carrinho');
    expect(addedButton).toBeInTheDocument();
    expect(addedButton).toBeDisabled();
  });
});
