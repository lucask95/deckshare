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
});

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
        {card.oracle_text.split("\n").map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </div>
    </div>
  );
};

export default CardDisplay;
