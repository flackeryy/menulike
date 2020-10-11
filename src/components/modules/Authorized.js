import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import AuthorizedWrapper from 'components/wrappers/AuthorizedWrapper'
import PlaceMenu from 'pages/PlaceMenu'
import PlaceShare from 'pages/PlaceShare'
import EditPlace from 'pages/EditPlace'
import useAuth from 'hooks/useAuth'

function Authorized() {
  useAuth()
  return (
    <AuthorizedWrapper>
      <Switch>
        <Route path="/place/menu" component={PlaceMenu} />
        <Route path="/place/share" component={PlaceShare} />
        <Route path="/place/edit" component={EditPlace} />
        <Redirect to="/place/menu" />
      </Switch>
    </AuthorizedWrapper>
  )
}

export default Authorized
