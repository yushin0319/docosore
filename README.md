# ドコソレ (docosore)

世界地図上で国を探して、各国の基礎指標を比較・探索できるインタラクティブ地図アプリです。

## 主な機能

- **国検索**: 国名（日本語・ひらがな）で検索し、地図上で国を選択
- **国情報カード**: 選択した国の人口・GDP・面積など9指標を表示（順位バー付き）
- **ランキング**: 指標を選択してトップ10を表示、スライダーで地図上に色分け表示
- **レスポンシブ対応**: モバイル・デスクトップ両対応

## 技術スタック

| カテゴリ | 技術 |
|---------|------|
| フレームワーク | Next.js 16 (App Router) |
| UI | MUI (Material UI) v7 |
| 地図 | Leaflet + react-leaflet |
| データ処理 | PapaParse (CSV), i18n-iso-countries |
| 言語 | TypeScript, React 19 |

## セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev
```

http://localhost:3000 でアクセスできます。

## ディレクトリ構成

```
src/app/
├── page.tsx                  # ルートページ（Homeコンポーネントを表示）
├── layout.tsx                # 共通レイアウト（テーマ設定）
├── about/
│   └── page.tsx              # サイト概要・データソース説明
└── components/
    ├── Home.tsx              # メインページ（タブ切替・CSV読込・状態管理）
    ├── MapViewer.tsx         # Leaflet地図表示・GeoJSONレンダリング
    ├── CountryCard.tsx       # 国情報カード（指標一覧・順位表示）
    ├── RankingTab.tsx        # ランキングタブ（指標選択・上位表示）
    ├── SearchBar.tsx         # 国名検索バー（オートコンプリート）
    ├── FlyToCountry.tsx      # 地図アニメーション移動
    ├── ZoomBoundController.tsx # ズームレベルに応じた地図範囲制御
    └── ThemeRegistry.tsx     # MUIテーマプロバイダー

public/
├── df_merged.csv             # 国別統合データ（CSV）
└── world.geojson             # 世界地図ポリゴンデータ
```

## 使用データ

World Bank、国連人口部、ITU、CRU等の公的データソースから2023年時点の指標を統合。
詳細は `/about` ページを参照してください。
