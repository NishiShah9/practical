import React, { useEffect, useState } from "react";
import { Spin, Row, Input } from "antd";
import SubCard from "./SubCard";
const { Search } = Input;

function Home() {
  const [data, setData] = useState([]); // article lists
  const [loading, setLoading] = useState(false); // loader
  const [search, setSearch] = useState(null); // search value
  const [loadMore, setLoadMore] = useState(false); // load more data
  const [page, setPage] = useState(0); // current page
  const pageLimit = 20; // data per page

  // get the list of data
  useEffect(() => {
    getData(page);
  }, []);

  // get more date based on page
  useEffect(() => {
    if (loadMore) {
      let newPage = page + 1;
      getData(newPage);
    }
  }, [loadMore]);

  // get data again when search
  useEffect(() => {
    getData(0);
  }, [search]);

  // get the data list form api
  const getData = (page) => {
    setLoading(true);
    let url = `https://hn.algolia.com/api/v1/search?hitsPerPage=${pageLimit}&page=${page}`;
    if (search) {
      url = url + `&query=${search}`;
    }
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        if (loadMore) {
          let newData = data.concat(result?.hits);
          setData(newData);
          setLoadMore(false);
        } else {
          setData(result?.hits);
        }
        setPage(page);
        setLoading(false);
      });
  };

  // set the search value
  const onSearch = (value) => {
    setSearch(value);
  };

  // scroll function for infinte scroll
  const onScroll = (event) => {
    const target = event.target;
    // scroll height - scroll top = client height, so will reach bottom of the page So get more data
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      setLoadMore(true);
    }
  };

  return (
    <div>
      <h1 className="title">Article Lists </h1>
      <div className="search-bar">
        <Search
          placeholder="Search Here"
          allowClear
          enterButton="Search"
          size="large"
          style={{ width: 604 }}
          onSearch={onSearch}
        />
      </div>
      {loading && (
        <div>
          <Spin size="large" className="loader" />
        </div>
      )}
      <div className="content" onScroll={onScroll}>
        <Row gutter={[16, 16]}>
          {data?.map((item) => {
            return <SubCard item={item} key={item?.objectID} />;
          })}
        </Row>
        {!loading && data.length == 0 && (
          <div className="no-data">
            <h2>No Article found</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
