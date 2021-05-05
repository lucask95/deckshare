import React, { useState } from "react";
import CardModel from "../models/cardModel";
import CardList from "../src/CardList";
import Layout from "../src/Layout";
import CardSearch from "../src/Search";

export default function Index() {
  const [cardList, setCardList] = useState<CardModel[]>([]);

  const addCard = (card: CardModel) => {
    setCardList([...cardList, card]);
  };

  return (
    <Layout>
      {/* search */}
      <CardSearch addCard={addCard} />

      {/* cards */}
      <CardList cards={cardList} />

      {/* stats */}
      <div>Stats placeholder</div>
    </Layout>
  );
}
