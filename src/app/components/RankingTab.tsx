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

type Props = {
  csvData: any[];
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
          <MenuItem value="population">人口（人）</MenuItem>
          <MenuItem value="surface">面積（㎢）</MenuItem>
          <MenuItem value="population_density">人口密度（人/㎢）</MenuItem>
          <MenuItem value="gdp_nominal">GDP（名目）（＄）</MenuItem>
          <MenuItem value="gdp_ppp_per_capita">
            1人あたりGDP（PPP）（＄）
          </MenuItem>
          <MenuItem value="net">インターネット普及率（％）</MenuItem>
          <MenuItem value="tas">平均気温（℃）</MenuItem>
          <MenuItem value="forest">森林率（％）</MenuItem>
          <MenuItem value="young">若者率（0-14歳）（％）</MenuItem>
        </Select>
      </FormControl>
      <Slider
        value={topN}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        step={1}
        sx={{
          mb: 2,
          color: "#999",
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
            bgcolor: "#ffffff",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            cursor: "pointer",
            "&:hover": { bgcolor: "#f0f0f0" },
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
