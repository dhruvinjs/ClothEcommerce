import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import Footer from './Footer';
import Header from './Header';

function LandingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  useEffect(() => {
    // Simulating API call with dummy data
    const dummyProducts = [
      {
        _id: '1',
        name: 'Elegant Summer Dress',
        price: 89.99,
        rating: 4.5,
        img: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
      },
      {
        _id: '2',
        name: 'Classic Denim Jacket',
        price: 69.99,
        rating: 4.2,
        img: 'https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
      },
      {
        _id: '3',
        name: 'Cozy Knit Sweater',
        price: 59.99,
        rating: 4.7,
        img: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
      },
      {
        _id: '4',
        name: 'Tailored Suit Set',
        price: 299.99,
        rating: 4.8,
        img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
      },
      {
        _id: '5',
        name: 'Bohemian Maxi Skirt',
        price: 49.99,
        rating: 4.3,
        img: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
      },
      {
        _id: '6',
        name: 'Leather Biker Jacket',
        price: 129.99,
        rating: 4.6,
        img: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
      },
    ];

    setProducts(dummyProducts);
    setLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback((product) => {
  setCart((prevCart) => {
    const existingItem = prevCart.find((item) => item._id === product._id);
    if (existingItem) {
      return prevCart.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      return [...prevCart, { ...product, quantity: 1 }];
    }
  });
  setMessage(product._id); // Set the product ID as the message
  setTimeout(() => setMessage(''), 5000);
}, []);


  return (
    <>
      <Header cart={cart} />
      <main className="pt-20 bg-pink-50">
        <section>
          <Slider {...sliderSettings}>
            <div>
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Fashion Collection"
                className="w-full h-96 object-cover"
              />
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Summer Collection"
                className="w-full h-96 object-cover"
              />
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Autumn Collection"
                className="w-full h-96 object-cover"
              />
            </div>
          </Slider>
        </section>

        <section className="container mx-auto my-10 px-6">
          <h2 className="text-3xl font-bold text-pink-800 mb-6">Featured Products</h2>

          {message && (
            <div className="mb-4 p-2 bg-green-500 text-white rounded-md">
              {message}
            </div>
          )}

          {loading ? (
            <div className="text-center text-pink-600">Loading products...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-pink-700">{product.name}</h3>
                    <p className="text-pink-600">${product.price.toFixed(2)}</p>
                    <p className="text-pink-600">Rating: {product.rating} ⭐</p>
                    <button
                      onClick={() => addToCart(product)}
                      className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors duration-300"
                    >
                      Add to Cart
                    </button>
                    {message && (
                      <p className="mt-2 text-green-500 text-sm">
                      {message === product._id && 'Product added to cart successfully!'}
                        </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
        <Footer />
      </main>
    </>
  );
}

export default LandingPage;

