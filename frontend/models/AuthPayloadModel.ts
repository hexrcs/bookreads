import { Instance } from "mobx-state-tree"
import { AuthPayloadModelBase } from "./AuthPayloadModel.base"

/* The TypeScript type of an instance of AuthPayloadModel */
export interface AuthPayloadModelType extends Instance<typeof AuthPayloadModel.Type> {}

/* A graphql query fragment builders for AuthPayloadModel */
export { selectFromAuthPayload, authPayloadModelPrimitives, AuthPayloadModelSelector } from "./AuthPayloadModel.base"

/**
 * AuthPayloadModel
 */
export const AuthPayloadModel = AuthPayloadModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
