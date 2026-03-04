import countries from "i18n-iso-countries";
import type { CountryRow } from "../types";

export const formatNumber = (num: number): string => {
  if (num < 10000) return num.toFixed(1).toString();

  // Intl.NumberFormat で3桁の有効数字に丸める
  const value = Number(
    new Intl.NumberFormat("en-US", {
      maximumSignificantDigits: 3,
      useGrouping: false,
    }).format(num),
  );

  if (value >= 1e12) {
    const tyo = Math.floor(value / 1e12);
    const oku = Math.floor((value % 1e12) / 1e8);
    if (oku === 0) {
      return `${tyo}兆`;
    } else {
      return `${tyo}兆${oku.toString().padStart(4, "0")}億`;
    }
  } else if (value >= 1e8) {
    const oku = Math.floor(value / 1e8);
    const man = Math.floor((value % 1e8) / 1e4);
    if (man === 0) {
      return `${oku}億`;
    } else {
      return `${oku}億${man.toString().padStart(4, "0")}万`;
    }
  } else {
    if (value % 1e4 === 0) {
      return `${Math.floor(value / 1e4)}万`;
    } else {
      return `${Math.floor(value / 1e4)}万${(value % 1e4)
        .toString()
        .padStart(4, "0")}`;
    }
  }
};

export const arrangeData = (
  data: CountryRow,
  code: string,
): Record<string, string> => {
  const result: Record<string, string> = {};
  Object.keys(data).forEach((key) => {
    if (key === "code" || key === "name_ja" || key === "capital_ja") {
      if (result[key] === "") result[key] = "--";
      result[key] = data[key];
      return;
    }
    const value = parseFloat(data[key]);
    if (!value || value === 0) {
      result[key] = "データなし：";
      return;
    }
    result[key] = `${formatNumber(value)}：`;
  });
  const iso2 = countries.alpha3ToAlpha2(code)?.toLowerCase();
  const flagUrl = `https://flagcdn.com/w320/${iso2}.png`;
  result.flag = flagUrl;
  return result;
};
