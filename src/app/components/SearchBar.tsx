import { Autocomplete, TextField, createFilterOptions } from "@mui/material";
import { useState } from "react";

type OptionType = {
  label: string;
  reading: string;
  value: string;
};

const SearchBar = ({
  option,
  setSelectedValue,
}: {
  option: OptionType[];
  setSelectedValue: (value: string | null) => void;
}) => {
  const [value, setValue] = useState<OptionType | null>(null);
  const [inputValue, setInputValue] = useState("");

  const filterOptions = createFilterOptions<OptionType>({
    stringify: (option) => `${option.label} ${option.reading}`,
  });

  return (
    <Autocomplete
      options={option}
      getOptionLabel={(option) => option.label}
      filterOptions={filterOptions}
      renderInput={(params) => (
        <TextField {...params} label="Search" autoComplete="off" />
      )}
      value={value}
      inputValue={inputValue}
      sx={{
        width: "100%",
        backgroundColor: "#ffffff",
        borderRadius: "4px",
        mb: 1,
      }}
      onChange={(event, newValue) => {
        setValue(newValue);
        setInputValue(newValue ? newValue.label : "");
        setSelectedValue(newValue ? newValue.value : null);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
    />
  );
};
export default SearchBar;
