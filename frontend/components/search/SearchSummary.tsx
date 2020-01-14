import * as React from "react";
import { Text, Flex } from "@chakra-ui/core";

type Props = {
  count: number;
  keywords: string;
};

const SearchSummary = (props: Props) => (
  <Flex flexDirection="column" alignItems="center" margin={10}>
    <Text fontSize="xl">
      Found {props.count} result(s) for "{props.keywords}"
    </Text>
  </Flex>
);

export default SearchSummary;
