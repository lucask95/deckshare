import React, { useState } from "react";
import Card from "../models/cardModel";
import { DeckCards } from "../models/deckModel";
import CardList from "../src/CardList";
import Layout from "../src/Layout";
import CardSearch from "../src/Search";

export default function Index() {
  const [deckList, setDeckList] = useState<DeckCards>({});

  const addCard = (card: Card) => {
    const newList = { ...deckList };

    if (card.card_name in newList) {
      newList[card.card_name].count++;
    } else {
      newList[card.card_name] = {
        data: card,
        count: 1,
      };
    }

    setDeckList(newList);
  };

  return (
    <Layout>
      {/* search */}
      <CardSearch addCard={addCard} />

      {/* cards */}
      <CardList cards={deckList} />

      {/* stats */}
      <div>Stats placeholder</div>
    </Layout>
  );
}
