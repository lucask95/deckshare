import { NextApiRequest, NextApiResponse } from "next";
import { Deck, DeckCards } from "../../models/deckModel";
import { getDB } from "../../util/database";

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
  const { db, pgp } = getDB();

  try {
    if (method === "GET") {
      let id: number = parseInt(
        Array.isArray(req.query.id) ? req.query.id[0] : req.query.id,
        10
      );

      const querystring = `
        SELECT * FROM decks d 
        LEFT JOIN deckcards dc
        ON d.id = dc.deckid
        LEFT JOIN cards c
        ON dc.cardid = c.id 
        WHERE d.id = $1
      `;

      const queryRes = await db.query(querystring, [id]);
      const { deck_name, deckid } = queryRes?.[0];
      const mb: DeckCards = {};
      const sb: DeckCards = {};

      queryRes.forEach((element: any) => {
        const {
          deck_name,
          edit_code,
          last_accessed,
          deckid,
          card_count,
          is_sideboard,
          cardid,
          ...others
        } = element;
        const val = {
          count: card_count,
          data: others,
        };
        if (is_sideboard) sb[others.card_name] = val;
        else mb[others.card_name] = val;
      });

      const ret: Deck = {
        id: deckid,
        name: deck_name,
        mainboard: mb,
        sideboard: sb,
      };

      res.status(200).json(ret);
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
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error,
    });
  }
}
