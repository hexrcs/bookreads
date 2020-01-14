/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { UserModel, UserModelType } from "./UserModel"
import { UserModelSelector } from "./UserModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  user: UserModelType;
}

/**
 * AuthPayloadBase
 * auto generated base class for the model AuthPayloadModel.
 */
export const AuthPayloadModelBase = withTypedRefs<Refs>()(ModelBase
  .named('AuthPayload')
  .props({
    __typename: types.optional(types.literal("AuthPayload"), "AuthPayload"),
    token: types.union(types.undefined, types.string),
    user: types.union(types.undefined, MSTGQLRef(types.late((): any => UserModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class AuthPayloadModelSelector extends QueryBuilder {
  get token() { return this.__attr(`token`) }
  user(builder?: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector)) { return this.__child(`user`, UserModelSelector, builder) }
}
export function selectFromAuthPayload() {
  return new AuthPayloadModelSelector()
}

export const authPayloadModelPrimitives = selectFromAuthPayload().token
