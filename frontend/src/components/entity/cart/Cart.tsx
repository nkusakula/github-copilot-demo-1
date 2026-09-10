import { Link } from 'react-router-dom';
import { useTheme } from '../../../context/ThemeContext';
import { useCart } from '../../../context/CartContext';

const SHIPPING_COST = 10;

export default function Cart() {
  const { darkMode } = useTheme();
  const { items, subtotal, updateQuantity, removeFromCart } = useCart();

  const grandTotal = items.length > 0 ? subtotal + SHIPPING_COST : 0;

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-dark' : 'bg-gray-100'} pt-20 pb-16 px-4 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto flex flex-col space-y-6">
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}>Your Cart</h1>

        {items.length === 0 ? (
          <div className={`${darkMode ? 'bg-gray-800 text-light' : 'bg-white text-gray-800'} rounded-lg shadow-lg p-10 text-center transition-colors duration-300`}>
            <p className="text-xl mb-6">Your cart is empty</p>
            <Link
              to="/products"
              className="bg-primary hover:bg-accent text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Browse products
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg overflow-x-auto flex-grow transition-colors duration-300`}>
              <table className="w-full text-center">
                <thead>
                  <tr className={`${darkMode ? 'text-light border-gray-700' : 'text-gray-800 border-gray-200'} border-b`}>
                    <th className="px-4 py-3 font-bold">S. No.</th>
                    <th className="px-4 py-3 font-bold">Product Image</th>
                    <th className="px-4 py-3 font-bold">Product Name</th>
                    <th className="px-4 py-3 font-bold">Unit Price</th>
                    <th className="px-4 py-3 font-bold">Quantity</th>
                    <th className="px-4 py-3 font-bold">Total</th>
                    <th className="px-4 py-3 font-bold">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => {
                    const unitPrice = item.price * (1 - (item.discount || 0));
                    return (
                      <tr
                        key={item.productId}
                        className={`${darkMode ? 'text-light border-gray-700' : 'text-gray-800 border-gray-200'} border-b transition-colors duration-300`}
                      >
                        <td className="px-4 py-3">{index + 1}</td>
                        <td className="px-4 py-3">
                          <img
                            src={`/${item.imgName}`}
                            alt={item.name}
                            className="h-20 w-20 object-contain mx-auto"
                          />
                        </td>
                        <td className="px-4 py-3 font-semibold">{item.name}</td>
                        <td className="px-4 py-3">${unitPrice.toFixed(2)}</td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            min={1}
                            value={item.quantity}
                            onChange={e => {
                              const quantity = Number(e.target.value);
                              if (Number.isFinite(quantity) && quantity >= 1) {
                                updateQuantity(item.productId, quantity);
                              }
                            }}
                            className={`w-16 px-2 py-1 text-center rounded-md border ${darkMode ? 'bg-gray-700 text-light border-gray-600' : 'bg-white text-gray-800 border-gray-300'} focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors duration-300`}
                            aria-label={`Quantity of ${item.name}`}
                          />
                        </td>
                        <td className="px-4 py-3 font-semibold">${(unitPrice * item.quantity).toFixed(2)}</td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => removeFromCart(item.productId)}
                            className="text-primary hover:text-accent transition-colors"
                            aria-label={`Remove ${item.name} from cart`}
                          >
                            <svg className="h-5 w-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

            <div className={`${darkMode ? 'bg-gray-800 text-light' : 'bg-white text-gray-800'} rounded-lg shadow-lg p-6 lg:w-80 h-fit transition-colors duration-300`}>
              <h2 className="text-2xl font-bold text-center mb-4">Order Summary</h2>
              <div className="flex justify-between py-2">
                <span className="font-semibold">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-semibold">Shipping</span>
                <span>${SHIPPING_COST.toFixed(2)}</span>
              </div>
              <div className={`flex justify-between py-2 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <span className="font-semibold">Grand Total</span>
                <span className="text-primary font-bold">${grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
