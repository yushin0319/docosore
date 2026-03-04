import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import RankingTab from "../RankingTab";

afterEach(cleanup);

const mockCsvData = [
  {
    code: "CHN",
    name_ja: "中国",
    population: "1400000000",
    surface: "9600000",
  },
  {
    code: "IND",
    name_ja: "インド",
    population: "1380000000",
    surface: "3287000",
  },
  {
    code: "USA",
    name_ja: "アメリカ",
    population: "330000000",
    surface: "9834000",
  },
];

const createProps = () => ({
  csvData: mockCsvData,
  selectedMetric: "population",
  setSelectedMetric: vi.fn(),
  setSelectedValue: vi.fn(),
  topN: 10,
  setTopN: vi.fn(),
});

describe("RankingTab", () => {
  it("ランキングデータが人口降順で表示される", () => {
    render(<RankingTab {...createProps()} />);

    // 人口降順: 中国(1.4B) > インド(1.38B) > アメリカ(330M)
    expect(screen.getByText(/1 中国/)).toBeInTheDocument();
    expect(screen.getByText(/2 インド/)).toBeInTheDocument();
    expect(screen.getByText(/3 アメリカ/)).toBeInTheDocument();
  });

  it("ランキング項目クリックでsetSelectedValueが呼ばれる", async () => {
    const user = userEvent.setup();
    const props = createProps();
    render(<RankingTab {...props} />);

    await user.click(screen.getByText(/1 中国/));

    expect(props.setSelectedValue).toHaveBeenCalledWith("CHN");
  });

  it("指標選択UIが表示される", () => {
    render(<RankingTab {...createProps()} />);

    // MUI InputLabel は label + legend の2箇所にテキストを配置するため getAllByText を使用
    const labels = screen.getAllByText("指標を選択");
    expect(labels.length).toBeGreaterThanOrEqual(1);
  });
});
