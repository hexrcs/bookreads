import { Instance } from "mobx-state-tree"
import { GenreModelBase } from "./GenreModel.base"

/* The TypeScript type of an instance of GenreModel */
export interface GenreModelType extends Instance<typeof GenreModel.Type> {}

/* A graphql query fragment builders for GenreModel */
export { selectFromGenre, genreModelPrimitives, GenreModelSelector } from "./GenreModel.base"

/**
 * GenreModel
 */
export const GenreModel = GenreModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
