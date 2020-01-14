import * as React from "react";
import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/core";
import { observer } from "mobx-react";
import s from "../stores/uiStore";
import { useQuery, RootStoreType } from "../models";
import Router from "next/router";

const handleSearch = async (store: RootStoreType) => {
  // const data = await store.querySearch({ keywords: s.searchFieldInput });
  const searchPath =
    "/" + new URLSearchParams({ q: s.searchFieldInput }).toString();
  console.log("navigating to", searchPath);

  // Router.push(searchPath);
  Router.push({
    pathname: "/search",
    query: { q: s.searchFieldInput }
  });
};

const SearchBar = observer(() => {
  const { store } = useQuery();

  return (
    <InputGroup size="md">
      <Input
        paddingRight="4.5rem"
        placeholder="Search for books"
        value={s.searchFieldInput}
        onChange={(e: React.FormEvent<HTMLInputElement>) => {
          s.searchFieldInput = e.currentTarget.value;
        }}
        onKeyPress={(e: React.KeyboardEvent) => {
          if (e.key === "Enter") {
            handleSearch(store);
          }
        }}
      />
      <InputRightElement width="4.5rem">
        <Button
          height="1.75rem"
          size="sm"
          onClick={() => handleSearch(store)}
          margin={2}
        >
          Search
        </Button>
      </InputRightElement>
    </InputGroup>
  );
});

export default SearchBar;
