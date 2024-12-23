import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SellerDashboard = () => {
  const [products, setProducts] = useState([
    {
      productId: '1',
      name: 'Elegant Summer Dress',
      price: 89.99,
      category: 'Dress',
      inStockValue: 50,
      soldStockValue: 10,
      img: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      productId: '2',
      name: 'Classic Denim Jacket',
      price: 69.99,
      category: 'Jacket',
      inStockValue: 30,
      soldStockValue: 5,
      img: 'https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      productId: '3',
      name: 'Cozy Knit Sweater',
      price: 59.99,
      category: 'Sweater',
      inStockValue: 40,
      soldStockValue: 8,
      img: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      productId: '4',
      name: 'Tailored Suit Set',
      price: 299.99,
      category: 'Suit',
      inStockValue: 20,
      soldStockValue: 2,
      img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      productId: '5',
      name: 'Bohemian Maxi Skirt',
      price: 49.99,
      category: 'Skirt',
      inStockValue: 35,
      soldStockValue: 7,
      img: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      productId: '6',
      name: 'Leather Biker Jacket',
      price: 129.99,
      category: 'Jacket',
      inStockValue: 25,
      soldStockValue: 3,
      img: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
  ]);
    const [showAddForm, setShowAddForm] = useState(false);
  const [addFormData, setAddFormData] = useState({
    productId: '',
    name: '',
    price: 0,
    category: '',
    inStockValue: 0,
    soldStockValue: 0,
    img: ''
  });
  const handleAddClick = () => {
    setShowAddForm(true);
    setAddFormData({
      productId: Date.now().toString(),
      name: '',
      price: 0,
      category: '',
      inStockValue: 0,
      soldStockValue: 0,
      img: ''
    });
  };
  const [loading, setLoading] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/auth/logout', {}, { withCredentials: true });
      localStorage.removeItem('userId');
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleEditClick = (product) => {
    setEditFormData(product);
    setShowEditForm(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: name === 'price' || name === 'inStockValue' || name === 'soldStockValue' ? parseFloat(value) : value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simulating API call
      // const res = await axios.put('http://localhost:5000/instock-update', editFormData);
      // if (res.data.success) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.productId === editFormData.productId ? editFormData : product
          )
        );
        setShowEditForm(false);
     
    } catch (error) {
      console.error('Error updating product:', error.message);
    }
  };
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simulating API call
      // const res = await axios.post('http://localhost:5000/products', addFormData);
      // if (res.data.success) {
        setProducts((prevProducts) => [...prevProducts, addFormData]);
        setShowAddForm(false);
      // } else {
      //   console.error('Error adding product:', res.data.message);
      // }
    } catch (error) {
      console.error('Error adding product:', error.message);
    }
  };
  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setAddFormData((prevData) => ({
      ...prevData,
      [name]: name === 'price' || name === 'inStockValue' || name === 'soldStockValue' ? parseFloat(value) : value,
    }));
  };

  return (
    <>
    <div className="min-h-screen bg-[#f5e6d3]">
      <header className="bg-[#8b7d6b] text-white py-4 shadow-md">
        <div className="container mx-auto flex flex-wrap justify-between items-center px-4">
          <h1 className="text-xl font-bold">Seller Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-[#d3c4b3] text-[#5c4f3d] py-2 px-4 rounded hover:bg-[#e8d9c5] transition duration-300"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <section>
          <h2 className="text-2xl font-semibold text-[#5c4f3d] mb-4">Product List</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <table className="min-w-full table-auto">
                <thead className="bg-[#8b7d6b] text-white">
                  <tr>
                    <th className="px-4 py-2 text-left">Product</th>
                    <th className="px-4 py-2 text-left">Price</th>
                    <th className="px-4 py-2 text-left">Category</th>
                    <th className="px-4 py-2 text-left">In Stock</th>
                    <th className="px-4 py-2 text-left">Sold</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.productId} className="border-b border-[#e8d9c5]">
                      <td className="px-4 py-2 flex items-center">
                        <img src={product.img} alt={product.name} className="w-10 h-10 object-cover rounded-full mr-2" />
                        {product.name}
                      </td>
                      <td className="px-4 py-2">${product.price.toFixed(2)}</td>
                      <td className="px-4 py-2">{product.category}</td>
                      <td className="px-4 py-2">{product.inStockValue}</td>
                      <td className="px-4 py-2">{product.soldStockValue}</td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => handleEditClick(product)}
                          className="text-[#8b7d6b] hover:underline"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
      <button
            onClick={handleAddClick}
            className="bg-[#8b7d6b] text-white py-2 px-4 rounded hover:bg-[#5c4f3d] transition duration-300 mb-4"
          >
            Add Product
          </button>
      {showEditForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold text-[#8b7d6b] mb-4">Edit Product</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#5c4f3d]">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={editFormData.name}
                  onChange={handleEditInputChange}
                  className="mt-1 block w-full border-[#d3c4b3] rounded-md shadow-sm focus:border-[#8b7d6b] focus:ring-[#8b7d6b]"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#5c4f3d]">Price</label>
                <input
                  type="number"
                  name="price"
                  value={editFormData.price}
                  onChange={handleEditInputChange}
                  className="mt-1 block w-full border-[#d3c4b3] rounded-md shadow-sm focus:border-[#8b7d6b] focus:ring-[#8b7d6b]"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#5c4f3d]">Category</label>
                <input
                  type="text"
                  name="category"
                  value={editFormData.category}
                  onChange={handleEditInputChange}
                  className="mt-1 block w-full border-[#d3c4b3] rounded-md shadow-sm focus:border-[#8b7d6b] focus:ring-[#8b7d6b]"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#5c4f3d]">In Stock Value</label>
                <input
                  type="number"
                  name="inStockValue"
                  value={editFormData.inStockValue}
                  onChange={handleEditInputChange}
                  className="mt-1 block w-full border-[#d3c4b3] rounded-md shadow-sm focus:border-[#8b7d6b] focus:ring-[#8b7d6b]"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#5c4f3d]">Sold Stock Value</label>
                <input
                  type="number"
                  name="soldStockValue"
                  value={editFormData.soldStockValue}
                  onChange={handleEditInputChange}
                  className="mt-1 block w-full border-[#d3c4b3] rounded-md shadow-sm focus:border-[#8b7d6b] focus:ring-[#8b7d6b]"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowEditForm(false)}
                  className="bg-[#d3c4b3] text-[#5c4f3d] py-2 px-4 rounded hover:bg-[#e8d9c5] transition duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#8b7d6b] text-white py-2 px-4 rounded hover:bg-[#5c4f3d] transition duration-300"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
       {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold text-[#8b7d6b] mb-4">Add Product</h2>
            <form onSubmit={handleAddSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#5c4f3d]">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={addFormData.name}
                  onChange={handleAddInputChange}
                  className="mt-1 block w-full border-[#d3c4b3] rounded-md shadow-sm focus:border-[#8b7d6b] focus:ring-[#8b7d6b]"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#5c4f3d]">Price</label>
                <input
                  type="number"
                  name="price"
                  value={addFormData.price}
                  onChange={handleAddInputChange}
                  className="mt-1 block w-full border-[#d3c4b3] rounded-md shadow-sm focus:border-[#8b7d6b] focus:ring-[#8b7d6b]"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#5c4f3d]">Category</label>
                <input
                  type="text"
                  name="category"
                  value={addFormData.category}
                  onChange={handleAddInputChange}
                  className="mt-1 block w-full border-[#d3c4b3] rounded-md shadow-sm focus:border-[#8b7d6b] focus:ring-[#8b7d6b]"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#5c4f3d]">In Stock Value</label>
                <input
                  type="number"
                  name="inStockValue"
                  value={addFormData.inStockValue}
                  onChange={handleAddInputChange}
                  className="mt-1 block w-full border-[#d3c4b3] rounded-md shadow-sm focus:border-[#8b7d6b] focus:ring-[#8b7d6b]"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#5c4f3d]">Sold Stock Value</label>
                <input
                  type="number"
                  name="soldStockValue"
                  value={addFormData.soldStockValue}
                  onChange={handleAddInputChange}
                  className="mt-1 block w-full border-[#d3c4b3] rounded-md shadow-sm focus:border-[#8b7d6b] focus:ring-[#8b7d6b]"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#5c4f3d]">Image URL</label>
                <input
                  type="text"
                  name="img"
                  value={addFormData.img}
                  onChange={handleAddInputChange}
                  className="mt-1 block w-full border-[#d3c4b3] rounded-md shadow-sm focus:border-[#8b7d6b] focus:ring-[#8b7d6b]"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="bg-[#d3c4b3] text-[#5c4f3d] py-2 px-4 rounded hover:bg-[#e8d9c5] transition duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#8b7d6b] text-white py-2 px-4 rounded hover:bg-[#5c4f3d] transition duration-300"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
    </>
  );
};

export default SellerDashboard;

