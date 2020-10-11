import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import PageContainer from 'components/containers/PageContainer'
import UnauthorizedWrapper from 'components/wrappers/UnauthorizedWrapper'
import Welcome from 'pages/Welcome'
import CreatePlace from 'pages/CreatePlace'
import Login from 'pages/Login'
import PlaceRecovery from 'pages/PlaceRecovery'

function Unauthorized() {
  return (
    <UnauthorizedWrapper>
      <PageContainer>
        <Switch>
          <Route path="/places/welcome" component={Welcome} />
          <Route path="/places/create" component={CreatePlace} />
          <Route path="/places/login/:id?/:placePin?" component={Login} />
          <Route path="/places/recovery" component={PlaceRecovery} />
          <Redirect to="/places/welcome" />
        </Switch>
      </PageContainer>
    </UnauthorizedWrapper>
  )
}

export default Unauthorized
