import React from "react";
import "mana-font";

interface Props {
  manaCost: string;
  inline?: boolean;
}

const Mana: React.FC<Props> = ({ manaCost, inline }) => {
  const symbols = [...manaCost.matchAll(/{([^{}]+)}/g)].map((symbol) =>
    symbol[1].replace(/\W/g, "").toLowerCase()
  );

  const children = symbols.map((symbol, index) => (
    <i
      key={index}
      className={`ms ms-cost ms-shadow ms-${symbol}`}
      style={{ margin: "1px" }}
    />
  ));

  return inline ? <span>{children}</span> : <div>{children}</div>;
};

export default Mana;
