# Ecommerce-VShop-Cross-Platform

## Overview

Ecommerce-VShop-Cross-Platform is a full-stack multi-vendor e-commerce platform developed using Spring Boot, React, React Native, and MySQL. The system delivers a seamless online shopping experience across web and mobile applications, supporting customers, sellers, and administrators through a secure, scalable, and modern architecture.

## Technology Stack

### Backend

- Java
- Spring Boot
- Spring Security
- JWT Authentication
- Java Mail Sender
- MySQL
- RESTful API

### Frontend

- React
- React Native
- TypeScript
- Redux Toolkit
- Material UI (MUI)
- Tailwind CSS
- React Router DOM
- Axios
- Formik
- Yup
- React Chart

### Payment Integration

- VNPay
- MoMo
- ZaloPay
- Stripe
- Cash on Delivery (COD)

## Core Features

### Customer Features

- User registration and authentication
- Product browsing and filtering
- Product search functionality
- Product detail viewing
- Shopping cart management
- Wishlist management
- Coupon application
- Secure checkout and payment
- Order tracking and cancellation
- Product reviews and ratings
- Profile management
- Chatbot support for customer inquiries

### Seller Features

- Seller dashboard
- Revenue and sales analytics
- Product management (Create, Read, Update, Delete)
- Inventory management
- Order management
- Store profile management

### Admin Features

- Admin dashboard
- User management
- Seller approval and management
- Product management
- Order management
- Coupon management
- Homepage content management
- Promotional deal management
- Platform statistics and reporting

## System Architecture

````text
Client Applications
├── React Web Application
└── React Native Mobile Application

            │
            ▼

      RESTful APIs

            │
            ▼

 Spring Boot Backend

            │
            ▼

      MySQL Database

## Installation

### Backend

```bash
cd backend
mvn clean install
mvn spring-boot:run
````

### Frontend Web

```bash
cd frontend-web
npm install
npm run dev
```

### Mobile Application

```bash
cd frontend-mobile
npm install
npx react-native run-android
```

## Screenshots

Add project screenshots here:

- Home Page
- Product Detail Page
- Shopping Cart
- Checkout Page
- Seller Dashboard
- Admin Dashboard
- Mobile Application

## Future Enhancements

- Real-time notifications
- AI-powered product recommendations
- Live chat between customers and sellers
- Advanced analytics dashboard
- Multi-language support
- Microservices architecture

## Author

Nguyễn Nam Trung Nguyên

## License

This project was developed for educational, research, and portfolio purposes.
