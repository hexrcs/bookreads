import * as React from "react";
import Router from "next/router";
import { observer } from "mobx-react";
import { Heading, Link, Box, Grid, Image, Flex, Button } from "@chakra-ui/core";
import { Md5 } from "ts-md5";
import { UserModelType, useQuery, RootStoreType } from "../../models";
import { ADD_BOOK_ROUTE } from "../../consts";

type Props = UserModelType;

const handleUpgrade = async (store: RootStoreType) => {
  store.selfSetToken();
  await store.mutateUpgradeToAdmin();
};

const ProfileDetails = observer((props: Props) => {
  const { store } = useQuery();
  return (
    <Flex flexDirection="column" alignItems="center" padding={10}>
      <Box width="xl">
        <Heading>Hi, {props.name ?? "there"}!</Heading>
      </Box>
      <Grid
        width="xl"
        borderWidth="1px"
        rounded="lg"
        templateColumns="1fr 3fr"
        marginTop={6}
        gap={6}
        padding={1}
      >
        <Image
          maxHeight="sm"
          src={`https://www.gravatar.com/avatar/${Md5.hashStr(
            props.email ?? ""
          )}?s=200`}
          alt={`Gravatar for ${props.email}`}
        />
        <Box padding="3" maxH="sm">
          <Box
            display="flex"
            alignItems="baseline"
            justifyContent="space-between"
          >
            <Box
              maxWidth={350}
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="sm"
              textTransform="uppercase"
              isTruncated
            >
              User role: {props.userRole}
            </Box>
            {props.userRole === "USER" ? (
              <Button
                size="xs"
                variantColor="red"
                onClick={() => handleUpgrade(store)}
              >
                Upgrade to Admin
              </Button>
            ) : (
              <Button
                size="xs"
                variantColor="yellow"
                onClick={() => Router.push(ADD_BOOK_ROUTE)}
              >
                Add a new book
              </Button>
            )}
          </Box>

          <Box
            maxWidth={350}
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            fontSize="2xl"
            isTruncated
          >
            {props.name}
          </Box>

          <Box maxHeight="xs" marginTop={1}>
            {props.bio || "No bio yet."}
          </Box>

          <Flex
            marginTop={1}
            flexDirection="row-reverse"
            fontWeight="semibold"
            fontSize="xs"
            letterSpacing="wide"
            textTransform="uppercase"
          >
            <Link onClick={store.logout}>Log out</Link>
          </Flex>
        </Box>
      </Grid>
    </Flex>
  );
});

export default ProfileDetails;
