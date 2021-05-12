import Card from "./cardModel";

export type DeckCardData = {
  data: Card;
  count: number;
};

export type DeckCards = {
  [index: string]: DeckCardData;
};

/**
 * cards model:
 * {
 *   cardname1: { data: Card, count: number },
 *   cardname2: { data: Card, count: number },
 *   // ex:
 *   "Path to Exile": {
 *      data: { ...data },
 *      count: 4
 *    }
 * }
 */
export type Deck = {
  id?: number;
  name: string;
  mainboard: DeckCards;
  sideboard: DeckCards;
};
