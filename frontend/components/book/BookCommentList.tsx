import * as React from "react";
import { Stack, Flex, Heading } from "@chakra-ui/core";
import BookCommentCard from "./BookCommentCard";
import { CommentModelType } from "../../models";

type Props = {
  commentCards: CommentModelType[];
};

const BookCommentList = (props: Props) => {
  return (
    <Flex flexDirection="column" alignItems="center" marginBottom={5}>
      <Heading as='h3' fontSize='lg'>Comments</Heading>
      <Stack>
        {props.commentCards.map(x => (
          <BookCommentCard {...x} key={x.id} />
        ))}
      </Stack>
    </Flex>
  );
};

export default BookCommentList;
