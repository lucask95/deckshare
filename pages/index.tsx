import React, { useState } from "react";
import Layout from "../src/Layout";
import CardSearch from "../src/Search";

export default function Index() {
  const [cardList, setCardList] = useState([]);

  return (
    <Layout>
      {/* search */}
      <CardSearch />

      {/* cards */}
      <div>Cards placeholder</div>

      {/* stats */}
      <div>Stats placeholder</div>
    </Layout>
  );
}
