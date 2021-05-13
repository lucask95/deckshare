import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
} from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { DeckCards } from "../../models/deckModel";
import serverUrl from "../../util/config";

const useStyles = makeStyles({
  dialogContent: {
    padding: "0 20px 0px 20px",
  },
  dialogUrlDisplay: {
    border: "1px solid #c4c4c4",
    borderRadius: 5,
    padding: "8px 16px",
  },
});

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
  const classes = useStyles();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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
      <Dialog
        open={isPopupOpen}
        onClose={() => {
          setIsPopupOpen(false);
        }}
      >
        <DialogTitle>Share Deck</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <div className={classes.dialogUrlDisplay}>
            {`${serverUrl}${router.asPath}`}
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant="text"
            color="primary"
            style={{ marginRight: 10 }}
            onClick={() => {
              navigator.clipboard.writeText(`${serverUrl}${router.asPath}`);
              setIsPopupOpen(false);
            }}
          >
            Copy Link
          </Button>
        </DialogActions>
      </Dialog>
      {editDisabled ? (
        <Button
          variant="text"
          color="primary"
          disableElevation
          style={{ marginRight: 10 }}
          onClick={() => {
            setIsPopupOpen(true);
          }}
        >
          Share Deck
        </Button>
      ) : (
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
