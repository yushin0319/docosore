import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";

type OptionType = {
  label: string;
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

  return (
    <Autocomplete
      options={option}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <TextField {...params} label="Search" autoComplete="off" />
      )}
      value={value}
      sx={{
        width: "100%",
        backgroundColor: "#ffffff",
        borderRadius: "4px",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
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
