import * as React from "react";
import nextCookie from "next-cookies";
import Router from "next/router";
import { ROOT_ROUTE } from "../consts";
import { getStore } from "../pages/_app";
import { NextPageContext } from "next";

export const withAuth = <T extends object>(C: React.ComponentType<T>) => {
  return class AuthComponent extends React.Component<T> {
    static async getInitialProps({ ...ctx }) {
      const store = getStore(null, ctx as NextPageContext);

      const { token } = nextCookie(ctx);
      console.log("withAuth", token);
      if (token) {
        store.setToken(token);
      }

      // TODO: needs major rework, here we merely check if token is in cookies
      if (!token) {
        typeof window !== "undefined"
          ? Router.push(ROOT_ROUTE)
          : ctx.res?.writeHead(302, { Location: ROOT_ROUTE }).end();
      }
    }

    render() {
      return <C {...this.props} />;
    }
  };
};

export default withAuth;
