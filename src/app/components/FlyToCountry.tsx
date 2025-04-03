import { useEffect } from "react";
import { useMap } from "react-leaflet";

const FlyToCountry = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  const zoom = map.getZoom();
  useEffect(() => {
    map.flyTo(
      zoom > 1 ? center : [0, center[1]] // ズームレベルが1より大きい場合は、指定された中心座標に移動
    );
  }, [center, map]);

  return null; // DOMには何も描画しない
};

export default FlyToCountry;
