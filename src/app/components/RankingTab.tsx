"use client";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Typography,
} from "@mui/material";
import { INDICATORS } from "../constants";
import type { CountryRow } from "../types";

type Props = {
  csvData: CountryRow[];
  selectedMetric: string;
  setSelectedMetric: (value: string) => void;
  setSelectedValue: (code: string) => void;
  topN: number;
  setTopN: (value: number) => void;
};

export default function RankingTab({
  csvData,
  setSelectedValue,
  selectedMetric,
  setSelectedMetric,
  topN = 10,
  setTopN,
}: Props) {
  const sortedData = [...csvData]
    .filter((item) => item[selectedMetric])
    .sort((a, b) => Number(b[selectedMetric]) - Number(a[selectedMetric]))
    .slice(0, 10);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setTopN(newValue as number);
  };

  return (
    <Box>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>指標を選択</InputLabel>
        <Select
          value={selectedMetric}
          label="指標を選択"
          onChange={(e) => setSelectedMetric(e.target.value)}
        >
          {INDICATORS.map(({ key, label }) => (
            <MenuItem key={key} value={key}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Slider
        value={topN}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        step={1}
        sx={{
          mb: 2,
          color: "text.secondary",
        }}
      />

      {sortedData.map((item, index) => (
        <Box
          key={item.code}
          onClick={() => setSelectedValue(item.code)}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: 1,
            mb: 1,
            borderRadius: "4px",
            bgcolor: "common.white",
            boxShadow: 1,
            cursor: "pointer",
            "&:hover": { bgcolor: "action.hover" },
          }}
        >
          <Typography>
            {index + 1} {item.name_ja}
          </Typography>
          <Typography>
            {Number(item[selectedMetric]).toLocaleString(undefined, {
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            })}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
