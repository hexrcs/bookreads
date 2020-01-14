import { Flex, Heading } from "@chakra-ui/core";
import { NextPage } from "next";
import Layout from "../../components/Layout";
import SearchResultList from "../../components/search/SearchResultList";
import { useQuery } from "../../models";

const BookPage: NextPage = props => {
  const { data } = useQuery(store =>
    store.querySearch({ keywords: "" }, msg => {
      return msg
        .authors(a => a.name)
        .genres(g => g.name)
        .comments(c => c.rating).name.id.isbn.description;
    })
  );

  return (
    <Layout title="All books">
      <Flex flexDirection="column" alignItems="center" margin={10}>
        <Heading>All books in our database</Heading>
      </Flex>
      <SearchResultList
        // mst view is a bit naughty here
        resultCards={data?.search.map(x => ({ ...x, rating: x.rating })) ?? []}
      ></SearchResultList>
    </Layout>
  );
};

export default BookPage;
