import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import React from "react";
import CardModel from "../models/cardModel";

interface Props {
  cards: Array<CardModel>;
}

const CardList: React.FC<Props> = ({ cards }) => {
  return (
    <List>
      {cards.map((card) => (
        <ListItem key={card.id}>
          <ListItemIcon>
            <IconButton>-</IconButton>
            <IconButton>+</IconButton>
          </ListItemIcon>
          <ListItemText primary={card.card_name} />
        </ListItem>
      ))}
    </List>
  );
};

export default CardList;
