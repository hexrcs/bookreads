/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { ObservableMap } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLStore, configureStoreMixin, QueryOptions, withTypedRefs } from "mst-gql"

import { UserModel, UserModelType } from "./UserModel"
import { userModelPrimitives, UserModelSelector } from "./UserModel.base"
import { CommentModel, CommentModelType } from "./CommentModel"
import { commentModelPrimitives, CommentModelSelector } from "./CommentModel.base"
import { BookModel, BookModelType } from "./BookModel"
import { bookModelPrimitives, BookModelSelector } from "./BookModel.base"
import { GenreModel, GenreModelType } from "./GenreModel"
import { genreModelPrimitives, GenreModelSelector } from "./GenreModel.base"
import { AuthorModel, AuthorModelType } from "./AuthorModel"
import { authorModelPrimitives, AuthorModelSelector } from "./AuthorModel.base"
import { AuthPayloadModel, AuthPayloadModelType } from "./AuthPayloadModel"
import { authPayloadModelPrimitives, AuthPayloadModelSelector } from "./AuthPayloadModel.base"

import { UserRole } from "./UserRoleEnum"

/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  users: ObservableMap<string, UserModelType>,
  comments: ObservableMap<string, CommentModelType>,
  books: ObservableMap<string, BookModelType>,
  genres: ObservableMap<string, GenreModelType>,
  authors: ObservableMap<string, AuthorModelType>
}

