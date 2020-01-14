import React from "react";
import App from "next/app";
import { NextPageContext } from "next";
import nextCookie from "next-cookies";
import { applySnapshot, getSnapshot, ModelCreationType } from "mobx-state-tree";
import { createHttpClient, getDataFromTree } from "mst-gql";
import { RootStore, RootStoreType, StoreContext } from "../models";

const isServer: boolean = !process.browser;

let store: ModelCreationType<RootStoreType>;

export function getStore(
  snapshot = null,
  ctx?: NextPageContext
): ModelCreationType<RootStoreType> {
  if (isServer || !store) {
    store = RootStore.create(undefined, {
      gqlHttpClient: createHttpClient("http://localhost:4000"),
      ssr: true
    });
    if (ctx) {
      const { token } = nextCookie(ctx);
      store.setToken(token ?? "");
    }
  }
  if (snapshot) {
    applySnapshot(store, snapshot);
  }
  return store;
}

export default class MyApp extends App<any, any> {
  store: RootStoreType;

  static async getInitialProps({ Component, ctx, router }) {
    const store = getStore(null, ctx);
    const { token } = nextCookie(ctx);
    if (token) {
      store.setToken(token);
    }

    const pageProps =
      (Component.getInitialProps &&
        (await Component.getInitialProps({ ...ctx, store }))) ||
      {};

    let storeSnapshot;
    if (isServer) {
      const tree = <MyApp {...{ Component, router, pageProps, store }} />;
      await getDataFromTree(tree, store);
      storeSnapshot = getSnapshot<RootStoreType>(store);
    }

    return { pageProps, storeSnapshot };
  }

  constructor(props) {
    super(props);
    this.store = props.store || getStore(props.storeSnapshot, this.context);
    Object.assign(global, { store: this.store }); // for debugging
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <StoreContext.Provider value={this.store}>
        <Component {...pageProps} />
      </StoreContext.Provider>
    );
  }
}
