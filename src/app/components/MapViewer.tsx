"use client";
import { useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { GeoJSON, MapContainer } from "react-leaflet";
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  csvData: any[];
  topN: number;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [geoData, setGeoData] = useState<any>(null);
  const [LatLng, setLatLng] = useState<[number, number] | null>(null);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [rankDict, setRankDict] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    fetch("/world.geojson")
      .then((res) => res.json())
      .then((data) => setGeoData(data));
  }, []);

  // csvDataが読み込まれた後に、rankDictを更新
  useEffect(() => {
    if (!csvData) return;
    const dict: { [key: string]: number } = {};
    const sortedData = [...csvData]
      .filter((item) => item[selectedMetric])
      .sort((a, b) => Number(b[selectedMetric]) - Number(a[selectedMetric]));
    csvData.forEach((item) => {
      const code = item["code"];
      const value = item[selectedMetric];
      if (value == 0) {
        dict[code] = -1;
      } else {
        const rank = sortedData.findIndex((i) => i.code === code) + 1;
        dict[code] = rank;
      }
    });
    setRankDict(dict);
  }, [csvData, selectedMetric]);

  // 地図の中心座標を選択された国の座標に設定
  // ただし、選択された国が存在しない場合は、デフォルトの座標を使用
  useEffect(() => {
    if (!geoData || !selectedValue) return;
    let coordinates: [number, number][] | undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const feature = geoData.features.find((f: any) => f.id === selectedValue);

    if (feature?.geometry?.type === "Polygon") {
      coordinates = feature.geometry.coordinates[0];
    } else if (feature?.geometry?.type === "MultiPolygon") {
      coordinates = feature.geometry.coordinates[0][0];
    }

    if (coordinates) {
      const lngSum = coordinates.reduce((sum, [lng]) => sum + lng, 0);
      const lngAvg = lngSum / coordinates.length;
      setLatLng([0, lngAvg]);
    }
  }, [selectedValue]);

  return (
    <MapContainer
      center={[0, 0]}
      zoom={1}
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "#DDDDED",
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
                const layer = e.target;
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
                color: "#333",
                fillColor:
                  feature?.id == selectedValue
                    ? "#f39c12"
                    : rank < 0
                    ? "#bbb"
                    : rank < topN
                    ? `rgba(10,100,10, ${ratio})`
                    : "#ffffff",
                fillOpacity: feature?.id == selectedValue ? 0.8 : 0.8,
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
