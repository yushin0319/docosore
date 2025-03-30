import { useEffect } from "react";
import { useMap } from "react-leaflet";

const FlyToCountry = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center); // ズームレベルは好みで
  }, [center, map]);

  return null; // DOMには何も描画しない
};

export default FlyToCountry;
