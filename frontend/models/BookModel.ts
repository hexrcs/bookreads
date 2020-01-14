import { Instance } from "mobx-state-tree";
import { BookModelBase } from "./BookModel.base";

/* The TypeScript type of an instance of BookModel */
export interface BookModelType extends Instance<typeof BookModel.Type> {}

/* A graphql query fragment builders for BookModel */
export {
  selectFromBook,
  bookModelPrimitives,
  BookModelSelector
} from "./BookModel.base";

/**
 * BookModel
 */
export const BookModel = BookModelBase.actions(self => ({
  // This is an auto-generated example action.
  log() {
    console.log(JSON.stringify(self));
  }
})).views(self => ({
  get rating() {
    const _rating =
      self.comments.map(x => x.rating ?? 0).reduce((p, n) => p + n, 0) /
      (self.comments.length || 1);

    return _rating;
  }
}));
