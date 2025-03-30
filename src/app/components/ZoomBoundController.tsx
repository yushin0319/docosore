"use client";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

export const ZoomBoundController = () => {
  const map = useMap();

  useEffect(() => {
    const updateBounds = () => {
      const zoom = map.getZoom();
      if (zoom <= 1) {
        map.setMaxBounds([
          [0, -360],
          [0, 360],
        ]);
      } else {
        map.setMaxBounds([
          [-90, -360],
          [90, 360],
        ]);
      }
    };

    map.on("zoomend", updateBounds);
    updateBounds(); // 初期呼び出し

    return () => {
      map.off("zoomend", updateBounds);
    };
  }, [map]);

  return null;
};
