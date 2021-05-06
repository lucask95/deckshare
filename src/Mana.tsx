import React from "react";
import "mana-font";

interface Props {
  manaCost: string;
}

const Mana: React.FC<Props> = ({ manaCost }) => {
  const symbols = [...manaCost.matchAll(/{([^{}]+)}/g)].map((symbol) =>
    symbol[1].replace(/\W/g, "").toLowerCase()
  );

  return (
    <div>
      {symbols.map((symbol, index) => (
        <i
          key={index}
          className={`ms ms-cost ms-shadow ms-${symbol}`}
          style={{ margin: "1px" }}
        />
      ))}
    </div>
  );
};

export default Mana;
