import * as React from "react";
import { observer } from "mobx-react";
import { Heading, Box, Stack, Flex, Button, Textarea } from "@chakra-ui/core";
import { useQuery, RootStoreType } from "../../models";
import StarSelector from "./StarSelector";
import s from "../../stores/uiStore";

const handleCreateComment = async (store: RootStoreType, bookId: string) => {
  if (!(s.commentContent && s.rating)) return; // no error handling or checking for now
  store.selfSetToken();
  const data = await store.mutateCreateComment({
    content: s.commentContent,
    rating: s.rating,
    bookId
  });
  console.log("data.createComment", data.createComment);
  s.clearCommentForm();
};

type Props = { bookId: string };

// a little spagetti in here coz mobx... will refactor to use Formik
// TODO: let use only create comment once but allow updating
const BookCommentForm = observer((props: Props) => {
  const { store } = useQuery();

  return (
    <Flex flexDirection="column" alignItems="center" padding={10}>
      <Box marginBottom={8} width="xl">
        <Heading textAlign="center" fontSize="xl" color="gray.600">
          Create comment
        </Heading>
      </Box>
      <Stack spacing={4} width="xl">
        <Textarea
          placeholder="Enter your comment here"
          value={s.commentContent}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            s.commentContent = e.currentTarget.value;
          }}
          height={120}
        ></Textarea>
        <StarSelector></StarSelector>
      </Stack>

      <Flex justifyContent="center">
        <Button
          variantColor="green"
          margin={6}
          onClick={() => handleCreateComment(store, props.bookId)}
        >
          Create comment
        </Button>
      </Flex>
    </Flex>
  );
});

export default BookCommentForm;
