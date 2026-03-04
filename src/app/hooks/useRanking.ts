import { useMemo } from "react";
import type { CountryRow } from "../types";

/**
 * 全指標のランキングを計算するカスタムフック
 * @returns { [metric: string]: { [code: string]: number } }
 *   rank > 0: 1-indexed の順位, -1: データなし/0値
 */
export function useRanking(
  csvData: CountryRow[],
): Record<string, Record<string, number>> {
  return useMemo(() => {
    if (!csvData || csvData.length === 0) return {};
    const result: Record<string, Record<string, number>> = {};
    const keys = Object.keys(csvData[0]);
    for (const key of keys) {
      result[key] = {};
      const sorted = [...csvData]
        .filter((item) => item[key] && Number(item[key]) !== 0)
        .sort((a, b) => Number(b[key]) - Number(a[key]));
      sorted.forEach((item, index) => {
        result[key][item.code] = index + 1;
      });
      // データなし/0値のアイテムは -1 を設定
      csvData.forEach((item) => {
        if (!(item.code in result[key])) {
          result[key][item.code] = -1;
        }
      });
    }
    return result;
  }, [csvData]);
}

/**
 * 1国のランキング情報を全指標から抽出（有効なランクのみ）
 */
export function getRankForCountry(
  allRanks: Record<string, Record<string, number>>,
  country: string,
): Record<string, number> {
  const dict: Record<string, number> = {};
  for (const key of Object.keys(allRanks)) {
    const rank = allRanks[key]?.[country];
    if (rank !== undefined && rank > 0) {
      dict[key] = rank;
    }
  }
  return dict;
}
