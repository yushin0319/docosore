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
      sx={{
        width: "100%",
        backgroundColor: "#ffffff",
        borderRadius: "4px",
        mb: 1,
      }}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
        const selectedOption = option.find(
          (opt) => opt.label === newInputValue
        );
        if (selectedOption) {
          setSelectedValue(selectedOption.value);
        } else {
          setSelectedValue(null);
        }
      }}
    />
  );
};
export default SearchBar;
