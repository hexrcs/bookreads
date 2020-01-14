import * as React from "react";
import NextLink from "next/link";
import { Image, Box, Grid, Link } from "@chakra-ui/core";
import { BookModelType } from "../../models";

type Props = BookModelType;

const SearchResultCard = (props: Props) => {
  console.log("props.rating", props);
  return (
    <Grid
      maxW="xl"
      borderWidth="1px"
      rounded="lg"
      templateColumns="1fr 3fr"
      gap={6}
      padding={1}
      margin={3}
    >
      <Image
        maxH="sm"
        src={
          props.coverUrl ??
          `http://covers.openlibrary.org/b/isbn/${props.isbn}-M.jpg`
        }
        alt={props.name}
      />
      <Box padding="3" maxHeight="sm">
        <Box display="flex" alignItems="baseline">
          <Box
            maxWidth={350}
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="sm"
            textTransform="uppercase"
            isTruncated
          >
            {props.authors.map(x => x.name).join(" • ")}
          </Box>
        </Box>

        <Box
          marginTop="1"
          maxWidth={350}
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          fontSize="2xl"
          isTruncated
        >
          {props.name}
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
          <Box as="span">{props.comments.length} reviews</Box>
        </Box>

        <Box maxHeight="xs" marginTop={1}>
          {(props.description ?? "No description yet.").substring(0, 130)}...
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
          <Box maxWidth={300} color="gray.500" isTruncated>
            Genre: {props.genres.map(x => x.name).join(", ")}
          </Box>
          <NextLink href={`/book/${props.id}`}>
            <Link>Details</Link>
          </NextLink>
        </Box>
      </Box>
    </Grid>
  );
};

export default SearchResultCard;
