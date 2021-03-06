import { Typography } from "@material-ui/core";
import React, { useState } from "react";
import Card from "../models/cardModel";
import { DeckCards } from "../models/deckModel";
import CardList from "../src/features/CardList";
import DeckStats from "../src/features/DeckStats";
import Layout from "../src/Layout";
import SaveAndExport from "../src/components/SaveAndExport";
import CardSearch from "../src/features/Search";

export default function Index() {
  const [deckList, setDeckList] = useState<DeckCards>({});
  const [sideboard, setSideboard] = useState<DeckCards>({});

  const setAmount = (addToSideboard: boolean, card: Card, amount: number) => {
    const newList = addToSideboard ? { ...sideboard } : { ...deckList };

    if (amount <= 0) {
      delete newList[card.card_name];
    } else {
      newList[card.card_name] = {
        data: card,
        count: amount,
      };
    }

    if (addToSideboard) setSideboard(newList);
    else setDeckList(newList);
  };

  const setSideboardCardAmount = (card: Card, amount: number) => {
    setAmount(true, card, amount);
  };

  const setCardAmount = (card: Card, amount: number) => {
    setAmount(false, card, amount);
  };

  const addCard = (card: Card) => {
    if (deckList[card.card_name])
      setCardAmount(card, deckList[card.card_name].count + 1);
    else setCardAmount(card, 1);
  };

  const swapBoard = (card: Card, cardIsInMainboard: boolean) => {
    const newMb = { ...deckList };
    const newSb = { ...sideboard };

    if (cardIsInMainboard) {
      const mbCount = newMb[card.card_name].count;

      delete newMb[card.card_name];

      if (newSb[card.card_name]) newSb[card.card_name].count += mbCount;
      else
        newSb[card.card_name] = {
          data: card,
          count: mbCount,
        };
    } else {
      const sbCount = newSb[card.card_name].count;

      delete newSb[card.card_name];

      if (newMb[card.card_name]) newMb[card.card_name].count += sbCount;
      else
        newMb[card.card_name] = {
          data: card,
          count: sbCount,
        };
    }

    setDeckList(newMb);
    setSideboard(newSb);
  };

  return (
    <Layout>
      {/* search */}
      <div style={{ marginBottom: 35 }}>
        <Typography variant="h6" gutterBottom>
          Search
        </Typography>
        <CardSearch addCard={addCard} />
      </div>

      {/* cards */}
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" gutterBottom>
            Decklist
          </Typography>
          <SaveAndExport deckList={deckList} sideboard={sideboard} />
        </div>
        <CardList
          cards={deckList}
          sideboard={sideboard}
          setCardAmount={setCardAmount}
          swapBoard={swapBoard}
          setSideboardCardAmount={setSideboardCardAmount}
        />
      </div>

      {/* stats */}
      <div style={{ marginTop: 35 }}>
        <Typography variant="h6" gutterBottom>
          Statistics
        </Typography>
        <DeckStats deckList={deckList} sideboard={sideboard} />
      </div>
    </Layout>
  );
}
