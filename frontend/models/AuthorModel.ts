import { Instance } from "mobx-state-tree"
import { AuthorModelBase } from "./AuthorModel.base"

/* The TypeScript type of an instance of AuthorModel */
export interface AuthorModelType extends Instance<typeof AuthorModel.Type> {}

/* A graphql query fragment builders for AuthorModel */
export { selectFromAuthor, authorModelPrimitives, AuthorModelSelector } from "./AuthorModel.base"

/**
 * AuthorModel
 */
export const AuthorModel = AuthorModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
