import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import SearchBar from "../SearchBar";

afterEach(cleanup);

const mockOptions = [
  { label: "日本", reading: "にほん", value: "JPN" },
  { label: "アメリカ合衆国", reading: "あめりかがっしゅうこく", value: "USA" },
  { label: "フランス", reading: "ふらんす", value: "FRA" },
];

describe("SearchBar", () => {
  it("検索バーが表示される", () => {
    const setSelectedValue = vi.fn();
    render(
      <SearchBar option={mockOptions} setSelectedValue={setSelectedValue} />,
    );

    expect(screen.getByLabelText("Search")).toBeInTheDocument();
  });

  it("入力するとオプションが絞り込まれる", async () => {
    const user = userEvent.setup();
    const setSelectedValue = vi.fn();
    render(
      <SearchBar option={mockOptions} setSelectedValue={setSelectedValue} />,
    );

    const input = screen.getByLabelText("Search");
    await user.click(input);
    await user.type(input, "日本");

    const option = await screen.findByRole("option", { name: "日本" });
    expect(option).toBeInTheDocument();
  });

  it("オプション選択時にsetSelectedValueが呼ばれる", async () => {
    const user = userEvent.setup();
    const setSelectedValue = vi.fn();
    render(
      <SearchBar option={mockOptions} setSelectedValue={setSelectedValue} />,
    );

    const input = screen.getByLabelText("Search");
    await user.click(input);
    await user.type(input, "フランス");

    const option = await screen.findByRole("option", { name: "フランス" });
    await user.click(option);

    expect(setSelectedValue).toHaveBeenCalledWith("FRA");
  });
});
