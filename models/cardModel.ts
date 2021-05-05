type Card = {
  id: number;
  color_identity: Array<string>;
  colors: Array<string>;
  cmc: number;
  mana_cost: string;
  card_name: string;
  supertypes: Array<string>;
  oracle_text: string;
  card_type: string;
  card_types: Array<string>;
  legalities: Array<string>;
};

export default Card;
