# Bookreads Frontend Example

## Tech Stack

[React](https://reactjs.org/), [Next.js 9](https://nextjs.org/), [MobX](https://mobx.js.org/), [MobX State Tree](https://github.com/mobxjs/mobx-state-tree), [`mst-gql`](https://github.com/mobxjs/mst-gql), [Chakra UI](https://chakra-ui.com/), [TypeScript](https://www.typescriptlang.org/)

## How to Use

```bash
yarn
yarn dev
```

GraphQL endpoint is hardcoded to [http://localhost:4000](http://localhost:4000). Please spin up the backend in advance.

## TODOs, Bugs and Limitations

- Rewrite forms with Formik, get rid of UI stores completely
- Better modularize components, refactor repetitive `<Box />` etc. into their own components
- Current implementation of authentication is not complete. Users can visit protected paths with invalid token (but an error will be rendered). We either need to find a better solution to do this with `mst-gql`, or rewrite with Apollo and co. Shouldn't need to manually reset token before each auth query/mutation
- Sometimes updates returned from mutations don't get saved to local storage - server renders correctly, but picked up by client-side `mst-gql` which flashes the page back to the outdated version
- Making new searches on the search results page sometimes works, most of the times not. Works 100% when directly visiting `/search?q=blah` or hard refreshing, so SSR works. Possibly faulty handling of getInitialProps etc, or same reason as the previous point. Need to dig into `useQuery`
- Dark mode breaks at some places on SSR
- Not implemented on frontend but supported by the backend include: updating comments, adding new authors or genres, public user profile page, etc.
