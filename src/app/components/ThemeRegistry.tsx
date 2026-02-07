// app/components/ThemeRegistry.tsx
"use client";

import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    map: {
      background: string;
      border: string;
      selected: string;
      noData: string;
    };
    rankBar: string;
  }
  interface PaletteOptions {
    map?: {
      background: string;
      border: string;
      selected: string;
      noData: string;
    };
    rankBar?: string;
  }
}

const theme = createTheme({
  palette: {
    background: {
      default: "#eeeeee",
      paper: "#f5f5f5",
    },
    text: {
      primary: "#333333",
    },
    map: {
      background: "#DDDDED",
      border: "#333333",
      selected: "#f39c12",
      noData: "#bbbbbb",
    },
    rankBar: "#0000ff",
  },
});

export function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
