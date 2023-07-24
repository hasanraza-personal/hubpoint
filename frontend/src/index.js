import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { HelmetProvider } from 'react-helmet-async';
import './public/fonts/Montserrat-Regular.ttf';
import ScrollToTop from './ScrollToTop';
import './public/fonts/SFPro.ttf';
import { QueryClientProvider, QueryClient } from "react-query";
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:5000";
// axios.defaults.baseURL = "https://hubpoint.in";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <HelmetProvider>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <ScrollToTop />
          <GoogleOAuthProvider clientId='727947435835-jla9q6j0dmnntn8u9u53uioj6c5bhc42.apps.googleusercontent.com'>
            <App />
          </GoogleOAuthProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </HelmetProvider >
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
