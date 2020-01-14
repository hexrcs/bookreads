import React from "react";
import { InputGroup, InputLeftElement, Input, Icon } from "@chakra-ui/core";

// @@NOT_IN_USE

type Props = {
  type: string;
  name: string;
  value: string;
  placeholder?: string;
  icon?: "email" | "lock";
};

function FormField(props: Props) {
  return (
    <InputGroup>
      <InputLeftElement
        children={<Icon name={props.icon} color="gray.300" />}
      />
      <Input
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        // onChange={(e: React.FormEvent<HTMLInputElement>) => {
        //   s.suEmail = e.currentTarget.value;
        // }}
      />
    </InputGroup>
  );
}

export default FormField;
