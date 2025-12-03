ShoppingCart – MERN E-Commerce Application
A full-stack MERN-based e-commerce application with user authentication, product catalog, category & price filters, cart management, persistent sessions, and secure password change via modal UI.
This project demonstrates real-world e-commerce features such as dynamic stock handling, item-wise cart quantity updates, and protected routes using JWT stored in HTTP-only cookies.

***** Features *****

1 . Authentication:

User registration & login ,
JWT-based authentication (HTTP-only cookies) ,
Protected routes (backend + frontend) ,
Change password popup (Bootstrap modal) ,
Password hashing with bcrypt

2 . Product Management

Paginated product listing ,
Category filtering ,
Min/max price filters ,
Responsive product grid ,
Product images & details

3 . Cart System

Add to cart ,
Increase quantity ,
Decrease quantity ,
Remove item from cart ,
Cart total calculation

4 . Frontend (React)

Global state via Context API ,
Reusable components (Navbar, Cards, Filters) ,
Toast notifications ,
Responsive design (Bootstrap)

5 . Backend (Node + Express)

Schema,Controller and route method(MVC) ,
MongoDB models using Mongoose ,
Cart aggregation with populate ,
Secure password update flow ,
Error handling & validation

***** Tech Stack *****
1 . Frontend :
React ,
React Router ,
Context API ,
Axios ,
Bootstrap 5 ,
React Toastify

2 . Backend :
Node.js ,
Express.js ,
MongoDB + Mongoose ,
JSON Web Token (JWT) ,
Bcrypt

***** Installation & setup *****

clone the repo : git clone https://github.com/ShreyLukka/ShoppingCart-MERN-stack.git ,
backend : cd backend -> npm install -> nodemon server.js ,
sample data : use backend/sample-data/e-comm.products.json and import it to in your local mongodb or online mongodb to include sample data (Important - otherwise you will don't see any products) ,
frontend : cd frontend -> npm install -> npm run dev ,
create .env :
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret
