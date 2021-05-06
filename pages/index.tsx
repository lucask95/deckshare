import { Typography } from "@material-ui/core";
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
      <div style={{ marginBottom: 35 }}>
        <Typography variant='h6' gutterBottom>
          Search
        </Typography>
        <CardSearch addCard={addCard} />
      </div>

      {/* cards */}
      <div style={{ flex: 1 }}>
        <Typography variant='h6' gutterBottom>
          Decklist
        </Typography>
        <CardList cards={deckList} setCardAmount={setCardAmount} />
      </div>

      {/* stats */}
      <div style={{ marginTop: 35 }}>
        <Typography variant='h6' gutterBottom>
          Statistics
        </Typography>
        Stats placeholder
      </div>
    </Layout>
  );
}
