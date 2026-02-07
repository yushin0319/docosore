export type Indicator = {
  key: string;
  label: string;
};

export const INDICATORS: Indicator[] = [
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
