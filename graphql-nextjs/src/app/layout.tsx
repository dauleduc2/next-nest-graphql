"use client";
import ApolloProvider from "@/components/ApolloProvider";
import Header from "@/components/layouts/header";
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
            <div className="flex-1 bg-gray-100 px-10 py-5">{children}</div>
          </div>
        </ApolloProvider>
      </body>
    </html>
  );
}
