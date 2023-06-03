import React, { useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from './app/hooks';
import { RootState } from './app/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import { ThemeProvider } from '@mui/material/styles';

import theme_dark from './mui_theme/theme_dark';
import theme_light from './mui_theme/theme_light';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import NotFound from './pages/NotFound';
import PrivateRoute from './components/layout/PrivateRoute';

import { FreeRoutes } from './routes/FreeRoutes';
import { AdminRoutes } from './routes/AdminRoutes';
import { UserRoutes } from './routes/UserRoutes';

import { getUserProfile } from './features/auth/auth__Slice';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  const theme_state = useAppSelector(
    (state: RootState) => state.theme__state.is_dark_mode
  );
  const { user } = useAppSelector((state: RootState) => state.auth__state);
  // console.log(user);
  return (
    <ThemeProvider theme={theme_state ? theme_dark : theme_light}>
      <Router>
        <CssBaseline />
        <Header />

        <Container
          sx={{
            mt: '68px',
            minWidth: '360px',
            maxWidth: '900px',
            // border: '1px solid red',
          }}
        >
          <Suspense fallback={<CircularProgress color='secondary' />}>
            <Routes>
              {FreeRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.component}
                />
              ))}
              {user && (
                <>
                  {UserRoutes.map((route) => (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={route.component}
                    />
                  ))}
                  <Route element={<PrivateRoute roles={['admin']} />}>
                    {AdminRoutes.map((route) => (
                      <Route
                        key={route.path}
                        path={route.path}
                        element={route.component}
                      />
                    ))}
                  </Route>
                </>
              )}

              <Route path='*' element={<NotFound />} />
            </Routes>
          </Suspense>
          <Footer />
        </Container>
      </Router>
      <ToastContainer
        autoClose={1000}
        // position='top-left'
        // hideProgressBar={false}
        // newestOnTop={false}
        // closeOnClick
        // rtl={false}
        // pauseOnFocusLoss
        // draggable
        // pauseOnHover
      />
    </ThemeProvider>
  );
}

export default App;
