import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const deleteItem = (productId) => {
    setCart(prevCart => prevCart.filter(item => item._id !== productId));
    setMessage('Item removed from cart.');
  };

  const updateQuantity = (productId, newQuantity) => {
    setCart(prevCart => prevCart.map(item => 
      item._id === productId ? { ...item, quantity: Math.max(1, newQuantity) } : item
    ));
  };

  const placeOrder = async () => {
    // Implement your order placement logic here
    setMessage('Order placed successfully!');
    setCart([]);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="min-h-screen bg-[#fbd7d7] text-[#5c4f3d]">
    <Header cart={cart} />
    <main className="container mx-auto my-10 px-4 pt-32">
      <h1 className="text-4xl font-bold text-[#e4a3a3] mb-6">Your Cart</h1>
  
      {message && (
        <div className="mb-4 p-2 bg-[#e4a3a3] text-white rounded-md">
          {message}
        </div>
      )}
  
      {loading ? (
        <div className="text-center">Loading cart...</div>
      ) : cart.length === 0 ? (
        <div className="text-center">Your cart is empty.</div>
      ) : (
        <div className="bg-white rounded-md overflow-hidden shadow-lg">
          {cart.map((item) => (
            <div key={item._id} className="flex items-center justify-between p-4 border-b border-[#f8d1d1]">
              <div className="flex items-center space-x-4">
                <img src={item.img} alt={item.name} className="w-16 h-16 object-cover rounded" />
                <div>
                  <h3 className="text-xl font-semibold text-[#e4a3a3]">{item.name}</h3>
                  <p className="text-[#5c4f3d]">Price: ${item.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    className="px-2 py-1 bg-[#f8d1d1] text-[#5c4f3d] rounded-l"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                    className="w-12 text-center border-t border-b border-[#f8d1d1]"
                  />
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="px-2 py-1 bg-[#f8d1d1] text-[#5c4f3d] rounded-r"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => deleteItem(item._id)}
                  className="px-3 py-1 bg-[#e4a3a3] text-white rounded-md hover:bg-[#f5a1a1] transition duration-300"
                  aria-label={`Remove ${item.name} from cart`}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="p-4 bg-[#f8f8f8]">
            <p className="text-2xl font-bold text-[#f8b6b6]">Total: ${totalPrice.toFixed(2)}</p>
          </div>
        </div>
      )}
  
      <div className="mt-8 bg-white rounded-md p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-[#e4a3a3] mb-4">Order Details</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-lg font-semibold text-[#e4a3a3]">Name:</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 mt-2 border rounded-md bg-[#fbd7d7] text-[#5c4f3d] border-[#f8d1d1] focus:ring-2 focus:ring-[#e4a3a3] focus:border-transparent"
              placeholder="Enter your Name"
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-lg font-semibold text-[#e4a3a3]">Delivery Address:</label>
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2 mt-2 border rounded-md bg-[#fbd7d7] text-[#5c4f3d] border-[#f8d1d1] focus:ring-2 focus:ring-[#e4a3a3] focus:border-transparent"
              placeholder="Enter your delivery address"
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-lg font-semibold text-[#e4a3a3]">Delivery Date:</label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 mt-2 border rounded-md bg-[#fbd7d7] text-[#5c4f3d] border-[#f8d1d1] focus:ring-2 focus:ring-[#e4a3a3] focus:border-transparent"
            />
          </div>
        </div>
      </div>
  
      <div className="mt-8 text-center">
        <button
          onClick={placeOrder}
          className="px-8 py-3 bg-[#e4a3a3] text-white rounded-md hover:bg-[#f5a1a1] transition duration-300 font-bold text-lg"
          disabled={!address || !date || !name || cart.length === 0}
        >
          Place Order
        </button>
      </div>
    </main>
    <Footer />
  </div>
  );
}

export default Cart;

