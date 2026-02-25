# docosore - 世界地図インタラクティブ探索アプリ

## 概要

世界地図上で国を選択・検索し、各国の基礎指標（人口・GDP・面積など 9 指標）を比較・探索できる Web アプリ。

## 技術スタック

- **Framework**: Next.js 15（App Router）/ React 19 / TypeScript 5
- **UI**: MUI v7 + Emotion
- **地図**: Leaflet + react-leaflet
- **データ**: CSV（PapaParse でパース）/ GeoJSON
- **テスト**: Vitest 4 + @testing-library/react + happy-dom

## ディレクトリ構成

```
docosore/
├── public/
│   ├── df_merged.csv       # 国別統合データ（World Bank 等）
│   └── world.geojson       # 世界地図ポリゴン
└── src/app/
    ├── page.tsx             # ルートページ
    ├── types.ts             # CountryRow 型
    ├── constants.ts         # INDICATORS 定数（9 指標）
    ├── components/
    │   ├── Home.tsx         # メイン（状態管理・タブ切替）
    │   ├── MapViewer.tsx    # Leaflet 地図表示
    │   ├── CountryCard.tsx  # 国情報カード
    │   ├── RankingTab.tsx   # ランキングタブ
    │   ├── SearchBar.tsx    # 国名検索
    │   └── __tests__/       # コンポーネントテスト
    ├── hooks/               # useCSVData, useRanking
    └── utils/               # format ユーティリティ
```

## コマンド

```bash
npm install
npm run dev          # localhost:3000
npm run build        # 本番ビルド
npm test             # vitest run
npm run lint         # ESLint
```

## テスト方針

- Vitest + happy-dom 環境
- `src/test-setup.ts` で matchMedia モック（MUI 対応）
- コンポーネントテストは `__tests__/` ディレクトリに配置
- パスエイリアス: `@/*` → `./src/*`

## CI/CD

- `gemini-review.yml`: PR 自動レビュー
