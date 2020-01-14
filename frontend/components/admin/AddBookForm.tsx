import * as React from "react";
import Router from "next/router";
import { observer } from "mobx-react";
import {
  Heading,
  Box,
  Stack,
  Flex,
  InputGroup,
  Input,
  Button,
  Textarea,
  Grid
} from "@chakra-ui/core";
import { useQuery, RootStoreType } from "../../models";
import s from "../../stores/uiStore";

const handleAddNewBook = async (store: RootStoreType) => {
  if (!(s.bookTitle && s.bookDescription && s.isbn && s.authors && s.genres))
    return; // no error handling or checking for now
  store.selfSetToken();
  const authors = await store.queryListAuthors();
  const genres = await store.queryListGenres();

  const userAuthors = s.authors.split(/\s*;\s*/);
  const userGenres = s.genres.split(/\s*;\s*/);

  console.log("userAuthors", userAuthors);
  console.log("userGenres", userGenres);

  // TODO: create new author if not exists. right now we are ignoring new authors not in the list
  const authorIDs = userAuthors
    .map(
      x =>
        authors.listAuthors.find(y => y.name?.toLowerCase() === x.toLowerCase())
          ?.id
    )
    // gotta love typescript ;)
    // https://github.com/microsoft/TypeScript/issues/7657#issuecomment-228697078
    .filter((x): x is string => typeof x === "string");
  console.log("authorIDs", authorIDs);

  const genreIDs = userGenres
    .map(
      x =>
        genres.listGenres.find(y => y.name?.toLowerCase() === x.toLowerCase())
          ?.id
    )
    .filter((x): x is string => typeof x === "string");
  console.log("genreIDs", genreIDs);

  // TODO: error handling when isbn already exists
  const bookID = (
    await store.mutateCreateBook({
      name: s.bookTitle,
      description: s.bookDescription,
      isbn: s.isbn,
      authors: authorIDs,
      genres: genreIDs,
      coverUrl: s.coverUrl
    })
  ).createBook.id;
  s.clearAddBookForm();

  Router.push("/book/" + bookID);
};

const AddBookForm = observer(() => {
  const { store } = useQuery();

  return (
    <Flex flexDirection="column" alignItems="center" padding={10}>
      <Box marginBottom={8} width="xl">
        <Heading textAlign="center" fontSize="xl" color="gray.600">
          Add a new book
        </Heading>
      </Box>
      <Stack spacing={4} width="xl">
        <Grid width="xl" templateColumns="5fr 2fr" gap={2}>
          <InputGroup>
            <Input
              type="text"
              placeholder="Book Title"
              value={s.bookTitle}
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                s.bookTitle = e.currentTarget.value;
              }}
            />
          </InputGroup>
          <InputGroup>
            <Input
              type="text"
              placeholder="ISBN"
              value={s.isbn}
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                s.isbn = e.currentTarget.value;
              }}
            />
          </InputGroup>
        </Grid>
        {/* use downshift to autocomplete/autosuggest authors and genres */}
        {/* right now not ergonomic at all */}
        <Grid width="xl" templateColumns="1fr 1fr" gap={2}>
          <InputGroup>
            <Input
              type="text"
              placeholder="Authors, separated by semicolons"
              value={s.authors}
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                s.authors = e.currentTarget.value;
              }}
            />
          </InputGroup>
          <InputGroup>
            <Input
              type="text"
              placeholder="Genres, separated by semicolons"
              value={s.genres}
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                s.genres = e.currentTarget.value;
              }}
            />
          </InputGroup>
        </Grid>
        <InputGroup>
          <Input
            type="text"
            placeholder="Cover URL (optional)"
            value={s.coverUrl}
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              s.coverUrl = e.currentTarget.value;
            }}
          />
        </InputGroup>
        <Textarea
          placeholder="Enter book description"
          value={s.bookDescription}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            s.bookDescription = e.currentTarget.value;
          }}
          height={120}
        ></Textarea>
      </Stack>
      <Flex justifyContent="center">
        <Button
          variantColor="green"
          margin={6}
          onClick={() => handleAddNewBook(store)}
        >
          Submit new book
        </Button>
      </Flex>
    </Flex>
  );
});

export default AddBookForm;