/**
* Store, managing, among others, all the objects received through graphQL
*/
export const RootStoreBase = withTypedRefs<Refs>()(MSTGQLStore
  .named("RootStore")
  .extend(configureStoreMixin([['User', () => UserModel], ['Comment', () => CommentModel], ['Book', () => BookModel], ['Genre', () => GenreModel], ['Author', () => AuthorModel], ['AuthPayload', () => AuthPayloadModel]], ['User', 'Comment', 'Book', 'Genre', 'Author']))
  .props({
    users: types.optional(types.map(types.late((): any => UserModel)), {}),
    comments: types.optional(types.map(types.late((): any => CommentModel)), {}),
    books: types.optional(types.map(types.late((): any => BookModel)), {}),
    genres: types.optional(types.map(types.late((): any => GenreModel)), {}),
    authors: types.optional(types.map(types.late((): any => AuthorModel)), {})
  })
  .actions(self => ({
    queryMe(variables?: {  }, resultSelector: string | ((qb: UserModelSelector) => UserModelSelector) = userModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ me: UserModelType}>(`query me { me {
        ${typeof resultSelector === "function" ? resultSelector(new UserModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryGetUser(variables: { email: string }, resultSelector: string | ((qb: UserModelSelector) => UserModelSelector) = userModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ getUser: UserModelType}>(`query getUser($email: String!) { getUser(email: $email) {
        ${typeof resultSelector === "function" ? resultSelector(new UserModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    querySearch(variables: { keywords?: string }, resultSelector: string | ((qb: BookModelSelector) => BookModelSelector) = bookModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ search: BookModelType[]}>(`query search($keywords: String) { search(keywords: $keywords) {
        ${typeof resultSelector === "function" ? resultSelector(new BookModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryGetBook(variables: { id: string }, resultSelector: string | ((qb: BookModelSelector) => BookModelSelector) = bookModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ getBook: BookModelType}>(`query getBook($id: ID!) { getBook(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new BookModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryListGenres(variables?: {  }, resultSelector: string | ((qb: GenreModelSelector) => GenreModelSelector) = genreModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ listGenres: GenreModelType[]}>(`query listGenres { listGenres {
        ${typeof resultSelector === "function" ? resultSelector(new GenreModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryListAuthors(variables?: {  }, resultSelector: string | ((qb: AuthorModelSelector) => AuthorModelSelector) = authorModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ listAuthors: AuthorModelType[]}>(`query listAuthors { listAuthors {
        ${typeof resultSelector === "function" ? resultSelector(new AuthorModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    mutateSignup(variables: { name: string, email: string, password: string }, resultSelector: string | ((qb: AuthPayloadModelSelector) => AuthPayloadModelSelector) = authPayloadModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ signup: AuthPayloadModelType}>(`mutation signup($name: String!, $email: String!, $password: String!) { signup(name: $name, email: $email, password: $password) {
        ${typeof resultSelector === "function" ? resultSelector(new AuthPayloadModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateLogin(variables: { email: string, password: string }, resultSelector: string | ((qb: AuthPayloadModelSelector) => AuthPayloadModelSelector) = authPayloadModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ login: AuthPayloadModelType}>(`mutation login($email: String!, $password: String!) { login(email: $email, password: $password) {
        ${typeof resultSelector === "function" ? resultSelector(new AuthPayloadModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateUpdateMe(variables: { name?: string, bio?: string }, resultSelector: string | ((qb: UserModelSelector) => UserModelSelector) = userModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ updateMe: UserModelType}>(`mutation updateMe($name: String, $bio: String) { updateMe(name: $name, bio: $bio) {
        ${typeof resultSelector === "function" ? resultSelector(new UserModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateUpdatePassword(variables: { password: string }, resultSelector: string | ((qb: UserModelSelector) => UserModelSelector) = userModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ updatePassword: UserModelType}>(`mutation updatePassword($password: String!) { updatePassword(password: $password) {
        ${typeof resultSelector === "function" ? resultSelector(new UserModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateUpgradeToAdmin(variables?: {  }, resultSelector: string | ((qb: UserModelSelector) => UserModelSelector) = userModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ upgradeToAdmin: UserModelType}>(`mutation upgradeToAdmin { upgradeToAdmin {
        ${typeof resultSelector === "function" ? resultSelector(new UserModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateCreateBook(variables: { name: string, coverUrl?: string, description?: string, genres: string[], authors: string[], isbn?: string }, resultSelector: string | ((qb: BookModelSelector) => BookModelSelector) = bookModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ createBook: BookModelType}>(`mutation createBook($name: String!, $coverUrl: String, $description: String, $genres: [ID!], $authors: [ID!], $isbn: String) { createBook(name: $name, coverUrl: $coverUrl, description: $description, genres: $genres, authors: $authors, isbn: $isbn) {
        ${typeof resultSelector === "function" ? resultSelector(new BookModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateUpdateBook(variables: { id: string, name?: string, coverUrl?: string, description?: string, genres: string[], authors: string[], isbn?: string }, resultSelector: string | ((qb: BookModelSelector) => BookModelSelector) = bookModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ updateBook: BookModelType}>(`mutation updateBook($id: ID!, $name: String, $coverUrl: String, $description: String, $genres: [ID!], $authors: [ID!], $isbn: String) { updateBook(id: $id, name: $name, coverUrl: $coverUrl, description: $description, genres: $genres, authors: $authors, isbn: $isbn) {
        ${typeof resultSelector === "function" ? resultSelector(new BookModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateDeleteBook(variables: { id: string }, resultSelector: string | ((qb: BookModelSelector) => BookModelSelector) = bookModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ deleteBook: BookModelType}>(`mutation deleteBook($id: ID!) { deleteBook(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new BookModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateCreateAuthor(variables: { name: string }, resultSelector: string | ((qb: AuthorModelSelector) => AuthorModelSelector) = authorModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ createAuthor: AuthorModelType}>(`mutation createAuthor($name: String!) { createAuthor(name: $name) {
        ${typeof resultSelector === "function" ? resultSelector(new AuthorModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateCreateGenre(variables: { name: string }, resultSelector: string | ((qb: GenreModelSelector) => GenreModelSelector) = genreModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ createGenre: GenreModelType}>(`mutation createGenre($name: String!) { createGenre(name: $name) {
        ${typeof resultSelector === "function" ? resultSelector(new GenreModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateCreateComment(variables: { content: string, bookId: string, rating: number }, resultSelector: string | ((qb: CommentModelSelector) => CommentModelSelector) = commentModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ createComment: CommentModelType}>(`mutation createComment($content: String!, $bookId: ID!, $rating: Int!) { createComment(content: $content, bookId: $bookId, rating: $rating) {
        ${typeof resultSelector === "function" ? resultSelector(new CommentModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateUpdateComment(variables: { id: string, content?: string, rating?: number }, resultSelector: string | ((qb: CommentModelSelector) => CommentModelSelector) = commentModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ updateComment: CommentModelType}>(`mutation updateComment($id: ID!, $content: String, $rating: Int) { updateComment(id: $id, content: $content, rating: $rating) {
        ${typeof resultSelector === "function" ? resultSelector(new CommentModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateDeleteComment(variables: { id: string }, resultSelector: string | ((qb: CommentModelSelector) => CommentModelSelector) = commentModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ deleteComment: CommentModelType}>(`mutation deleteComment($id: ID!) { deleteComment(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new CommentModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
  })))
