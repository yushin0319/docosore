import { Box, Card, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";

export const CountryCard = ({
  code,
  csvData,
}: {
  code: string;
  csvData: any[];
}) => {
  const [countryData, setCountryData] = useState<any>(null);
  const isMobile = useMediaQuery("(max-width:600px)");

  const formatNumber = (num: number): string => {
    if (num < 10000) return num.toFixed(1).toString();

    const numStr = Math.round(
      num / Math.pow(10, Math.floor(Math.log10(num)) - 2)
    )
      .toString()
      .padEnd(Math.floor(Math.log10(num)) + 1, "0");

    const value = parseInt(numStr, 10);

    if (value >= 1e12) {
      const tyo = Math.floor(value / 1e12);
      const oku = Math.floor((value % 1e12) / 1e8);
      if (oku === 0) {
        return `${tyo}兆`;
      } else {
        return `${tyo}兆${oku.toString().padStart(4, "0")}億`;
      }
    } else if (value >= 1e8) {
      const oku = Math.floor(value / 1e8);
      const man = Math.floor((value % 1e8) / 1e4);
      if (man === 0) {
        return `${oku}億`;
      } else {
        return `${oku}億${man.toString().padStart(4, "0")}万`;
      }
    } else {
      if (value % 1e4 === 0) {
        return `${Math.floor(value / 1e4)}万`;
      } else {
        return `${Math.floor(value / 1e4)}万${(value % 1e4)
          .toString()
          .padStart(4, "0")}`;
      }
    }
  };

  const arrangeData = (data: any): { [key: string]: string } => {
    const result: { [key: string]: string } = {};
    Object.keys(data).forEach((key) => {
      if (key === "code" || key === "name_ja") {
        result[key] = data[key];
        return;
      }
      const value = parseFloat(data[key]);
      if (!value || value === 0) {
        result[key] = "データなし：--";
        return;
      }
      const sorted = [...csvData]
        .filter((item) => item[key])
        .sort((a, b) => Number(b[key]) - Number(a[key]));
      const rank = sorted.findIndex((item) => item.code === data.code) + 1;
      result[key] = `${formatNumber(value)}：${rank}位`;
    });
    return result;
  };

  useEffect(() => {
    if (!csvData) return;
    const country = csvData.find((item) => item.code === code);
    if (country) {
      const arranged = arrangeData(country);
      setCountryData(arranged);
    }
  }, [code, csvData]);

  return (
    <Card
      sx={{
        mx: "auto",
        width: isMobile ? "100%" : "40%",
        py: 1,
        px: 3,
        backgroundColor: "#f5f5f5",
        borderRadius: 2,
      }}
    >
      {countryData ? (
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h6">{countryData.name_ja}</Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="caption">人口（人）</Typography>
            <Typography variant="caption">{countryData.population}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="caption">面積（㎢）</Typography>
            <Typography variant="caption">{countryData.surface}</Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="caption">GDP（名目）（＄）</Typography>
            <Typography variant="caption">{countryData.gdp_nominal}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="caption">1人あたりGDP（PPP）（＄）</Typography>
            <Typography variant="caption">
              {countryData.gdp_ppp_per_capita}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="caption">人口密度（人/㎢）</Typography>
            <Typography variant="caption">
              {countryData.population_density}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="caption">
              インターネット普及率（％）
            </Typography>
            <Typography variant="caption">{countryData.net}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="caption">平均気温（℃）</Typography>
            <Typography variant="caption">{countryData.tas}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="caption">森林率（％）</Typography>
            <Typography variant="caption">{countryData.forest}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="caption">若者率（0-14歳）（％）</Typography>
            <Typography variant="caption">{countryData.young}</Typography>
          </Box>
        </Box>
      ) : (
        <Typography variant="body1">loading...</Typography>
      )}
    </Card>
  );
};
