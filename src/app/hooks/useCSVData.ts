import Papa from "papaparse";
import { useEffect, useState } from "react";
import type { CountryRow } from "../types";

export function useCSVData() {
  const [data, setData] = useState<CountryRow[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch("/df_merged.csv")
      .then((res) => res.text())
      .then((csvText) => {
        const parsedData = Papa.parse(csvText, {
          header: true,
        });
        setData(parsedData.data as CountryRow[]);
      })
      .catch((err) => {
        setError(err instanceof Error ? err : new Error(String(err)));
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}
