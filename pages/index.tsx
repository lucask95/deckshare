import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Layout from "../src/Layout";
import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";

export default function Index() {
  const [cardOptions, setCardOptions] = useState([]);

  return (
    <Layout>
      {/* search */}
      <Autocomplete
        options={cardOptions}
        renderInput={(params) => {
          return <TextField {...params} label='Card name' margin='dense' />;
        }}
      />

      {/* cards */}
      <div>Cards placeholder</div>

      {/* stats */}
      <div>Stats placeholder</div>
    </Layout>
  );
}
