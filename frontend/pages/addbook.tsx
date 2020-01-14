import * as React from "react";
import { NextPage } from "next";
import { observer } from "mobx-react";
import Layout from "../components/Layout";
import withAuth from "../components/withAuth";
import AddBookForm from "../components/admin/AddBookForm";
import { useQuery } from "../models";

const AddBookPage: NextPage = observer(() => {
  const { error, loading, data } = useQuery(store => store.queryMe());
  if (loading) {
    console.log("Loading");
    return <div>Loading</div>;
  }

  if (data) {
    if (data.me.userRole === "ADMIN")
      return (
        <Layout title="Add a new book">
          <AddBookForm></AddBookForm>
        </Layout>
      );
  }

  console.log("Error");
  return <div>You are not signed in or not an admin</div>;
});

export default withAuth(AddBookPage);
