import { observable, action } from "mobx";

class UIStore {
  @observable
  searchFieldInput: string = "";

  // signup form
  @observable
  suName: string = "";
  @observable
  suEmail: string = "";
  @observable
  suPassword: string = "";
  @action
  clearSu = () => {
    this.suName = "";
    this.suEmail = "";
    this.suPassword = "";
  };

  // login form
  @observable
  liEmail: string = "";
  @observable
  liPassword: string = "";
  @action
  clearLi = () => {
    this.liEmail = "";
    this.liPassword = "";
  };

  // profile update form
  @observable
  puName: string = "";
  @observable
  puBio: string = "";
  @action
  clearProfileForm = () => {
    this.puName = "";
    this.puBio = "";
  };
  @observable
  puPassword: string = "";
  @action
  clearNewPassword = () => {
    this.puPassword = "";
  };

  // book comment form
  @observable
  commentContent: string = "";
  @observable
  rating: number = 0;
  @action
  clearCommentForm = () => {
    this.commentContent = "";
    this.rating = 0;
  };

  // add book form
  @observable
  bookTitle: string = "";
  @observable
  bookDescription: string = "";
  @observable
  isbn: string = "";
  @observable
  coverUrl: string = "";
  @observable
  authors: string = "";
  @observable
  genres: string = "";
  @action
  clearAddBookForm = () => {
    this.bookTitle = "";
    this.bookDescription = "";
    this.isbn = "";
    this.coverUrl = "";
    this.authors = "";
    this.genres = "";
  };
}

const uiStore = new UIStore();

export default uiStore;
