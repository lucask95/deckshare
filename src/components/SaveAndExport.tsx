import { Button } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";
import { DeckCards } from "../../models/deckModel";
import serverUrl from "../../util/config";

interface Props {
  deckList: DeckCards;
  sideboard: DeckCards;
  editDisabled?: boolean;
}

const SaveAndExport: React.FC<Props> = ({
  deckList,
  sideboard,
  editDisabled,
}) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const body = {
        mainboard: deckList,
        sideboard: sideboard,
      };
      const res = await fetch(`${serverUrl}/api/decks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.id) router.push(`deck/${data.id}`);
    } catch (error) {
      console.error("Error saving deck:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {!editDisabled && (
        <Button
          variant="text"
          color="primary"
          disableElevation
          style={{ marginRight: 10 }}
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          Save Deck
        </Button>
      )}
      <Button variant="text" color="primary" disableElevation>
        Export Deck
      </Button>
    </div>
  );
};

export default SaveAndExport;
