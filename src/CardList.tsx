import { ButtonBase, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { DeckCards, DeckCardData } from "../models/deckModel";

const useStyles = makeStyles({
  cardItemContainer: {
    borderRadius: 5,
    border: "1px solid #c4c4c4",
  },
  cardItem: {
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderTop: "1px solid #c4c4c4",
    "&:first-child": {
      borderTop: "none",
    },
  },
  simpleButton: {
    width: 30,
    height: 30,
    borderRadius: 999,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 2.5px",
    transition: "background-color .1s",
  },
  defaultButton: {
    backgroundColor: "#999999",
    color: "white",
    "&:hover": {
      backgroundColor: "#ababab",
    },
  },
  primaryButton: {
    backgroundColor: "#2173de",
    color: "white",
    "&:hover": {
      backgroundColor: "#428beb",
    },
  },
  redButton: {
    backgroundColor: "#c22b2b",
    color: "white",
    "&:hover": {
      backgroundColor: "#e04c4c",
    },
  },
});

const SimpleButton = ({ children, cssClass, ...props }: any) => {
  const classes = useStyles();
  return (
    <ButtonBase
      className={`${classes.simpleButton} ${cssClass ?? ""}`}
      {...props}
    >
      <Typography variant='body1'>{children}</Typography>
    </ButtonBase>
  );
};

interface CardListProps {
  cards: DeckCards;
  setCardAmount: Function;
}

const CardList: React.FC<CardListProps> = ({ cards, setCardAmount }) => {
  const classes = useStyles();

  if (!Object.entries(cards).length)
    return (
      <div className={classes.cardItemContainer}>
        <div className={classes.cardItem}>No cards in deck</div>
      </div>
    );

  return (
    <div className={classes.cardItemContainer}>
      {Object.entries(cards).map((card) => {
        const cardName: string = card[0];
        const cardData: DeckCardData = card[1];

        return (
          <div key={cardData.data.id} className={classes.cardItem}>
            <SimpleButton
              cssClass={classes.redButton}
              onClick={() => {
                setCardAmount(cardData.data, 0);
              }}
            >
              x
            </SimpleButton>

            <SimpleButton
              cssClass={classes.primaryButton}
              onClick={() => {
                setCardAmount(cardData.data, cardData.count - 1);
              }}
            >
              -
            </SimpleButton>

            <SimpleButton
              cssClass={classes.primaryButton}
              onClick={() => {
                setCardAmount(cardData.data, cardData.count + 1);
              }}
            >
              +
            </SimpleButton>

            <SimpleButton
              cssClass={classes.primaryButton}
              onClick={() => {
                setCardAmount(cardData.data, 4);
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
