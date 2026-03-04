import { Box, Container, Typography } from "@mui/material";

export default function About() {
  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{ py: 6, px: 2, color: "text.primary" }}
    >
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
        このサイトについて
      </Typography>

      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
          概要
        </Typography>
        <Typography variant="body1">
          本サイトは、世界各国の基礎指標を可視化し、直感的に比較・探索できることを目的としたインタラクティブな地図ツールです。
          スマートフォンやPCから、国を検索したりランキングで並び替えたりすることで、さまざまな切り口から世界を眺めることができます。
        </Typography>
      </Box>

      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
          使用データ
        </Typography>
        <Typography variant="body1">
          以下の公的・信頼性の高いデータソースをもとに、2023年時点の指標を統合・加工しています：
        </Typography>
        <Box
          component="ul"
          sx={{ listStyleType: "disc", listStylePosition: "inside", mt: 1 }}
        >
          <Box component="li">
            <strong>World Bank（世界銀行）</strong>
            <Box
              component="ul"
              sx={{
                listStyleType: "disc",
                listStylePosition: "inside",
                ml: 2.5,
              }}
            >
              <Box component="li">
                森林率: <code>API_AG.LND.FRST.ZS_DS2_en_csv_v2_13350.csv</code>
              </Box>
              <Box component="li">
                名目GDP: <code>API_NY.GDP.MKTP.CD_DS2_en_csv_v2_26433.csv</code>
              </Box>
              <Box component="li">
                GDP（PPP）:{" "}
                <code>API_NY.GDP.MKTP.PP.CD_DS2_en_csv_v2_14369.csv</code>
              </Box>
              <Box component="li">
                平均寿命:{" "}
                <code>API_SP.DYN.LE00.IN_DS2_en_csv_v2_26439.csv</code>
              </Box>
              <Box component="li">
                若年人口比率:{" "}
                <code>API_SP.POP.0014.TO.ZS_DS2_en_csv_v2_16264.csv</code>
              </Box>
            </Box>
          </Box>
          <Box component="li">
            <strong>UN Population Division（国連人口部）</strong>:{" "}
            <code>WPP2024_TotalPopulationBySex.csv</code>
          </Box>
          <Box component="li">
            <strong>International Telecommunication Union（ITU）</strong>:{" "}
            <code>individuals-using-the-internet_1742559528582.csv</code>
          </Box>
          <Box component="li">
            <strong>Climatic Research Unit（CRU）</strong>:{" "}
            <code>cru-ts4.05_mean_historical_cru_ts4.08_mean.xlsx</code>
          </Box>
        </Box>
      </Box>

      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
          加工・補完
        </Typography>
        <Box
          component="ul"
          sx={{ listStyleType: "disc", listStylePosition: "inside" }}
        >
          <Box component="li">国コード（ISO3）を基準にデータを統一・結合</Box>
          <Box component="li">
            欠損値は「データなし」と表示し、集計には含めない
          </Box>
          <Box component="li">
            値の桁数や単位を調整し、視認性を高める工夫を実施
          </Box>
        </Box>
      </Box>

      <Box component="section" sx={{ mb: 4 }}>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
          データの時点
        </Typography>
        <Typography variant="body1">
          原則として <strong>2023年</strong>{" "}
          時点の値を採用しています（出典によって多少のズレあり）。
        </Typography>
      </Box>

      <Box component="section">
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
          制作・免責事項
        </Typography>
        <Box
          component="ul"
          sx={{ listStyleType: "disc", listStylePosition: "inside" }}
        >
          <Box component="li">
            このサイトは個人の学習・研究目的で作成されたものです
          </Box>
          <Box component="li">
            内容の正確性には留意していますが、保証はいたしかねます
          </Box>
          <Box component="li">
            データの二次利用に関しては、各ソースの利用規約をご確認ください
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
