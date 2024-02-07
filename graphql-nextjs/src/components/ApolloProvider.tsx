"use client";

import { FC, PropsWithChildren } from "react";
import { ApolloProvider as ApolloFromLib } from "@apollo/client";
import createApolloClient from "../../apollo-client";

interface ApolloProviderProps extends PropsWithChildren {}

const client = createApolloClient();

const ApolloProvider: FC<ApolloProviderProps> = ({ children }) => {
  return <ApolloFromLib client={client}>{children}</ApolloFromLib>;
};

export default ApolloProvider;
