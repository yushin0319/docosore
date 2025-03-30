export default function About() {
  return (
    <main className="max-w-3xl mx-auto py-12 px-4 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">このサイトについて</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">概要</h2>
        <p>
          本サイトは、世界各国の基礎指標を可視化し、直感的に比較・探索できることを目的としたインタラクティブな地図ツールです。
          スマートフォンやPCから、国を検索したりランキングで並び替えたりすることで、さまざまな切り口から世界を眺めることができます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">使用データ</h2>
        <p>
          以下の公的・信頼性の高いデータソースをもとに、2023年時点の指標を統合・加工しています：
        </p>
        <ul className="list-disc list-inside mt-2">
          <li>
            <strong>World Bank（世界銀行）</strong>
            <ul className="list-disc list-inside ml-5">
              <li>
                森林率: <code>API_AG.LND.FRST.ZS_DS2_en_csv_v2_13350.csv</code>
              </li>
              <li>
                名目GDP: <code>API_NY.GDP.MKTP.CD_DS2_en_csv_v2_26433.csv</code>
              </li>
              <li>
                GDP（PPP）:{" "}
                <code>API_NY.GDP.MKTP.PP.CD_DS2_en_csv_v2_14369.csv</code>
              </li>
              <li>
                平均寿命:{" "}
                <code>API_SP.DYN.LE00.IN_DS2_en_csv_v2_26439.csv</code>
              </li>
              <li>
                若年人口比率:{" "}
                <code>API_SP.POP.0014.TO.ZS_DS2_en_csv_v2_16264.csv</code>
              </li>
            </ul>
          </li>
          <li>
            <strong>UN Population Division（国連人口部）</strong>:{" "}
            <code>WPP2024_TotalPopulationBySex.csv</code>
          </li>
          <li>
            <strong>International Telecommunication Union（ITU）</strong>:{" "}
            <code>individuals-using-the-internet_1742559528582.csv</code>
          </li>
          <li>
            <strong>Climatic Research Unit（CRU）</strong>:{" "}
            <code>cru-ts4.05_mean_historical_cru_ts4.08_mean.xlsx</code>
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">加工・補完</h2>
        <ul className="list-disc list-inside">
          <li>国コード（ISO3）を基準にデータを統一・結合</li>
          <li>欠損値は「データなし」と表示し、集計には含めない</li>
          <li>値の桁数や単位を調整し、視認性を高める工夫を実施</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">データの時点</h2>
        <p>
          原則として <strong>2023年</strong>{" "}
          時点の値を採用しています（出典によって多少のズレあり）。
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">制作・免責事項</h2>
        <ul className="list-disc list-inside">
          <li>このサイトは個人の学習・研究目的で作成されたものです</li>
          <li>内容の正確性には留意していますが、保証はいたしかねます</li>
          <li>
            データの二次利用に関しては、各ソースの利用規約をご確認ください
          </li>
        </ul>
      </section>
    </main>
  );
}
