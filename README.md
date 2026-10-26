# docosore

世界地図上で国を選択・検索し、9 指標（人口・GDP・面積等）を比較・可視化する Next.js アプリ。GitHub description: 「どこそれ？を解決する地図」。

- **本番**: https://docosore.vercel.app

## スタック

- Framework: Next.js 16（App Router）/ React 19 / TypeScript 7
- UI: MUI v9 + Emotion（`@mui/material-nextjs` の `AppRouterCacheProvider`）
- Map: Leaflet + react-leaflet
- データ: CSV（PapaParse）+ GeoJSON。国旗は ISO 3166 の 3 文字コードを i18n-iso-countries で 2 文字に変換して flagcdn.com の画像を表示
- テスト: vitest + @testing-library/react + happy-dom
- Lint: Biome / Husky + lint-staged
- パッケージマネージャ: npm（`package-lock.json`）
- 依存の `overrides`: `postcss ^8.5.25` / `sharp ^0.35.5`（推移的依存の high 脆弱性を潰すため。#128）

## 構成

```
src/app/
  page.tsx                ルート
  about/page.tsx          About
  layout.tsx              Next.js レイアウト（AppRouterCacheProvider + ThemeRegistry）
  types.ts                CountryRow 型
  constants.ts            INDICATORS（9 指標）
  hooks/                  useCSVData / useRanking
  utils/format.ts         数値の日本語表記（兆・億・万）と国旗 URL の組み立て
  components/
    Home.tsx              メイン（「国を検索」「ランキング」の 2 タブ。地図は SSR 無しで動的読み込み）
    MapViewer.tsx         Leaflet 地図（国クリックで選択、上位 N 国を濃淡表示）
    SearchBar.tsx         国名検索
    CountryCard.tsx       国情報カード
    RankingTab.tsx        ランキング（指標の切り替え・上位 N 国スライダー・上位 10 国の表）
    FlyToCountry.tsx      選択した国の中心へ flyTo で移動（スマホ幅のみ）
    ZoomBoundController.tsx ズームに応じて地図の移動範囲（maxBounds）を切り替える
    ThemeRegistry.tsx     MUI テーマ
    __tests__/            CountryCard / RankingTab / SearchBar のテスト
  utils/__tests__/        format のテスト
src/test-setup.ts         vitest のセットアップ（jest-dom 拡張）
public/
  df_merged.csv           国別データ
  world.geojson           世界地図ポリゴン
next.config.ts / vitest.config.ts / biome.json
```

## 機能

- 地図上で国をクリック、または検索バーで国名検索 → 国を選択して国情報カード（国旗・9 指標）を表示
- スマホ幅（600px 以下）では選択した国へ Leaflet の flyTo で地図を移動
- ランキングタブで指標を切り替え、上位 10 国を表示。スライダーで選んだ上位 N 国を地図上で濃淡表示
- About ページ（`/about`）でデータソース・加工方法・データの時点を説明（画面内にリンクは無く、URL を直接開く）

## 開発

```bash
npm install
npm run dev          # :3000
npm run build
npm test             # vitest run（単発）
npm run lint         # Biome
```

## デプロイ

- Vercel（main push で自動）
- CI（`.github/workflows/ci.yml`）: lint（`biome check .`）/ typecheck（`tsc --noEmit`）/ build / test の 4 ジョブ。PR レビュー: `gemini-review.yml`、Dependabot の自動マージ: `dependabot-automerge.yml`
