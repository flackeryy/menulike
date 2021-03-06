import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { createSelector } from 'reselect'
import PropTypes from 'prop-types'
import { isLoggedSelector } from 'modules/selectors/app'

const getIsLogged = createSelector(isLoggedSelector, (isLogged) => isLogged)

function AuthorizedWrapper({ children }) {
  const isLogged = useSelector(getIsLogged)
  return isLogged ? children : <Redirect to="/places" />
}

AuthorizedWrapper.propTypes = {
  children: PropTypes.node
}

export default AuthorizedWrapper
