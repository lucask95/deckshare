import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DeckCards } from "../../models/deckModel";

interface ColorHexes {
  [index: string]: string;
}

const colorHexes: ColorHexes = {
  W: "#f0f2c0",
  U: "#b5cde3",
  B: "#aca29a",
  R: "#db8664",
  G: "#93b483",
  C: "#beb9b2",
  Multi: "#a783b4",
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
      },
      [theme.breakpoints.up("md")]: {
        flexDirection: "row",
      },
    },
    column: {
      padding: 10,
      flex: 1,
    },
  })
);

interface Props {
  deckList: DeckCards;
}

const DeckStats: React.FC<Props> = ({ deckList }) => {
  const classes = useStyles();

  const decklistEntries = Object.entries(deckList);

  if (!decklistEntries.length) return <React.Fragment></React.Fragment>;

  // { "cmc": <count>, "4": 12 }
  const barChartData: any = {};

  // { "color": <count>, "B": 12 }
  const pieChartData: any = {};

  let nonlandCount: number = 0;
  let averageCmc: number = 0;

  // convert the decklist to the format needed by the bar and pie chart
  decklistEntries.forEach((card) => {
    const count = card[1].count;

    if (!card[1].data.card_type.includes("Land")) {
      // bar chart
      const cmc = card[1].data.cmc;
      const cmcString = cmc.toString(10);
      const currentCmcCount = barChartData[cmcString];
      barChartData[cmcString] = currentCmcCount
        ? currentCmcCount + count
        : count;

      nonlandCount += count;
      averageCmc += cmc * count;

      //  pie chart
      const numColors = card[1].data.colors.length;
      let color;
      if (numColors < 1) color = "C";
      else if (numColors === 1) color = card[1].data.colors[0];
      else color = "Multi";
      const currentColorCount = pieChartData[color];
      pieChartData[color] = currentColorCount
        ? currentColorCount + count
        : count;
    }
  });

  const finalBarChartData = Object.entries(barChartData).map((value) => {
    return {
      cmc: value[0],
      count: value[1],
    };
  });

  const finalPieChartData = Object.entries(pieChartData).map((value) => {
    return {
      color: value[0],
      count: value[1],
    };
  });

  averageCmc /= nonlandCount;

  return (
    <div className={classes.container}>
      <div className={classes.column}>
        <Typography align="center" gutterBottom>
          Mana Values &ndash; Average: {averageCmc.toFixed(1)}
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={finalBarChartData}>
            <CartesianGrid />
            <XAxis dataKey="cmc" />
            <YAxis allowDecimals={false} />
            <Bar dataKey="count" fill="#93b483" />
            <Tooltip />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className={classes.column}>
        <Typography align="center" gutterBottom>
          Colors
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={finalPieChartData}
              dataKey="count"
              nameKey="color"
              fill="#b5cde3"
              labelLine={false}
              label={({ x, y, name, value }) => (
                <text
                  x={x}
                  y={y}
                  fill="black"
                  textAnchor="end"
                  dominantBaseline="central"
                >
                  {`${name}: ${value}`}
                </text>
              )}
            >
              {finalPieChartData.map((entry) => (
                <Cell
                  key={`cell-${entry.color}`}
                  fill={colorHexes[entry.color]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DeckStats;
