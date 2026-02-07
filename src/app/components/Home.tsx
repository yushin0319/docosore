"use client";
import { Box, Container, Tab, Tabs, Typography } from "@mui/material";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useCSVData } from "../hooks/useCSVData";
import { CountryCard } from "./CountryCard";
import RankingTab from "./RankingTab";
import SearchBar from "./SearchBar";

const MapViewer = dynamic(
  () => import("./MapViewer").then((mod) => mod.MapViewer),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

export default function Home() {
  const { data: csvData, loading, error } = useCSVData();
  const [selectedValue, setSelectedValue] = useState<string | null>("JPN");
  const [tabIndex, setTabIndex] = useState(0); // タブの状態
  const [selectedMetric, setSelectedMetric] = useState<string>("population"); // 選択された指標
  const [topN, setTopN] = useState(0); // ランキングの上位N件
  const handleTabChange = (_: React.SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
    if (newIndex === 0) {
      setTopN(0);
    } else {
      setTopN(10);
      setSelectedValue(null);
    }
  };

  return (
    <main>
      <Container
        maxWidth="lg"
        sx={{
          pb: 4,
          px: 1,
          bgcolor: "background.default",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* タブ */}
        <Box sx={{ borderColor: "divider", my: 1 }}>
          <Tabs value={tabIndex} onChange={handleTabChange} centered>
            <Tab label="国を検索" value={0} />
            <Tab label="ランキング" value={1} />
          </Tabs>
        </Box>
        {error && (
          <Typography color="error" sx={{ textAlign: "center", my: 2 }}>
            データの読み込みに失敗しました
          </Typography>
        )}
        {/* 地図 */}
        {tabIndex === 0 && (
          <SearchBar
            option={csvData
              ?.filter((item) => item["name_ja"] && item["code"])
              .map((item) => ({
                label: item["name_ja"],
                reading: item["name_ja_hira"],
                value: item["code"],
              })) ?? []}
            setSelectedValue={setSelectedValue}
          />
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "45vh",
          }}
        >
          <MapViewer
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
            selectedMetric={selectedMetric}
            csvData={csvData ?? []}
            topN={topN}
          />
        </Box>

        {/* タブの中身 */}
        <Box sx={{ mt: 1, width: "100%" }}>
          {tabIndex === 0 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <CountryCard
                code={selectedValue || "JPN"}
                csvData={csvData ?? []}
              ></CountryCard>
            </Box>
          )}
          {tabIndex === 1 && (
            <Box sx={{ p: 2 }}>
              <RankingTab
                csvData={csvData ?? []}
                setSelectedValue={setSelectedValue}
                selectedMetric={selectedMetric}
                setSelectedMetric={setSelectedMetric}
                topN={topN}
                setTopN={setTopN}
              />
            </Box>
          )}
        </Box>
      </Container>
    </main>
  );
}
