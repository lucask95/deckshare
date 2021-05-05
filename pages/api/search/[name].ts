import { NextApiRequest, NextApiResponse } from "next";
import { Pool } from "pg";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { name },
    method,
  } = req;

  const pool = new Pool();
  const queryText = "SELECT * FROM cards WHERE card_name ILIKE $1 LIMIT 20";
  const queryRes = await pool.query(queryText, [`${name}%`]);

  if (method === "GET") {
    res.status(200).json(queryRes?.rows);
  } else {
    res.status(500).json({
      message: "not supported",
    });
  }
}
