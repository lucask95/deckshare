import { ButtonBase, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import Card from "../models/cardModel";
import { DeckCards, DeckCardData } from "../models/deckModel";

const useStyles = makeStyles({
  cardItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  simpleButton: {
    width: 30,
    height: 30,
    borderRadius: 999,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

const SimpleButton = ({ children, ...props }: any) => {
  const classes = useStyles();
  return (
    <ButtonBase className={classes.simpleButton} {...props}>
      <Typography variant='body1'>{children}</Typography>
    </ButtonBase>
  );
};

interface CardListProps {
  cards: DeckCards;
}

const CardList: React.FC<CardListProps> = ({ cards }) => {
  const classes = useStyles();

  const handleRemoveAll = (card: Card) => {
    console.log("Remove all:", card);
  };

  const handleRemove = (card: Card) => {
    console.log("Remove card:", card);
  };

  const handleAdd = (card: Card) => {
    console.log("Add card:", card);
  };

  const handleSetToFour = (card: Card) => {
    console.log("Set to four:", card);
  };

  return (
    <div>
      {Object.entries(cards).map((card) => {
        const cardName: string = card[0];
        const cardData: DeckCardData = card[1];

        return (
          <div key={cardData.data.id} className={classes.cardItem}>
            <SimpleButton
              onClick={() => {
                handleRemoveAll(cardData.data);
              }}
            >
              x
            </SimpleButton>

            <SimpleButton
              onClick={() => {
                handleRemove(cardData.data);
              }}
            >
              -
            </SimpleButton>

            <SimpleButton
              onClick={() => {
                handleAdd(cardData.data);
              }}
            >
              +
            </SimpleButton>

            <SimpleButton
              onClick={() => {
                handleSetToFour(cardData.data);
              }}
            >
              4
            </SimpleButton>

            <div style={{ margin: "0 15px" }}>
              <Typography variant='body1'>{cardData.count}</Typography>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flex: 1,
              }}
            >
              <div>{cardName}</div>
              <div>{cardData.data.mana_cost}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CardList;
