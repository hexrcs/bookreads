import * as React from "react";
import Router from "next/router";
import { observer } from "mobx-react";
import {
  Heading,
  Box,
  Stack,
  Flex,
  Icon,
  InputGroup,
  InputLeftElement,
  Input,
  Button
} from "@chakra-ui/core";
import { useQuery, RootStoreType } from "../../models";
import { PROFILE_ROUTE } from "../../consts";
import s from "../../stores/uiStore";

// //TODO: rewrite everything with Formik
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import FormField from "./FormField";

const handleSignup = async (store: RootStoreType) => {
  if (!(s.suEmail && s.suPassword && s.suName)) return; // no error handling or checking for now

  store.signup(s.suName, s.suEmail, s.suPassword);
  Router.push(PROFILE_ROUTE);
  s.clearSu();
};

const SignupForm = observer(() => {
  const { store } = useQuery();

  return (
    <Box borderRadius={4} borderWidth={1} padding={4} minHeight={"xs"}>
      <Box marginBottom={8}>
        <Heading textAlign="center" fontSize="2xl" color="gray.600">
          Create a new account
        </Heading>
      </Box>
      <Stack spacing={4}>
        <InputGroup>
          <InputLeftElement children={<Icon color="gray.300" />} />
          <Input
            type="text"
            placeholder="Name"
            value={s.suName}
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              s.suName = e.currentTarget.value;
            }}
          />
        </InputGroup>

        <InputGroup>
          <InputLeftElement children={<Icon name="email" color="gray.300" />} />
          <Input
            type="email"
            placeholder="Email"
            value={s.suEmail}
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              s.suEmail = e.currentTarget.value;
            }}
          />
        </InputGroup>

        <InputGroup>
          <InputLeftElement children={<Icon name="lock" color="gray.300" />} />
          <Input
            type="password"
            placeholder="Password"
            value={s.suPassword}
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              s.suPassword = e.currentTarget.value;
            }}
          />
        </InputGroup>
      </Stack>
      <Flex justifyContent="center">
        <Button
          variantColor="green"
          marginTop={6}
          marginBottom={2}
          onClick={() => handleSignup(store)}
        >
          Sign Up
        </Button>
      </Flex>
    </Box>
  );
});

// // WIP don't use

// const SignupForm = () => (
//   <div>
//     <h1>Any place in your app!</h1>
//     <Formik
//       initialValues={{ email: "", password: "" }}
//       validate={values => {
//         const errors: { email?: string; password?: string } = {};
//         if (!values.email) {
//           errors.email = "Required";
//         } else if (
//           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
//         ) {
//           errors.email = "Invalid email address";
//         }
//         return errors;
//       }}
//       onSubmit={(values, { setSubmitting }) => {
//         setTimeout(() => {
//           alert(JSON.stringify(values, null, 2));
//           setSubmitting(false);
//         }, 400);
//       }}
//     >
//       {({ isSubmitting, values }) => (
//         <Form>
//           <Field
//             type="email"
//             name="email"
//             component={
//               <FormField
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={values.email}
//               />
//             }
//           />
//           <ErrorMessage name="email" component="div" />
//           <Field
//             type="password"
//             name="password"
//             component={
//               <FormField
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={values.password}
//               />
//             }
//           />
//           <ErrorMessage name="password" component="div" />
//           <button type="submit" disabled={isSubmitting}>
//             Submit
//           </button>
//         </Form>
//       )}
//     </Formik>
//   </div>
// );

export default SignupForm;
