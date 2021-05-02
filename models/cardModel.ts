type CardModel = {
  colorIdentity: Array<string>;
  colors: Array<string>;
  convertedManaCost: number;
  edhrecRank: number;
  foreignData: Array<any>;
  identifiers: any;
  layout: string;
  legalities: any;
  manaCost: string;
  name: string;
  printings: Array<string>;
  purchaseUrls: any;
  rulings: Array<any>;
  subtypes: Array<string>;
  supertypes: Array<string>;
  text: string;
  type: string;
  types: Array<string>;
};

export default CardModel;
