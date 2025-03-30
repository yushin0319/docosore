"use client";
import { Box, Container, Tab, Tabs } from "@mui/material";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import Papa from "papaparse";
import { useEffect, useState } from "react";
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
  const [csvData, setCsvData] = useState<any>(null);
  const [selectedValue, setSelectedValue] = useState<string | null>("JPN");
  const [tabIndex, setTabIndex] = useState(0); // タブの状態
  const [selectedMetric, setSelectedMetric] = useState<string>("population"); // 選択された指標
  const [topN, setTopN] = useState(0); // ランキングの上位N件

  useEffect(() => {
    fetch("/df_merged.csv")
      .then((res) => res.text())
      .then((csvText) => {
        const parsedData = Papa.parse(csvText, {
          header: true,
        });
        setCsvData(parsedData.data);
      });
  }, []);

  const handleTabChange = (_: any, newIndex: number) => {
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
          bgcolor: "#eeeeee",
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
        {/* 地図 */}
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
            csvData={csvData}
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
                csvData={csvData}
              ></CountryCard>
              <SearchBar
                option={csvData
                  ?.filter((item: any) => item["name_ja"] && item["code"])
                  .map((item: any) => ({
                    label: item["name_ja"],
                    value: item["code"],
                  }))}
                setSelectedValue={setSelectedValue}
              />
            </Box>
          )}
          {tabIndex === 1 && (
            <Box sx={{ p: 2 }}>
              <RankingTab
                csvData={csvData}
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
