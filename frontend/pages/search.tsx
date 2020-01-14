import { NextPage, NextPageContext } from "next";
import { observer } from "mobx-react";
import Layout from "../components/Layout";
import SearchSummary from "../components/search/SearchSummary";
import SearchResultList from "../components/search/SearchResultList";
import { useQuery } from "../models";

type Props = {
  q?: string;
  errors?: string;
};

const SearchPage: NextPage<Props> = observer(props => {
  // TODO: rethink how to handle empty search params. list all or ignore?
  if (props.errors || !props.q) {
    console.log(props.q);
    return <div>Errors</div>;
  }

  const keywords = props.q;
  // TODO: this hook is buggy. mst-gql sometimes doesn't fetch new results, have to refresh page
  // tried tweaking options, nothing. keywords is get successfully though, just the damn query
  // won't get fetched
  const { data } = useQuery(store =>
    store.querySearch({ keywords }, msg => {
      return msg
        .authors(a => a.name)
        .genres(g => g.name)
        .comments(c => c.rating).name.id.isbn.description;
    })
  );

  return (
    <Layout title="Users List | Next.js + TypeScript Example">
      <SearchSummary
        count={data?.search.map(x => x.name).length ?? 0}
        keywords={keywords}
      ></SearchSummary>
      <SearchResultList
        // mst view is a bit naughty here
        resultCards={data?.search.map(x => ({ ...x, rating: x.rating })) ?? []}
      ></SearchResultList>
    </Layout>
  );
});

SearchPage.getInitialProps = async ({ query }: NextPageContext) => {
  try {
    const { q } = query;
    if (typeof q !== "string")
      throw Error(
        "This is messed up, man. Check your query: " + JSON.stringify(query)
      );
    return { q };
  } catch (err) {
    console.error(err);
    return { errors: err.message };
  }
};

export default SearchPage;
