import * as React from "react";
import NextHead from "next/head";
import {
  ThemeProvider,
  CSSReset,
  Box,
  ColorModeProvider
} from "@chakra-ui/core";
import Header from "./Header";

type Props = {
  title?: string;
};

const Layout: React.FunctionComponent<Props> = ({
  children,
  title = "This is the default title"
}) => (
  <ThemeProvider>
    <ColorModeProvider>
      <NextHead>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </NextHead>
      <CSSReset />
      <Header></Header>
      <Box top="4rem" position="relative" overflowY="auto">
        {children}
        <footer>
          <hr />
          <span>I'm here to stay (Footer)</span>
        </footer>
      </Box>
    </ColorModeProvider>
  </ThemeProvider>
);

export default Layout;
