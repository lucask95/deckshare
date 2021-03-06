import { Typography } from "@material-ui/core";
import { GetServerSideProps } from "next";
import React from "react";
import { Deck } from "../../models/deckModel";
import CardList from "../../src/features/CardList";
import DeckStats from "../../src/features/DeckStats";
import Layout from "../../src/Layout";
import SaveAndExport from "../../src/components/SaveAndExport";
import serverUrl from "../../util/config";

interface Props {
  deck: Deck;
}

const Home: React.FC<Props> = ({ deck }) => {
  const mainboard = deck.mainboard ?? {};
  const sideboard = deck.sideboard ?? {};

  return (
    <Layout>
      {/* cards */}
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" gutterBottom>
            Decklist
          </Typography>
          <SaveAndExport
            deckList={mainboard}
            sideboard={sideboard}
            editDisabled={true}
          />
        </div>
        <CardList
          cards={mainboard}
          sideboard={sideboard}
          setCardAmount={() => {}}
          swapBoard={() => {}}
          setSideboardCardAmount={() => {}}
          editDisabled={true}
        />
      </div>

      {/* stats */}
      <div style={{ marginTop: 35 }}>
        <Typography variant="h6" gutterBottom>
          Statistics
        </Typography>
        <DeckStats deckList={mainboard} sideboard={sideboard} />
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const res = await fetch(`${serverUrl}/api/decks?id=${id}`);
  const data = await res.json();
  return {
    props: { deck: data },
  };
};

export default Home;
