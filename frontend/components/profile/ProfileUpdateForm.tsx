import * as React from "react";
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
  Button,
  Textarea
} from "@chakra-ui/core";
import { useQuery, RootStoreType } from "../../models";
import s from "../../stores/uiStore";

const handleUpdateMe = async (store: RootStoreType) => {
  if (!(s.puName && s.puBio)) return; // no error handling or checking for now
  store.selfSetToken();
  store.mutateUpdateMe({ name: s.puName, bio: s.puBio });
};

const handleUpdatePassword = async (store: RootStoreType) => {
  if (!s.puPassword) return; // no error handling or checking for now
  store.selfSetToken();
  store.mutateUpdatePassword({ password: s.puPassword });
};

const ProfileUpdateForm = observer(() => {
  const { store } = useQuery();

  return (
    <Flex flexDirection="column" alignItems="center" padding={10}>
      <Box marginBottom={8} width="xl">
        <Heading textAlign="center" fontSize="xl" color="gray.600">
          Update profile
        </Heading>
      </Box>
      <Stack spacing={4} width="xl">
        <InputGroup>
          <InputLeftElement children={<Icon color="gray.300" />} />
          <Input
            type="text"
            placeholder="Name"
            value={s.puName}
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              s.puName = e.currentTarget.value;
            }}
          />
        </InputGroup>

        <Textarea
          placeholder="Enter your new bio here"
          value={s.puBio}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            s.puBio = e.currentTarget.value;
          }}
          height={120}
        ></Textarea>
      </Stack>
      <Flex justifyContent="center">
        <Button
          variantColor="green"
          margin={6}
          onClick={() => handleUpdateMe(store)}
        >
          Update name and bio
        </Button>
      </Flex>
      <Stack spacing={4} width="xl">
        <InputGroup>
          <InputLeftElement children={<Icon name="lock" color="gray.300" />} />
          <Input
            type="password"
            placeholder="Password"
            value={s.puPassword}
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              s.puPassword = e.currentTarget.value;
            }}
          />
        </InputGroup>
      </Stack>
      <Flex justifyContent="center">
        <Button
          variantColor="red"
          margin={6}
          onClick={() => handleUpdatePassword(store)}
        >
          Update password
        </Button>
      </Flex>
    </Flex>
  );
});

export default ProfileUpdateForm;
