import { Typography } from '@material-ui/core';
import React, { useState } from 'react';
import Card from '../models/cardModel';
import { DeckCards } from '../models/deckModel';
import CardList from '../src/CardList';
import DeckStats from '../src/DeckStats';
import Layout from '../src/Layout';
import CardSearch from '../src/Search';

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

  const moveToSideboard = (card: Card) => {
    const newList = { ...deckList };
    const newSb = { ...sideboard };
    const mbCount = newList[card.card_name].count;

    delete newList[card.card_name];

    if (newSb[card.card_name]) newSb[card.card_name].count += mbCount;
    else
      newSb[card.card_name] = {
        data: card,
        count: mbCount,
      };

    setDeckList(newList);
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
        <Typography variant="h6" gutterBottom>
          Decklist
        </Typography>
        <CardList
          cards={deckList}
          sideboard={sideboard}
          setCardAmount={setCardAmount}
          moveToSideboard={moveToSideboard}
          setSideboardCardAmount={setSideboardCardAmount}
        />
      </div>

      {/* stats */}
      <div style={{ marginTop: 35 }}>
        <Typography variant="h6" gutterBottom>
          Statistics
        </Typography>
        <DeckStats deckList={deckList} />
      </div>
    </Layout>
  );
}
