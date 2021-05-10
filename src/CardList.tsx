import {
  ButtonBase,
  makeStyles,
  Typography,
  Theme,
  createStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Card from "../models/cardModel";
import { DeckCards, DeckCardData } from "../models/deckModel";
import CardDisplay from "./CardDisplay";
import Mana from "./Mana";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
      transition: "background-color .05s",
      "&:first-child": {
        borderTop: "none",
      },
      "&:hover": {
        backgroundColor: "#e8f9ff",
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
      borderRadius: 7,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      margin: "0 1.5px",
      transition: "background-color .05s",
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
    greenButton: {
      backgroundColor: "#3c8f52",
      color: "white",
      "&:hover": {
        backgroundColor: "#3c8f52",
      },
    },
    columnContainer: {
      display: "flex",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
      },
      [theme.breakpoints.up("md")]: {
        flexDirection: "row",
      },
    },
    listColumn: {
      padding: 10,
      [theme.breakpoints.down("lg")]: {
        flex: 5,
      },
      [theme.breakpoints.up("lg")]: {
        flex: 1,
      },
    },
    displayColumn: {
      padding: 10,
      [theme.breakpoints.down("lg")]: {
        flex: 3,
      },
      [theme.breakpoints.up("lg")]: {
        flex: 1,
      },
    },
  })
);

const SimpleButton = ({ children, cssClass, ...props }: any) => {
  const classes = useStyles();
  return (
    <ButtonBase
      className={`${classes.simpleButton} ${cssClass ?? ""}`}
      {...props}
    >
      <Typography variant="body1">{children}</Typography>
    </ButtonBase>
  );
};

interface CardItemProps {
  cardName: string;
  cardData: DeckCardData;
  setCardAmount: Function;
  setDisplayedCard: Function;
  swapBoard: Function;
  isSideboard: boolean;
}

const CardItem: React.FC<CardItemProps> = ({
  cardName,
  cardData,
  setCardAmount,
  setDisplayedCard,
  swapBoard,
  isSideboard,
}) => {
  const classes = useStyles();

  return (
    <div
      className={classes.cardItem}
      onMouseEnter={() => setDisplayedCard(cardData.data)}
    >
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
        cssClass={classes.greenButton}
        onClick={() => {
          swapBoard(cardData.data, isSideboard);
        }}
      >
        {isSideboard ? "MB" : "SB"}
      </SimpleButton>

      {/* <SimpleButton
        cssClass={classes.primaryButton}
        onClick={() => {
          setCardAmount(cardData.data, 4);
        }}
      >
        4
      </SimpleButton> */}

      <div style={{ margin: "0 15px" }}>
        <Typography variant="body1">{cardData.count}</Typography>
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
  sideboard: DeckCards;
  setCardAmount: Function;
  swapBoard: Function;
  setSideboardCardAmount: Function;
}

const CardList: React.FC<CardListProps> = ({
  cards,
  sideboard,
  setCardAmount,
  swapBoard,
  setSideboardCardAmount,
}) => {
  const classes = useStyles();
  const [displayedCard, setDisplayedCard] = useState<Card | undefined>(
    undefined
  );
  const [creatures, setCreatures] = useState<[string, DeckCardData][]>([]);
  const [lands, setLands] = useState<[string, DeckCardData][]>([]);
  const [noncreatures, setNoncreatures] = useState<[string, DeckCardData][]>(
    []
  );
  const [creatureCount, setCreatureCount] = useState(0);
  const [landCount, setLandCount] = useState(0);
  const [noncreatureCount, setNoncreatureCount] = useState(0);
  const [sideboardCount, setSideboardCount] = useState(0);
  const totalCount = creatureCount + landCount + noncreatureCount;

  useEffect(() => {
    setCreatures(
      Object.entries(cards).filter((card) =>
        card[1].data.card_type.includes("Creature")
      )
    );
    setLands(
      Object.entries(cards).filter((card) =>
        card[1].data.card_type.includes("Land")
      )
    );
    setNoncreatures(
      Object.entries(cards).filter((card) => {
        const type = card[1].data.card_type;
        if (type.includes("Creature") || type.includes("Land")) return false;
        return true;
      })
    );
  }, [cards]);

  useEffect(() => {
    setCreatureCount(
      creatures.map((card) => card[1].count).reduce((a, b) => a + b, 0)
    );
  }, [creatures]);

  useEffect(() => {
    setLandCount(lands.map((card) => card[1].count).reduce((a, b) => a + b, 0));
  }, [lands]);

  useEffect(() => {
    setNoncreatureCount(
      noncreatures.map((card) => card[1].count).reduce((a, b) => a + b, 0)
    );
  }, [noncreatures]);

  useEffect(() => {
    setSideboardCount(
      Object.entries(sideboard)
        .map((card) => card[1].count)
        .reduce((a, b) => a + b, 0)
    );
  }, [sideboard]);

  const arranged = [
    { name: "Creatures", data: creatures, count: creatureCount },
    { name: "Non-Creatures", data: noncreatures, count: noncreatureCount },
    { name: "Lands", data: lands, count: landCount },
    {
      name: "Sideboard",
      data: Object.entries(sideboard),
      count: sideboardCount,
    },
  ];

  if (!Object.entries(cards).length)
    return (
      <div className={classes.cardItemContainer}>
        <div className={classes.cardItem}>No cards in deck</div>
      </div>
    );

  return (
    <div className={classes.columnContainer}>
      {/* cards column */}
      <div className={classes.listColumn}>
        <div style={{ marginBottom: 10 }}>{totalCount} cards</div>
        <div className={classes.cardItemContainer}>
          {arranged.map((entry) => {
            if (!entry.data.length)
              return <React.Fragment key={entry.name}></React.Fragment>;
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
                    setCardAmount={
                      entry.name === "Sideboard"
                        ? setSideboardCardAmount
                        : setCardAmount
                    }
                    setDisplayedCard={setDisplayedCard}
                    swapBoard={swapBoard}
                    isSideboard={entry.name === "Sideboard"}
                  />
                ))}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* card display column */}
      <div className={classes.displayColumn}>
        <CardDisplay card={displayedCard} />
      </div>
    </div>
  );
};

export default CardList;
