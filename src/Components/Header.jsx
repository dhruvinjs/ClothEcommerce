import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X, User, Heart, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AuthModal from './AuthModal';

const Header = ({ cart }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const navigate = useNavigate();

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
    <header className="bg-[#fde9e8] shadow-md fixed top-0 left-0 w-full z-50">
    <div className="container mx-auto px-4 py-4 flex items-center justify-between">
      <div className="flex items-center">
        <button
          className="text-[#d49894] lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <h1
          className="text-2xl font-bold text-[#d49894] cursor-pointer ml-2 lg:ml-0"
          onClick={() => navigate('/')}
        >
          MyTailorZone By Sahiba
        </h1>
      </div>
      <nav className={`${isMenuOpen ? 'block' : 'hidden'} lg:block`}>
        <ul className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-6 mt-4 lg:mt-0">
          <li>
            <a href="/" className="text-[#a96c69] hover:text-[#d49894]">
              Home
            </a>
          </li>
          <li className="relative">
            <button
              className="text-[#a96c69] hover:text-[#d49894] flex items-center"
              onClick={() => setIsCollectionsOpen(!isCollectionsOpen)}
            >
              Collections <ChevronDown size={16} className="ml-1" />
            </button>
            {isCollectionsOpen && (
              <ul className="absolute left-0 mt-2 w-48 bg-white border border-[#f3c5c4] rounded-md shadow-lg">
                <li>
                  <a
                
                    className="block px-4 py-2 text-[#a96c69] hover:bg-[#fde9e8]"
                  >
                    Dress
                  </a>
                </li>
                <li>
                  <a
                 
                    className="block px-4 py-2 text-[#a96c69] hover:bg-[#fde9e8]"
                  >
                    Casual
                  </a>
                </li>
                <li>
                  <a
                   
                    className="block px-4 py-2 text-[#a96c69] hover:bg-[#fde9e8]"
                  >
                    Formal
                  </a>
                </li>
              </ul>
            )}
          </li>
          <li>
            <a  className="text-[#a96c69] hover:text-[#d49894]">
              About
            </a>
          </li>
        </ul>
      </nav>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search Products"
            className="w-48 p-2 pl-10 rounded-md border border-[#f3c5c4] bg-white text-[#a96c69] focus:ring-2 focus:ring-[#d49894]"
          />
          <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#d49894]" />
        </div>
        <User
          className="w-6 h-6 text-[#d49894] cursor-pointer"
          onClick={() => setIsAuthModalOpen(true)}
        />
        <Heart className="w-6 h-6 text-[#d49894]" />
        <div className="relative">
          <ShoppingBag
            className="w-6 h-6 text-[#d49894] cursor-pointer"
            onClick={() => navigate('/cart')}
          />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#d49894] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>
        <button
          onClick={() => navigate('/seller/auth')}
          className="bg-[#d49894] text-white py-2 px-4 rounded hover:bg-[#a96c69] transition duration-300"
        >
          Seller Login
        </button>
      </div>
    </div>
    <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
  </header>
</>  
  );
};

export default Header;

