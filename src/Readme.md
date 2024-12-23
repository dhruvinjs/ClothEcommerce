Seller Dashboard Application

Overview

The Seller Dashboard is a web-based application designed to help sellers efficiently manage their product inventory. It offers features like adding new products, editing existing product details, and logging out securely. The app focuses on simplicity, usability, and responsiveness, ensuring a smooth experience for sellers.

Features

1. Product Management

View Products: Displays a list of all available products with details like name, price, category, stock, and sold quantity.

Add Products: Allows sellers to add new products by providing details such as name, price, category, stock value, sold value, and an image URL.

Edit Products: Enables editing of existing product details with a simple form interface.

2. User Authentication

Logout Functionality: Securely logs the user out and clears the session data.

3. Responsive Design

Built using Tailwind CSS to ensure compatibility across devices, including desktops, tablets, and mobile phones.

Routes

1. Home Route (/)

Displays a list of products available for the seller.

2. Add Product Modal

Triggered by the "Add Product" button.

Features a form with fields for product details.

3. Edit Product Modal

Activated by the "Edit" button for each product.

Pre-fills the selected product’s information into the form for easy updates.

4. Logout Route (/auth/logout)

Performs the logout operation by sending a POST request to the backend.

Removes the userId from local storage and navigates the user to the login page.

Tech Stack

Frontend: React.js, Tailwind CSS

Backend: Node.js (API integration placeholders included)

API Management: Axios for making HTTP requests

Routing: React Router DOM

Installation and Setup

Clone the repository:

git clone https://github.com/your-repo/seller-dashboard.git
cd seller-dashboard

Install dependencies:

npm install

Start the development server:

npm start

Access the application at http://localhost:3000.

Folder Structure

/src

/components: Contains the SellerDashboard component.

/assets: Stores static files (e.g., images, icons).

/services: For managing API calls (e.g., axios configurations).

Future Enhancements

Delete Product: Add functionality to remove products from the list.

Pagination: Implement pagination for managing large product lists.

Analytics: Display sales analytics to give sellers insights into their performance.

Role Management: Support multiple user roles (e.g., admin, seller).

Contributing

Feel free to contribute to the project by opening issues or submitting pull requests. Make sure to follow the project's coding standards and include detailed explanations of your changes.

License

This project is licensed under the MIT License.

Thank you for using the Seller Dashboard Application! If you have any feedback or suggestions, please reach out.
