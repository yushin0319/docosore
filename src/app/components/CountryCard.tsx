import { Box, Card, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { INDICATORS } from "../constants";
import { getRankForCountry, useRanking } from "../hooks/useRanking";
import type { CountryRow } from "../types";
import { arrangeData } from "../utils/format";

export const CountryCard = ({
  code,
  csvData,
}: {
  code: string;
  csvData: CountryRow[];
}) => {
  const [countryData, setCountryData] = useState<Record<string, string> | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:600px)");
  const allRanks = useRanking(csvData);
  const rankDict = getRankForCountry(allRanks, code);

  useEffect(() => {
    if (!csvData) return;
    const country = csvData.find((item) => item.code === code);
    if (country) {
      const arranged = arrangeData(country, code);
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
        backgroundColor: "background.paper",
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
                  color: "text.primary",
                }}
              >
                {countryData.name_ja}
              </Typography>
              <Typography variant="caption">
                首都：{countryData.capital_ja}
              </Typography>
            </Box>
          </Box>
          {INDICATORS.map(({ key, label }) => (
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
                      bgcolor: theme.palette.rankBar,
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
