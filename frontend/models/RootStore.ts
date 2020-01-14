import { Instance, types, flow, getEnv } from "mobx-state-tree";
import { RootStoreBase } from "./RootStore.base";
import { UserModel, UserModelType } from "./UserModel";
import { AuthPayloadModel, AuthPayloadModelType } from "./AuthPayloadModel";
import { userModelPrimitives, authPayloadModelPrimitives } from ".";
import cookie from "js-cookie";
import { PROFILE_ROUTE, ROOT_ROUTE } from "../consts";
import Router from "next/router";
import { localStorageMixin } from "mst-gql";

export interface RootStoreType extends Instance<typeof RootStore.Type> {}

export const RootStore = RootStoreBase.actions(self => ({
  // This is an auto-generated example action.
  log() {
    console.log(JSON.stringify(self));
  }
}))
  .props({
    currentToken: "",
    // use reference to avoid error where one object is added twice to the state tree
    currentUser: types.maybe(types.reference(UserModel))
  })
  .actions(self => ({
    signup: flow(function* signup(
      name: string,
      email: string,
      password: string
    ) {
      const {
        signup: authPayload
      }: { signup: AuthPayloadModelType } = yield self.mutateSignup(
        { name, email, password },
        _ => authPayloadModelPrimitives.user(userModelPrimitives)
      );
      console.log("authPayload is", authPayload);
      self.currentToken = authPayload.token ?? "";
      self.currentUser = authPayload.user;

      console.log(self.currentToken, self.currentUser);

      // use mst's getEnv to update auth header
      // https://github.com/mobxjs/mst-gql/issues/82#issuecomment-535046885
      getEnv(self).gqlHttpClient.setHeaders({
        Authorization: `Bearer ${self.currentToken}`
      });

      cookie.set("token", self.currentToken, { expires: 1 });
      Router.push(PROFILE_ROUTE);
    }),
    login: flow(function* login(email: string, password: string) {
      const {
        login: authPayload
      }: { login: AuthPayloadModelType } = yield self.mutateLogin(
        { email, password },
        _ => authPayloadModelPrimitives.user(userModelPrimitives)
      );
      console.log(authPayload);
      self.currentToken = authPayload.token ?? "";
      self.currentUser = authPayload.user;

      console.log(self.currentToken, self.currentUser);
      getEnv(self).gqlHttpClient.setHeaders({
        Authorization: `Bearer ${self.currentToken}`
      });

      cookie.set("token", self.currentToken, { expires: 1 });
      Router.push(PROFILE_ROUTE);
    }),
    logout: () => {
      self.currentToken = "";
      self.currentUser = undefined;
      getEnv(self).gqlHttpClient.setHeaders({});

      cookie.remove("token");
      Router.push(ROOT_ROUTE);
    },
    setToken: (token: String) => {
      getEnv(self).gqlHttpClient.setHeaders({
        Authorization: `Bearer ${token}`
      });
    },
    selfSetToken: () => {
      getEnv(self).gqlHttpClient.setHeaders({
        Authorization: `Bearer ${self.currentToken}`
      });
    }
  }))
  .extend(
    localStorageMixin({
      throttle: 1000,
      storageKey: "appMstGql",
      storage: {
        getItem(key: string) {
          const isServer: boolean = !process.browser;

          if (!isServer && window && window?.localStorage)
            return window.localStorage.getItem(key);
          else return null;
        },
        setItem(key: string, data: string) {
          const isServer: boolean = !process.browser;

          if (!isServer && window && window?.localStorage)
            window.localStorage.setItem(key, data);
        }
      }
    })
  );
