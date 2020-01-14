import * as React from "react";
import { useRouter } from "next/router";
import { Box, Flex, IconButton, useColorMode, Link } from "@chakra-ui/core";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import { ROOT_ROUTE } from "../consts";

const Header = (props: any) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = { light: "white", dark: "gray.800" };
  const router = useRouter();

  return (
    <Box
      position="fixed"
      as="header"
      top="0"
      zIndex="4"
      bg={bg[colorMode]}
      left="0"
      right="0"
      borderBottomWidth="1px"
      width="full"
      height="4rem"
      {...props}
    >
      <Box width="full" marginX="auto" paddingX={6} height="100%">
        <Flex size="100%" paddingX="6" align="center" justify="space-between">
          <Link
            as="a"
            href="/"
            display="block"
            aria-label="Bookreads, Back to homepage"
          >
            <Logo />
          </Link>
          {router?.pathname !== ROOT_ROUTE && <SearchBar></SearchBar>}
          <Flex align="center" color="gray.500">
            <IconButton
              aria-label={`Switch to ${
                colorMode === "light" ? "dark" : "light"
              } mode`}
              variant="ghost"
              color="current"
              marginLeft="2"
              fontSize="20px"
              onClick={toggleColorMode}
              icon={colorMode === "light" ? "moon" : "sun"}
            />
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default Header;
