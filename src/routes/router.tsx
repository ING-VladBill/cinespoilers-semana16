import { createBrowserRouter } from "react-router-dom";

import { MainLayout } from "@/layouts/main-layout";

import HomePage from '@/pages/home-page';
import { MovieDetailPage } from "@/pages/movie-detail-page";
import { MoviesPage } from "@/pages/movies-page";
import { CartPage } from "@/pages/cart-page";
import { CheckoutPage } from "@/pages/checkout-page";
import { PurchaseSuccessPage } from "@/pages/purchase-success-page";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/movies",
        element: <MoviesPage />,
      },
      {
        path: "/movies/:movieId",
        element: <MovieDetailPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/checkout/success",
        element: <PurchaseSuccessPage />,
      },
    ],
  },
]);