import { NextApiRequest, NextApiResponse } from "next";
import mockData from "../../../util/mockData.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { name },
    method,
  } = req;

  const mockReturnValue = [
    mockData["Path to Exile"][0],
    mockData["Path to the World Tree"][0],
    mockData["Pathbreaker Ibex"][0],
    mockData["Pathbreaker Wurm"][0],
    mockData["Pathmaker Initiate"][0],
  ];

  if (method === "GET") {
    res.status(200).json({
      cards: mockReturnValue,
    });
  } else {
    res.status(500).json({
      message: "not supported",
    });
  }
}
