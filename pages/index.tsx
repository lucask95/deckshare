import React, { useState } from "react";
import Card from "../models/cardModel";
import { DeckCards } from "../models/deckModel";
import CardList from "../src/CardList";
import Layout from "../src/Layout";
import CardSearch from "../src/Search";

export default function Index() {
  const [deckList, setDeckList] = useState<DeckCards>({});

  const setCardAmount = (card: Card, amount: number) => {
    const newList = { ...deckList };

    if (amount <= 0) {
      delete newList[card.card_name];
    } else {
      newList[card.card_name] = {
        data: card,
        count: amount,
      };
    }

    setDeckList(newList);
  };

  const addCard = (card: Card) => {
    setCardAmount(card, 1);
  };

  return (
    <Layout>
      {/* search */}
      <CardSearch addCard={addCard} />

      {/* cards */}
      <CardList cards={deckList} setCardAmount={setCardAmount} />

      {/* stats */}
      <div>Stats placeholder</div>
    </Layout>
  );
}
