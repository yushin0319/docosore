"use client";
import { useMediaQuery, useTheme } from "@mui/material";
import type { FeatureCollection } from "geojson";
import { useEffect, useState } from "react";
import { GeoJSON, MapContainer } from "react-leaflet";
import { useRanking } from "../hooks/useRanking";
import type { CountryRow } from "../types";
import FlyToCountry from "./FlyToCountry";
import { ZoomBoundController } from "./ZoomBoundController";

export const MapViewer = ({
  selectedValue,
  setSelectedValue,
  selectedMetric,
  csvData,
  topN,
}: {
  selectedValue: string | null;
  setSelectedValue: (value: string | null) => void;
  selectedMetric: string;
  csvData: CountryRow[];
  topN: number;
}) => {
  const [geoData, setGeoData] = useState<FeatureCollection | null>(null);
  const [LatLng, setLatLng] = useState<[number, number] | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:600px)");
  const allRanks = useRanking(csvData);
  const rankDict = allRanks[selectedMetric] ?? {};

  useEffect(() => {
    fetch("/world.geojson")
      .then((res) => res.json())
      .then((data) => setGeoData(data));
  }, []);

  // 地図の中心座標を選択された国の座標に設定
  // ただし、選択された国が存在しない場合は、デフォルトの座標を使用
  useEffect(() => {
    if (!geoData || !selectedValue) return;
    let coordinates: number[][] | undefined;
    const feature = geoData.features.find((f) => f.id === selectedValue);

    if (feature?.geometry?.type === "Polygon") {
      coordinates = feature.geometry.coordinates[0] as number[][];
    } else if (feature?.geometry?.type === "MultiPolygon") {
      coordinates = feature.geometry.coordinates[0][0] as number[][];
    }

    if (coordinates) {
      const latSum = coordinates.reduce((sum, [, lat]) => sum + lat, 0);
      const latAvg = latSum / coordinates.length;
      const lngSum = coordinates.reduce((sum, [lng]) => sum + lng, 0);
      const lngAvg = lngSum / coordinates.length;
      setLatLng([latAvg, lngAvg]);
    }
  }, [selectedValue, geoData]);

  return (
    <MapContainer
      center={[0, 0]}
      zoom={1}
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: theme.palette.map.background,
      }}
      scrollWheelZoom={false}
      maxBounds={[
        [0, -360],
        [0, 360],
      ]}
    >
      <ZoomBoundController />
      {geoData && (
        <>
          <GeoJSON
            data={geoData}
            eventHandlers={{
              click: (e) => {
                const feature = e.propagatedFrom.feature;
                if (feature?.id) {
                  setSelectedValue(feature.id); // ← propsで渡された setter を使う
                }
              },
            }}
            style={(feature) => {
              const code = feature?.id;
              if (!code) return {};
              const rank = rankDict[code] || -1;
              const ratio = (topN - rank) / topN;
              return {
                color: theme.palette.map.border,
                fillColor:
                  String(feature?.id) === selectedValue
                    ? theme.palette.map.selected
                    : rank < 0
                    ? theme.palette.map.noData
                    : rank < topN
                    ? `rgba(10,100,10, ${ratio})`
                    : theme.palette.common.white,
                fillOpacity: String(feature?.id) === selectedValue ? 0.8 : 0.8,
                weight: 0.1,
              };
            }}
          />
          {isMobile && LatLng && <FlyToCountry center={LatLng} />}
        </>
      )}
    </MapContainer>
  );
};
