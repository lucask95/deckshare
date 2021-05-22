import { makeStyles } from "@material-ui/core";
import React from "react";
import Card from "../../models/cardModel";
import Mana from "./Mana";

const useStyles = makeStyles({
  titleBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  textArea: {
    marginBottom: 10,
  },
  paragraph: {
    marginBottom: 7,
  },
});

interface CardTextProps {
  cardText: string;
}

/**
 * Converts a single string of card oracle text to formatted text with mana symbols inserted.
 */
const ParsedCardText: React.FC<CardTextProps> = ({ cardText }) => {
  const classes = useStyles();

  return (
    <>
      {cardText.split("\n").map((text, index) => {
        const symbolregex = /{([^}]+)}/g;
        /**
         * Instead of splitting on {} and re-adding them, there is a way to use positive lookahead so we don't
         * have to do the jank "JSX:" thing, but we can figure that out another time
         * https://stackoverflow.com/questions/12001953/javascript-and-regex-split-string-and-keep-the-separator
         */
        const newText: (string | JSX.Element)[] = text
          .replaceAll(symbolregex, "{JSX:$1}")
          .split(/[{}]/)
          .map((value) => {
            if (!value.startsWith("JSX:")) return value;
            let substr = value.substring(4);
            switch (substr) {
              case "T":
                substr = "tap";
                break;

              case "Q":
                substr = "untap";
                break;

              default:
                break;
            }
            const cost = `{${substr}}`;
            return <Mana manaCost={cost} inline />;
          });

        return (
          <div key={index} className={classes.paragraph}>
            {newText}
          </div>
        );
      })}
    </>
  );
};

interface Props {
  card?: Card;
}

const CardDisplay: React.FC<Props> = ({ card }) => {
  const classes = useStyles();
  if (!card) return <React.Fragment></React.Fragment>;

  return (
    <div>
      <div className={classes.titleBar}>
        <div style={{ fontFamily: "Beleren Bold", fontSize: "1.05rem" }}>
          {card.card_name}
        </div>
        <div>
          <Mana manaCost={card.mana_cost} />
        </div>
      </div>
      <div className={classes.textArea}>{card.card_type}</div>
      <div className={classes.textArea}>
        <ParsedCardText cardText={card.oracle_text} />
      </div>
    </div>
  );
};

export default CardDisplay;
