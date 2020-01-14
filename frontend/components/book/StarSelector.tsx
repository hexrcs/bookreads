import * as React from "react";
import { observer } from "mobx-react";
import { Flex, Box, Icon, Text } from "@chakra-ui/core";
import s from "../../stores/uiStore";

const StarSelector = observer(props => {
  return (
    <Flex flexDirection="column" alignItems="center">
      <Box display="flex" marginTop="2" alignItems="center">
        <Text marginRight={2}>My rating: </Text>
        {Array(5)
          .fill("")
          .map((_, i) => (
            <Icon
              name="star"
              key={i}
              onClick={() => (s.rating = i + 1)}
              style={{ cursor: "pointer" }}
              color={i < s.rating ? "orange.500" : "gray.300"}
            />
          ))}
      </Box>
    </Flex>
  );
});

export default StarSelector;
