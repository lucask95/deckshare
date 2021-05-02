import React, { useCallback, useEffect, useState } from "react";
import { Autocomplete } from "@material-ui/lab";
import { Box, CircularProgress, TextField } from "@material-ui/core";
import useDebounce from "../util/useDebounce";
import CardModel from "../models/cardModel";

const CardSearch: React.FC = () => {
  const [cardOptions, setCardOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearchTerm = useDebounce(inputValue, 500);

  useEffect(() => {
    if (!debouncedSearchTerm) return;
    async function searchForCard() {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/api/search/${debouncedSearchTerm}`
        );
        const results = await response.json();
        setCardOptions(results.cards);
        console.log("Received cards:", results);
      } catch (error) {
        console.error("Error searching for cards:", error);
      }
      setIsLoading(false);
    }

    console.log("Debounce time over. Search term:", debouncedSearchTerm);
    searchForCard();
  }, [debouncedSearchTerm]);

  useEffect(() => {
    // console.log({ cardOptions });
  }, [cardOptions]);

  const handleOptionSelected = (
    event: object,
    value: CardModel,
    reason: string
  ) => {
    if (reason !== "select-option") return;
    console.log("Add selected card to deck:", value);
    setInputValue("");
    setCardOptions([]);
  };

  return (
    <Autocomplete
      loading={isLoading}
      loadingText={
        <Box display='flex' flexDirection='row' justifyContent='center'>
          <CircularProgress />
        </Box>
      }
      options={cardOptions}
      getOptionLabel={(option: any) => option.name}
      inputValue={inputValue}
      onInputChange={(e: object, value: string, reason: string) => {
        setInputValue(value);
      }}
      onChange={handleOptionSelected}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            label='Card name'
            margin='dense'
            variant='outlined'
          />
        );
      }}
    />
  );
};

export default CardSearch;
