import * as React from "react";
import Layout from "../components/Layout";
import { NextPage } from "next";
import { observer } from "mobx-react";
import s from "../stores/uiStore";
import { useQuery } from "../models";
import ProfileDetails from "../components/profile/ProfileDetails";
import ProfileUpdateForm from "../components/profile/ProfileUpdateForm";
import withAuth from "../components/withAuth";

const ProfilePage: NextPage = observer(() => {
  const { error, loading, data } = useQuery(store => store.queryMe());
  if (loading) {
    console.log("Loading");
    return <div>Loading</div>;
  }

  if (data) {
    s.puBio = data.me.bio ?? "";
    s.puName = data.me.name ?? "";

    return (
      <Layout title="Profile Page">
        <ProfileDetails {...data.me}></ProfileDetails>
        <ProfileUpdateForm></ProfileUpdateForm>
      </Layout>
    );
  }

  console.log("Error");
  return <div>You are not signed in</div>;
});

export default withAuth(ProfilePage);
