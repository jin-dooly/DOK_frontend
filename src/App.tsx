import { ThemeProvider as MuiThemeProvider } from "@mui/material";
import { ThemeProvider } from "styled-components";
import "./App.css";
import { theme, defaultTheme } from "./assets/themes/theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/Common/Scroll/ScrollToTop";
import { MainPage } from "./pages/MainPage/MainPage";
import { CertificationListPage } from "./pages/Certification/CertificationListPage";
import { MatchingListPage } from "./pages/Matching/MatchingListPage";
import { MatchingDetailPage } from "./pages/Matching/MatchingDetailPage";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={defaultTheme}>
        <MuiThemeProvider theme={theme}>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/certification" element={<CertificationListPage />} />
              <Route path="/matching" element={<MatchingListPage />} />
              <Route path="/matching-detail" element={<MatchingDetailPage />}/>
            </Routes>
          </BrowserRouter>
        </MuiThemeProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
