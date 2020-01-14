import * as React from "react";
import { Box } from "@chakra-ui/core";
import { CommentModelType } from "../../models";

type Props = CommentModelType;

const BookCommentCard = (props: Props) => {
  console.log("props.rating", props);
  return (
    <Box maxW="xl" borderWidth="1px" rounded="lg" padding={4} margin={3}>
      <Box display="flex" alignItems="baseline" justifyContent="space-between">
        <Box
          maxWidth={350}
          color="gray.500"
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="sm"
          textTransform="uppercase"
          isTruncated
        >
          {props.user.name}
        </Box>
        <Box>
          <Box as="span" fontWeight="semibold" fontStyle="italic">
            {props.rating + ""}
          </Box>
          <Box
            as="span"
            color="gray.600"
            fontSize="sm"
            marginRight={2}
            fontStyle="italic"
          >
            /5 stars
          </Box>
        </Box>
      </Box>

      <Box marginTop={4}>{props.content ?? "The content is left empty."}</Box>
    </Box>
  );
};

export default BookCommentCard;
