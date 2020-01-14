import * as React from "react";
import Router from "next/router";
import { observer } from "mobx-react";
import {
  Heading,
  Box,
  Stack,
  Flex,
  Icon,
  InputGroup,
  InputLeftElement,
  Input,
  Button
} from "@chakra-ui/core";
import { useQuery, RootStoreType } from "../../models";
import { PROFILE_ROUTE } from "../../consts";
import s from "../../stores/uiStore";

const handleLogin = async (store: RootStoreType) => {
  if (!(s.liEmail && s.liPassword)) return; // no error handling or checking for now

  await store.login(s.liEmail, s.liPassword);
  s.clearLi();
  Router.push(PROFILE_ROUTE);
};

const LoginForm = observer(() => {
  const { store } = useQuery();

  return (
    <Box borderRadius={4} borderWidth={1} padding={4} minHeight={"xs"}>
      <Box marginBottom={8}>
        <Heading textAlign="center" fontSize="2xl" color="gray.600">
          Member Login
        </Heading>
      </Box>
      <Stack spacing={4}>
        <InputGroup>
          <InputLeftElement children={<Icon name="email" color="gray.300" />} />
          <Input
            type="email"
            placeholder="Email"
            value={s.liEmail}
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              s.liEmail = e.currentTarget.value;
            }}
          />
        </InputGroup>

        <InputGroup>
          <InputLeftElement children={<Icon name="lock" color="gray.300" />} />
          <Input
            type="password"
            placeholder="Password"
            value={s.liPassword}
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              s.liPassword = e.currentTarget.value;
            }}
          />
        </InputGroup>
      </Stack>
      <Flex justifyContent="center">
        <Button
          variantColor="green"
          marginTop={6}
          marginBottom={2}
          onClick={() => handleLogin(store)}
        >
          Log In
        </Button>
      </Flex>
    </Box>
  );
});

export default LoginForm;
