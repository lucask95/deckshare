import { NextApiRequest, NextApiResponse } from "next";
import { DeckCards } from "../../models/deckModel";
import { pgp, db } from "../../util/database";

function cardsToObjectArray(
  cards: DeckCards,
  isSideboard: boolean,
  deckid: number
) {
  return Object.entries(cards).map((value) => {
    return {
      deckid,
      card_count: value[1].count,
      is_sideboard: isSideboard,
      cardid: value[1].data.id,
    };
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body, method } = req;

  if (method === "GET") {
    res.status(200).json([]);
  } else if (method === "POST") {
    const tempDeckname = new Date().toLocaleDateString();

    // create a deck in "decks" table
    let queryRes = await db.one(
      "INSERT INTO decks (deck_name) VALUES ($1) RETURNING id",
      [tempDeckname]
    );
    const deckid = queryRes.id;

    // insert cards into "deck_cards" table
    const {
      mainboard,
      sideboard,
    }: { mainboard: DeckCards; sideboard: DeckCards } = body;
    const mainboardObjects = cardsToObjectArray(mainboard, false, deckid);
    const sideboardObjects = cardsToObjectArray(sideboard, true, deckid);
    const insertstring = pgp.helpers.insert(
      [...mainboardObjects, ...sideboardObjects],
      ["deckid", "card_count", "is_sideboard", "cardid"],
      "deckcards"
    );
    queryRes = await db.query(insertstring);

    res.status(200).json({ id: deckid, queryRes });
  } else {
    res.status(500).json({
      message: "not supported",
    });
  }
}
