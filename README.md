# E-Commerce Shop

The E-Commerce Shop is a full-featured online shopping platform built with React TypeScript and Vite. The platform provides users with a streamlined experience for browsing products, adding items to a shopping cart, and completing purchases through a secure checkout process.

## Features

- User Authentication: Sign-up, login.
- Product Browsing: Browse through product items.
- Shopping Cart: Add, remove, and update items in the cart.
- Checkout System: Payment processing.
- Order: Users can view order history.
- Security: Secure user data handling with JWT-based authentication and form validation.
- Responsive UI: Optimized for mobile and desktop experiences.

## Technology Stack

### Frontend

- React (TypeScript) - A powerful JavaScript library for building user interfaces with type safety.
- Vite - A blazing-fast build tool for modern web projects.
- Material-UI (MUI) - A popular UI component library for building responsive and accessible designs.

### Backend

- Node.js - JavaScript runtime for server-side development.
- Express - Web application framework for building the API.
- MongoDB - NoSQL database for storing product and user data.
- JWT - For secure user authentication.

## Installation

Install dependencies:

```bash
npm i
```

Run the server:

### `npm run dev`

The app will be available at `Listening on: http://localhost:5173`.

## Configuration

Before running the project, you'll need to create a .env file in the root directory to store environment-specific variables:

```bash
JWT_SECRET=""
DATABASE_URL=""
```