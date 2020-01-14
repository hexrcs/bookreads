import * as React from "react";
import { Stack, Flex } from "@chakra-ui/core";
import { BookModelType } from "../../models";
import SearchResultCard from "./SearchResultCard";

type Props = {
  resultCards: BookModelType[];
};

const SearchResultList = (props: Props) => {
  return (
    <Flex flexDirection="column" alignItems="center" marginBottom={5}>
      <Stack>
        {props.resultCards.map(x => (
          <SearchResultCard {...x} key={x.id} />
        ))}
      </Stack>
    </Flex>
  );
};

export default SearchResultList;
