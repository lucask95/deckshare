import { Button } from "@material-ui/core";
import React from "react";
import { DeckCards } from "../models/deckModel";
import serverUrl from "../util/config";

interface Props {
  deckList: DeckCards;
  sideboard: DeckCards;
}

const SaveAndExport: React.FC<Props> = ({ deckList, sideboard }) => {
  const handleSubmit = async () => {
    try {
      const body = {
        mainboard: deckList,
        sideboard: sideboard,
      };
      const res = await fetch(`${serverUrl}/api/deck`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const response = await res.json();
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Button
        variant="text"
        color="primary"
        disableElevation
        style={{ marginRight: 10 }}
        onClick={handleSubmit}
      >
        Save Deck
      </Button>
      <Button variant="text" color="primary" disableElevation>
        Export Deck
      </Button>
    </div>
  );
};

export default SaveAndExport;
