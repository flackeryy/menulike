import React, { Suspense } from 'react'
import Div100vh from 'react-div-100vh'
import { ThemeProvider } from '@material-ui/core/styles'
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom'
import Unauthorized from 'components/modules/Unauthorized'
import Authorized from 'components/modules/Authorized'
import LoadingOverlay from 'components/progresses/LoadingOverlay'
import useGeolocation from './hooks/useGeolocation'
import createTheme from './theme'
import { DIV_100_VH_STYLES } from 'constants/div100vh'
import './i18n'
import 'styles/index.sass'

const theme = createTheme()

function App() {
  useGeolocation()
  return (
    <Suspense fallback={<LoadingOverlay independent />}>
      <ThemeProvider theme={theme}>
        <Div100vh as="main" style={DIV_100_VH_STYLES}>
          <LoadingOverlay />
          <BrowserRouter>
            <Switch>
              <Route path="/places" component={Unauthorized} />
              <Route path="/place" component={Authorized} />
              <Redirect to="/places" />
            </Switch>
          </BrowserRouter>
        </Div100vh>
      </ThemeProvider>
    </Suspense>
  )
}

export default App
