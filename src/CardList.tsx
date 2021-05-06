import { ButtonBase, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { DeckCards, DeckCardData } from "../models/deckModel";
import Mana from "./Mana";

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
  cardSectionHeader: {
    padding: "8px 12px",
    backgroundColor: "#d6d6d6",
    fontSize: ".75rem",
    textTransform: "uppercase",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
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

interface CardItemProps {
  cardName: string;
  cardData: DeckCardData;
  setCardAmount: Function;
}

const CardItem: React.FC<CardItemProps> = ({
  cardName,
  cardData,
  setCardAmount,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.cardItem}>
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
        <Typography>{cardName}</Typography>
        <Mana manaCost={cardData.data.mana_cost} />
      </div>
    </div>
  );
};

interface CardListProps {
  cards: DeckCards;
  setCardAmount: Function;
}

const CardList: React.FC<CardListProps> = ({ cards, setCardAmount }) => {
  const classes = useStyles();
  // const numCards = Object.entries(cards)
  //   .map((card) => card[1].count)
  //   .reduce((a, b) => a + b, 0);

  const creatures = Object.entries(cards).filter((card) =>
    card[1].data.card_type.includes("Creature")
  );
  const lands = Object.entries(cards).filter((card) =>
    card[1].data.card_type.includes("Land")
  );
  const noncreatures = Object.entries(cards).filter((card) => {
    const type = card[1].data.card_type;
    if (type.includes("Creature") || type.includes("Land")) return false;
    return true;
  });

  const creatureCount = creatures
    .map((card) => card[1].count)
    .reduce((a, b) => a + b, 0);
  const landCount = lands
    .map((card) => card[1].count)
    .reduce((a, b) => a + b, 0);
  const noncreatureCount = noncreatures
    .map((card) => card[1].count)
    .reduce((a, b) => a + b, 0);
  const totalCount = creatureCount + landCount + noncreatureCount;

  const arranged = [
    { name: "Creatures", data: creatures, count: creatureCount },
    { name: "Non-Creatures", data: noncreatures, count: noncreatureCount },
    { name: "Lands", data: lands, count: landCount },
  ];

  if (!Object.entries(cards).length)
    return (
      <div className={classes.cardItemContainer}>
        <div className={classes.cardItem}>No cards in deck</div>
      </div>
    );

  return (
    <React.Fragment>
      <div style={{ marginBottom: 10 }}>{totalCount} cards</div>
      <div className={classes.cardItemContainer}>
        {arranged.map((entry) => {
          if (!entry.data.length) return <React.Fragment></React.Fragment>;
          return (
            <React.Fragment key={entry.name}>
              <div className={classes.cardSectionHeader}>
                <div>{entry.name}</div>
                <div>{entry.count}</div>
              </div>
              {entry.data.map((card) => (
                <CardItem
                  key={card[1].data.id}
                  cardName={card[0]}
                  cardData={card[1]}
                  setCardAmount={setCardAmount}
                />
              ))}
            </React.Fragment>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default CardList;
