import * as React from "react";
import { NextPage } from "next";
import nextCookie from "next-cookies";
import { observer } from "mobx-react";
import BookDetails from "../../components/book/BookDetails";
import Layout from "../../components/Layout";
import BookCommentList from "../../components/book/BookCommentList";
import BookCommentForm from "../../components/book/BookCommentForm";
import { getStore } from "../_app";
import { useQuery } from "../../models";

type Props = {
  id?: string;
  errors?: string;
  isAuthed?: boolean;
};

const Book: NextPage<Props> = observer(props => {
  if (props.errors || !props.id) {
    console.log(props.id);
    return <div>Error</div>;
  }

  const id = props.id;
  const { data, loading, error } = useQuery(store =>
    store.queryGetBook({ id }, msg => {
      return msg
        .authors(a => a.name)
        .genres(g => g.name)
        .comments(c => c.rating.user(u => u.name).content).name.id.isbn
        .description;
    })
  );

  if (loading || !data) return <div>Loading</div>;
  if (error) return <div>Error</div>;

  return (
    <Layout>
      {/* mst view... */}
      <BookDetails {...data.getBook} rating={data.getBook.rating}></BookDetails>
      <BookCommentList commentCards={data.getBook.comments}></BookCommentList>
      {props.isAuthed && (
        <BookCommentForm bookId={data.getBook.id}></BookCommentForm>
      )}
    </Layout>
  );
});

Book.getInitialProps = async ctx => {
  let isAuthed = false;
  const store = getStore(null, ctx);

  const { token } = nextCookie(ctx);
  console.log("book page auth ", token);
  if (token) {
    isAuthed = true;
    store.setToken(token);
  }

  try {
    const { id } = ctx.query;
    if (typeof id !== "string")
      throw Error(
        "This is messed up, man. Check your query: " + JSON.stringify(ctx.query)
      );
    return { id, isAuthed };
  } catch (err) {
    console.error(err);
    return { errors: err.message };
  }
};

export default Book;
