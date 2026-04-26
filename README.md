# docosore

世界地図上で国を選択・検索し、9 指標（人口・GDP・面積等）を比較・可視化する Next.js アプリ。GitHub description: 「どこそれ？を解決する地図」。

- **本番**: https://docosore.vercel.app

## スタック

- Framework: Next.js 16（App Router）/ React 19 / TypeScript
- UI: MUI v9 + Emotion
- Map: Leaflet + react-leaflet
- データ: CSV（PapaParse）+ GeoJSON
- テスト: vitest + @testing-library/react + happy-dom
- Lint: Biome / Husky + lint-staged

## 構成

```
src/app/
  page.tsx                ルート
  about/page.tsx          About
  layout.tsx              Next.js レイアウト
  types.ts                CountryRow 型
  constants.ts            INDICATORS（9 指標）
  hooks/                  useCSVData / useRanking
  utils/format.ts
  components/
    Home.tsx              メイン
    MapViewer.tsx         Leaflet 地図
    SearchBar.tsx         国名検索
    CountryCard.tsx       国情報カード
    RankingTab.tsx        ランキング
    FlyToCountry.tsx      クリックで対象国へズーム
    ZoomBoundController.tsx
    ThemeRegistry.tsx     MUI テーマ
public/
  df_merged.csv           国別データ
  world.geojson           世界地図ポリゴン
```

## 機能

- 地図上で国をクリック → 国情報カード表示
- 検索バーで国名検索 → 該当国へ Leaflet flyTo
- ランキングタブで指標別ソート
- About ページでデータソース・指標の説明

## 開発

```bash
npm install
npm run dev          # :3000
npm run build
npm test             # vitest
npm run lint         # Biome
```

## デプロイ

- Vercel（main push で自動）
- CI: lint / typecheck / build / test
