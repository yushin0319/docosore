import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { CountryCard } from "../CountryCard";

afterEach(cleanup);

const mockCsvData = [
  {
    code: "JPN",
    name_ja: "日本",
    capital_ja: "東京",
    population: "126000000",
    surface: "377930",
    gdp_nominal: "5000000000000",
    gdp_ppp_per_capita: "42000",
    population_density: "334",
    net: "93",
    tas: "15.4",
    forest: "68.4",
    young: "12.1",
  },
  {
    code: "USA",
    name_ja: "アメリカ",
    capital_ja: "ワシントンD.C.",
    population: "330000000",
    surface: "9834000",
    gdp_nominal: "23000000000000",
    gdp_ppp_per_capita: "63000",
    population_density: "36",
    net: "90",
    tas: "11.1",
    forest: "33.9",
    young: "18.3",
  },
];

describe("CountryCard", () => {
  it("国名と首都が表示される", async () => {
    render(<CountryCard code="JPN" csvData={mockCsvData} />);

    expect(await screen.findByText("日本")).toBeInTheDocument();
    expect(screen.getByText(/首都：東京/)).toBeInTheDocument();
  });

  it("指標ラベルが表示される", async () => {
    render(<CountryCard code="JPN" csvData={mockCsvData} />);

    // useEffect 後のレンダリングを待つ
    expect(await screen.findByText("面積（㎢）")).toBeInTheDocument();

    // MUI が同一テキストを複数ノードに配置する場合があるため getAllByText を使用
    expect(screen.getAllByText("人口（人）").length).toBeGreaterThanOrEqual(1);
    expect(
      screen.getAllByText("GDP（名目）（＄）").length,
    ).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("平均気温（℃）").length).toBeGreaterThanOrEqual(
      1,
    );
  });

  it("存在しない国コードではloading表示になる", () => {
    render(<CountryCard code="XXX" csvData={mockCsvData} />);

    expect(screen.getByText("loading...")).toBeInTheDocument();
  });
});
