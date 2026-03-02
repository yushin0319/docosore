import { describe, expect, it } from "vitest";
import { formatNumber } from "../format";

describe("formatNumber", () => {
  describe("10000未満: toFixed(1)を返す", () => {
    it("整数値", () => {
      expect(formatNumber(334)).toBe("334.0");
    });
    it("小数値", () => {
      expect(formatNumber(15.4)).toBe("15.4");
    });
    it("9999", () => {
      expect(formatNumber(9999)).toBe("9999.0");
    });
  });

  describe("万単位（10000以上1億未満）", () => {
    it("10000 → 1万", () => {
      expect(formatNumber(10000)).toBe("1万");
    });
    it("42000 → 4万2000（3桁丸め後の端数あり）", () => {
      expect(formatNumber(42000)).toBe("4万2000");
    });
    it("377930 → 37万8000（3桁丸め）", () => {
      expect(formatNumber(377930)).toBe("37万8000");
    });
    it("9834000 → 983万（端数0）", () => {
      expect(formatNumber(9834000)).toBe("983万");
    });
    it("12345678 → 1230万（3桁丸め後0）", () => {
      expect(formatNumber(12345678)).toBe("1230万");
    });
  });

  describe("億単位（1億以上1兆未満）", () => {
    it("100000000 → 1億", () => {
      expect(formatNumber(100000000)).toBe("1億");
    });
    it("126000000 → 1億2600万（日本人口相当）", () => {
      expect(formatNumber(126000000)).toBe("1億2600万");
    });
    it("1380000000 → 13億8000万（インド人口相当）", () => {
      expect(formatNumber(1380000000)).toBe("13億8000万");
    });
    it("1400000000 → 14億（中国人口相当）", () => {
      expect(formatNumber(1400000000)).toBe("14億");
    });
    it("330000000 → 3億3000万（アメリカ人口相当）", () => {
      expect(formatNumber(330000000)).toBe("3億3000万");
    });
  });

  describe("兆単位（1兆以上）", () => {
    it("1000000000000 → 1兆", () => {
      expect(formatNumber(1000000000000)).toBe("1兆");
    });
    it("5000000000000 → 5兆（日本GDP相当）", () => {
      expect(formatNumber(5000000000000)).toBe("5兆");
    });
    it("23000000000000 → 23兆（アメリカGDP相当）", () => {
      expect(formatNumber(23000000000000)).toBe("23兆");
    });
  });
});
