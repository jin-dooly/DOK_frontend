import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ThemeProvider } from 'styled-components';
import './App.css';
import { theme, defaultTheme } from './styles/theme';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={defaultTheme}>
        <MuiThemeProvider theme={theme}>
          <Provider store={store}>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </Provider>
        </MuiThemeProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
