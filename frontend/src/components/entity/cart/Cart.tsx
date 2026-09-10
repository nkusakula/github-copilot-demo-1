import { useTheme } from '../../../context/ThemeContext';
import { useCart } from '../../../context/CartContext';
import { getEffectiveUnitPrice } from '../../../types/product';

export default function Cart() {
  const { darkMode } = useTheme();
  const { items, updateQuantity, removeFromCart } = useCart();

  const subtotal = items.reduce(
    (sum, item) => sum + getEffectiveUnitPrice(item.product) * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-dark' : 'bg-gray-100'} pt-20 px-4 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto">
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-light' : 'text-gray-800'} mb-6 transition-colors duration-300`}>Your Cart</h1>
          <div className={`${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600'} rounded-lg shadow-lg p-12 text-center transition-colors duration-300`}>
            <p className="text-xl" id="empty-cart-message">Your cart is empty</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-dark' : 'bg-gray-100'} pt-20 pb-16 px-4 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto">
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-light' : 'text-gray-800'} mb-6 transition-colors duration-300`}>Your Cart</h1>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className={`flex-grow ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg overflow-hidden transition-colors duration-300`}>
            <table className="w-full text-left">
              <thead>
                <tr className={`${darkMode ? 'text-gray-300 border-gray-700' : 'text-gray-600 border-gray-200'} border-b transition-colors duration-300`}>
                  <th className="p-4">Product</th>
                  <th className="p-4">Unit Price</th>
                  <th className="p-4">Quantity</th>
                  <th className="p-4">Total</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                {items.map(({ product, quantity }) => {
                  const unitPrice = getEffectiveUnitPrice(product);
                  return (
                    <tr
                      key={product.productId}
                      className={`${darkMode ? 'border-gray-700' : 'border-gray-200'} border-b last:border-b-0 transition-colors duration-300`}
                    >
                      <td className="p-4">
                        <div className="flex items-center space-x-4">
                          <div className={`w-16 h-16 flex-shrink-0 rounded-md ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} transition-colors duration-300`}>
                            <img
                              src={`/${product.imgName}`}
                              alt={product.name}
                              className="w-full h-full object-contain p-1"
                            />
                          </div>
                          <span className={`font-semibold ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}>
                            {product.name}
                          </span>
                        </div>
                      </td>
                      <td className={`p-4 ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}>
                        ${unitPrice.toFixed(2)}
                      </td>
                      <td className="p-4">
                        <div className={`inline-flex items-center space-x-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg p-1 transition-colors duration-300`}>
                          <button
                            onClick={() => updateQuantity(product.productId, quantity - 1)}
                            className={`w-8 h-8 flex items-center justify-center ${darkMode ? 'text-light' : 'text-gray-700'} hover:text-primary transition-colors duration-300`}
                            aria-label={`Decrease quantity of ${product.name}`}
                            id={`cart-decrease-qty-${product.productId}`}
                          >
                            <span aria-hidden="true">-</span>
                          </button>
                          <span
                            className={`${darkMode ? 'text-light' : 'text-gray-800'} min-w-[2rem] text-center transition-colors duration-300`}
                            aria-label={`Quantity of ${product.name}`}
                            id={`cart-qty-${product.productId}`}
                          >
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(product.productId, quantity + 1)}
                            className={`w-8 h-8 flex items-center justify-center ${darkMode ? 'text-light' : 'text-gray-700'} hover:text-primary transition-colors duration-300`}
                            aria-label={`Increase quantity of ${product.name}`}
                            id={`cart-increase-qty-${product.productId}`}
                          >
                            <span aria-hidden="true">+</span>
                          </button>
                        </div>
                      </td>
                      <td className={`p-4 font-semibold ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}>
                        ${(unitPrice * quantity).toFixed(2)}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => removeFromCart(product.productId)}
                          className={`${darkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-500 hover:text-red-500'} transition-colors duration-300`}
                          aria-label={`Remove ${product.name} from cart`}
                          id={`remove-from-cart-${product.productId}`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className={`w-full lg:w-80 flex-shrink-0 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 h-fit transition-colors duration-300`}>
            <h2 className={`text-xl font-bold ${darkMode ? 'text-light' : 'text-gray-800'} mb-4 transition-colors duration-300`}>Order Summary</h2>
            <div className={`flex justify-between py-3 ${darkMode ? 'text-gray-300 border-gray-700' : 'text-gray-600 border-gray-200'} border-b transition-colors duration-300`}>
              <span>Subtotal</span>
              <span id="cart-subtotal">${subtotal.toFixed(2)}</span>
            </div>
            <div className={`flex justify-between py-3 font-bold text-lg ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}>
              <span>Total</span>
              <span id="cart-total">${subtotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
