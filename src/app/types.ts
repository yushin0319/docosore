/**
 * CSVデータ（df_merged.csv）の各行を表す型
 *
 * 既知のカラム:
 * code, name_ja, name_en, population, gdp_nominal, gdp_ppp_per_capita,
 * gdp_ppp, y_gdp, y_ppp, y_population, surface, population_density,
 * y_net, net, y_life, life, y_young, young, y_forest, forest,
 * y_tas, tas, capital_en, capital_ja, name_ja_hira
 */
export interface CountryRow {
  code: string;
  name_ja: string;
  [key: string]: string;
}
