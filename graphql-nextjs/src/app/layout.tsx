"use client";
import ApolloProvider from "@/components/ApolloProvider";
import createApolloClient from "../../apollo-client";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ApolloProvider>
        <body>{children}</body>
      </ApolloProvider>
    </html>
  );
}
