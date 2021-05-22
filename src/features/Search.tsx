import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Autocomplete } from "@material-ui/lab";
import {
  Box,
  CircularProgress,
  makeStyles,
  TextField,
} from "@material-ui/core";
import useDebounce from "../../util/useDebounce";
import Card from "../../models/cardModel";
import Mana from "../components/Mana";
import serverUrl from "../../util/config";

interface Props {
  addCard: Function;
}

const useStyles = makeStyles({
  optionDiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  labelSpan: {
    padding: "3px 6px",
    borderRadius: 2,
    backgroundColor: "lightgray",
    marginRight: 5,
    fontSize: ".8rem",
  },
});

const CardSearch: React.FC<Props> = ({ addCard }) => {
  const classes = useStyles();
  const [cardOptions, setCardOptions] = useState<Card[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearchTerm = useDebounce(inputValue, 500);

  useEffect(() => {
    if (!debouncedSearchTerm) return;

    async function searchForCard() {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${serverUrl}/api/search/${debouncedSearchTerm}`
        );
        const results = await response.json();
        setCardOptions(results);
      } catch (error) {
        console.error("Error searching for cards:", error);
      }
      setIsLoading(false);
    }

    // console.log("Debounce time over. Search term:", debouncedSearchTerm);
    searchForCard();
  }, [debouncedSearchTerm]);

  const handleOptionSelected = (
    e: ChangeEvent<{}>,
    value: any,
    reason: string
  ) => {
    if (reason !== "select-option") return;
    addCard?.(value);
    // input value doesn't reset without the settimeout
    setTimeout(() => {
      setInputValue("");
      setCardOptions([]);
    }, 1);
  };

  return (
    <Autocomplete
      freeSolo
      debug
      loading={isLoading}
      loadingText={
        <Box display="flex" flexDirection="row" justifyContent="center">
          <CircularProgress />
        </Box>
      }
      options={cardOptions ?? []}
      getOptionLabel={(option: any) => option?.["card_name"]}
      renderOption={(option: Card) => {
        if (!option) return <React.Fragment></React.Fragment>;

        let mana: any;

        if (option.mana_cost === "") {
          if (option.card_type.includes("Land"))
            mana = <span className={classes.labelSpan}>Land</span>;
          else mana = <span className={classes.labelSpan}>No Cost</span>;
        } else {
          mana = <Mana manaCost={option?.mana_cost} />;
        }

        return (
          <div className={classes.optionDiv}>
            <div>{option?.card_name}</div>
            {mana}
          </div>
        );
      }}
      inputValue={inputValue}
      onInputChange={(e: object, value: string, reason: string) => {
        setInputValue(value);
      }}
      onChange={handleOptionSelected}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            label="Card name"
            margin="dense"
            variant="outlined"
          />
        );
      }}
    />
  );
};

export default CardSearch;
