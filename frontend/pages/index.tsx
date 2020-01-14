import * as React from "react";
import { useState } from "react";
import Router from "next/router";
import { NextPage } from "next";
import nextCookie from "next-cookies";
import { Link, Box, Flex } from "@chakra-ui/core";
import Layout from "../components/Layout";
import SignupForm from "../components/home/SignupForm";
import LoginForm from "../components/home/LoginForm";
import { PROFILE_ROUTE, SIGNUP_MODE, LOGIN_MODE } from "../consts";

const IndexPage: NextPage = props => {
  const [mode, setMode] = useState(SIGNUP_MODE);

  return (
    <Layout title="Welcome to Bookreads 👋">
      <Flex flexDirection="column" alignItems="center" margin={10}>
        <Box w="sm">
          {mode === SIGNUP_MODE ? <SignupForm /> : <LoginForm />}
          <Flex flexDirection="row-reverse">
            <Link
              m={2}
              color="gray.600"
              onClick={() => {
                console.log("mode");

                switch (mode) {
                  case SIGNUP_MODE:
                    setMode(LOGIN_MODE);
                    break;
                  case LOGIN_MODE:
                    setMode(SIGNUP_MODE);
                    break;
                }
              }}
            >
              {mode === SIGNUP_MODE ? "Log in instead" : "Sign up instead"}
            </Link>
          </Flex>
        </Box>
      </Flex>
    </Layout>
  );
};

IndexPage.getInitialProps = async ctx => {
  const { token } = nextCookie(ctx);

  // TODO: needs major rework, here we merely check if token is in cookies
  if (token) {
    typeof window !== "undefined"
      ? Router.push(PROFILE_ROUTE)
      : ctx.res?.writeHead(302, { Location: PROFILE_ROUTE }).end();
  }
};

export default IndexPage;
