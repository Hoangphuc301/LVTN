// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import App from './App';
// import './css/index.css';

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// );

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./css/index.css";
import { CartProvider } from "@/features/user/cart/components/CartContext";

createRoot(document.getElementById("root")!).render(

  <StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>
);