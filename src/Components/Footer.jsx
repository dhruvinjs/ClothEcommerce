import React, { useState } from 'react';


const Footer = () => {
    const [openPopup, setOpenPopUp] = useState(false);
  
    const handleNewsLetterData = (e) => {
      e.preventDefault();
      const target = e.target;
      const formData = new FormData(target);
      const clientEmail = formData.get('newsletter_email');
      setOpenPopUp(true);
      target.reset();
      if (openPopup) {
        setTimeout(() => {
          setOpenPopUp(false);
        }, 2000);
      }
    };
  
    return (
      <>
        {/* Newsletter Section */}
        <section className="py-20 px-4 bg-[#f9e1db] text-[#7f4f63]">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl font-serif mb-4 text-[#B76E79]">Stay Connected</h2>
            <p className="mb-8 text-[#7f4f63]">
              Subscribe to our newsletter for exclusive offers and updates.
            </p>
            <form onSubmit={handleNewsLetterData} className="flex gap-2">
              <input
                type="email"
                name="newsletter_email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full border border-[#B76E79] focus:outline-none focus:ring-2 focus:ring-[#7f4f63] bg-white text-[#5c4f3d]"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#B76E79] text-white rounded-full hover:bg-[#7f4f3d] transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
  
        {/* Footer */}
        <footer className="bg-[#f1e0da] py-12 px-4 text-[#7f4f63]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-serif text-lg mb-4 text-[#B76E79]">Quick Links</h3>
              <ul className="space-y-2">
                {['Shop', 'About', 'Contact'].map((item) => (
                  <li key={item}>
                    <div className="text-[#7f4f63] hover:text-[#B76E79] cursor-pointer transition-colors">
                      {item}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-lg mb-4 text-[#B76E79]">Connect</h3>
              <ul className="space-y-2">
                {['Facebook', 'Instagram', 'Pinterest'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-[#7f4f3d] hover:text-[#B76E79] transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-lg mb-4 text-[#B76E79]">Contact</h3>
              <p className="text-[#7f4f3d]">
                Email: hello@tailorzone.com<br />
                Phone: (555) 123-4567
              </p>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-[#B76E79] text-center text-[#7f4f3d]">
            <p>&copy; 2024 MytailorZone by Sahiba. All rights reserved.</p>
          </div>
        </footer>
  
       
        {/* Popup for newsletter subscription */}
        {openPopup && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-[#f9e1db] text-[#7f4f3d] p-6 rounded-lg shadow-lg">
              <p className="text-lg font-semibold">Thank you for subscribing!</p>
            </div>
          </div>
        )}
      </>
    );
  };
  
  export default Footer;
  