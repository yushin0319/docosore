import { Box, Card, Grid, Typography, useMediaQuery } from "@mui/material";
import countries from "i18n-iso-countries";
import { useEffect, useMemo, useState } from "react";

export const CountryCard = ({
  code,
  csvData,
}: {
  code: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  csvData: any[];
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [countryData, setCountryData] = useState<any>(null);
  const [rankDict, setRankDict] = useState<{ [key: string]: number }>({});
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const arrangeData = (data: any): { [key: string]: string } => {
    const result: { [key: string]: string } = {};
    Object.keys(data).forEach((key) => {
      if (key === "code" || key === "name_ja" || key === "capital_ja") {
        if (result[key] === "") result[key] = "--";
        result[key] = data[key];
        return;
      }
      const value = parseFloat(data[key]);
      if (!value || value === 0) {
        result[key] = "データなし：";
        return;
      }
      result[key] = `${formatNumber(value)}：`;
    });
    const iso2 = countries.alpha3ToAlpha2(code)?.toLowerCase();
    const flagUrl = `https://flagcdn.com/w320/${iso2}.png`;
    result["flag"] = flagUrl;
    return result;
  };

  const allRanks = useMemo(() => {
    if (!csvData) return {};
    const result: { [key: string]: { [code: string]: number } } = {};
    const keys = Object.keys(csvData[0]);
    for (const key of keys) {
      const sorted = [...csvData]
        .filter((item) => item[key])
        .sort((a, b) => Number(b[key]) - Number(a[key]));
      sorted.forEach((item, index) => {
        if (!result[key]) result[key] = {};
        result[key][item.code] = index + 1;
      });
    }
    return result;
  }, [csvData]);

  const getRankDict = (country: string) => {
    const dict: { [key: string]: number } = {};
    Object.keys(allRanks).forEach((key) => {
      if (allRanks[key][country]) {
        dict[key] = allRanks[key][country];
      }
    });
    return dict;
  };

  const indicators = [
    { key: "population", label: "人口（人）" },
    { key: "surface", label: "面積（㎢）" },
    { key: "gdp_nominal", label: "GDP（名目）（＄）" },
    { key: "gdp_ppp_per_capita", label: "1人あたりGDP(PPP)(＄)" },
    { key: "population_density", label: "人口密度（人/㎢）" },
    { key: "net", label: "インターネット普及率（％）" },
    { key: "tas", label: "平均気温（℃）" },
    { key: "forest", label: "森林率（％）" },
    { key: "young", label: "若者率（0-14歳）（％）" },
  ];

  useEffect(() => {
    if (!csvData) return;
    const country = csvData.find((item) => item.code === code);
    if (country) {
      const arranged = arrangeData(country);
      setCountryData(arranged);
      const rankDict = getRankDict(code);
      setRankDict(rankDict);
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
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "90%",
            }}
          >
            <Box
              component="img"
              src={countryData.flag}
              alt="flag"
              sx={{
                width: "70px",
                height: "45px",
                my: "auto",
              }}
            />
            <Box sx={{ width: "70%" }}>
              <Typography
                variant="h6"
                sx={{
                  fontSize:
                    countryData.name_ja.length > 10 ? "0.9rem" : "1.1rem",
                  fontWeight: "bold",
                  color: "#333",
                }}
              >
                {countryData.name_ja}
              </Typography>
              <Typography variant="caption">
                首都：{countryData.capital_ja}
              </Typography>
            </Box>
          </Box>
          {indicators.map(({ key, label }) => (
            <Grid container sx={{ width: "100%" }} key={key}>
              <Grid size={6} sx={{ textAlign: "left" }}>
                <Typography variant="caption">{label}</Typography>
              </Grid>
              <Grid size={4} sx={{ textAlign: "right" }}>
                <Typography variant="caption">{countryData[key]}</Typography>
              </Grid>
              <Grid size={2} sx={{ textAlign: "left" }}>
                <Box sx={{ position: "relative" }}>
                  <Box
                    sx={{
                      position: "absolute",
                      top: "65%",
                      left: 0,
                      bottom: 0,
                      bgcolor: "#0000ff",
                      height: "30%",
                      opacity:
                        rankDict[key] <= 10
                          ? 0.5
                          : rankDict[key] <= 50
                          ? 0.3
                          : 0.1,
                      transition: "width 0.3s ease",
                      width: `${
                        ((csvData.length - rankDict[key]) / csvData.length) *
                        100
                      }%`,
                      borderRadius: 1,
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      position: "relative",
                      zIndex: 1,
                      fontWeight: rankDict[key] <= 10 ? "bold" : "normal",
                    }}
                  >
                    {rankDict[key]}位
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          ))}
        </Box>
      ) : (
        <Typography variant="body1">loading...</Typography>
      )}
    </Card>
  );
};
