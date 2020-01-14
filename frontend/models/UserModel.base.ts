/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { IObservableArray } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { CommentModel, CommentModelType } from "./CommentModel"
import { CommentModelSelector } from "./CommentModel.base"
import { UserRoleEnum } from "./UserRoleEnum"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  comments: IObservableArray<CommentModelType>;
}

/**
 * UserBase
 * auto generated base class for the model UserModel.
 */
export const UserModelBase = withTypedRefs<Refs>()(ModelBase
  .named('User')
  .props({
    __typename: types.optional(types.literal("User"), "User"),
    id: types.identifier,
    name: types.union(types.undefined, types.string),
    email: types.union(types.undefined, types.string),
    bio: types.union(types.undefined, types.string),
    userRole: types.union(types.undefined, UserRoleEnum),
    comments: types.union(types.undefined, types.array(MSTGQLRef(types.late((): any => CommentModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class UserModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get name() { return this.__attr(`name`) }
  get email() { return this.__attr(`email`) }
  get bio() { return this.__attr(`bio`) }
  get userRole() { return this.__attr(`userRole`) }
  comments(builder?: string | CommentModelSelector | ((selector: CommentModelSelector) => CommentModelSelector)) { return this.__child(`comments`, CommentModelSelector, builder) }
}
export function selectFromUser() {
  return new UserModelSelector()
}

export const userModelPrimitives = selectFromUser().name.email.bio.userRole
