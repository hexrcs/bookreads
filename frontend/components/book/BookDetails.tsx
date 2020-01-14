import * as React from "react";
import {
  Heading,
  Text,
  Box,
  Grid,
  Image,
  Stack,
  Flex,
  Icon
} from "@chakra-ui/core";
import { BookModelType } from "../../models";

type Props = BookModelType;

const BookDetails = (props: Props) => (
  <Flex flexDirection="column" alignItems="center" margin={10}>
    <Grid
      maxWidth="5xl"
      templateColumns="2fr 5fr"
      gap={8}
      paddingX={6}
      paddingY={1}
    >
      <Image
        maxHeight="sm"
        src={
          props.coverUrl ??
          `http://covers.openlibrary.org/b/isbn/${props.isbn}-M.jpg`
        }
        alt={props.name}
      />

      <Flex
        paddingBottom="10"
        paddingTop="6"
        maxHeight="sm"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box marginTop="1" maxWidth={350}>
          <Heading>{props.name}</Heading>

          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="md"
            textTransform="uppercase"
            isTruncated
          >
            by {props.authors.map(x => x.name).join(" • ")}
          </Box>
          <Box
            display="flex"
            alignItems="baseline"
            justifyContent="space-between"
            marginTop={1}
            fontWeight="semibold"
            fontSize="xs"
            letterSpacing="wide"
            textTransform="uppercase"
          >
            <Box maxWidth="xl" color="gray.500">
              Genre: {props.genres.map(x => x.name).join(", ")}
            </Box>
          </Box>
        </Box>
        <Box>
          <Box display="flex" marginTop="2" alignItems="center">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <Icon
                  name="star"
                  key={i}
                  color={i < props.rating ? "orange.500" : "gray.300"}
                />
              ))}
            <Box as="span" marginLeft={3}>
              {props.comments.length} reviews
            </Box>
          </Box>
        </Box>
      </Flex>
    </Grid>

    <Stack
      maxW="3xl"
      marginTop={10}
      padding={10}
      borderWidth="1px"
      rounded="lg"
    >
      <Heading as="h3" size="md">
        Description
      </Heading>
      <Text>{props.description ?? "No description yet."}</Text>
    </Stack>
  </Flex>
);

export default BookDetails;
