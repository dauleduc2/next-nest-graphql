"use client";
import ApolloProvider from "@/components/ApolloProvider";
import Header from "@/components/layouts/header";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./global.css";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-screen h-screen">
        <ApolloProvider>
          <div className="flex flex-col w-full h-full">
            <Header />
            <div className="flex-1 bg-gray-100 px-10 py-5 flex flex-col">
              {children}
            </div>
          </div>
        </ApolloProvider>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          stacked
          theme="colored"
        />
      </body>
    </html>
  );
}
