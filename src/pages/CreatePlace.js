import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Grid from '@material-ui/core/Grid'
import GeneralForm from './createPlace/GeneralForm'
import AddressForm from './createPlace/AddressForm'
import BackButton from 'components/buttons/BackButton'

const useStyles = makeStyles({
  root: {
    padding: '73px 31px 64px'
  }
})

function CreatePlace() {
  const classes = useStyles()
  return (
    <Grid container direction="column" className={classes.root}>
      <BackButton to="/places/welcome" />
      <Switch>
        <Route path="/places/create/general" component={GeneralForm} />
        <Route path="/places/create/address" component={AddressForm} />
        <Redirect to="/places/create/general" />
      </Switch>
    </Grid>
  )
}

export default CreatePlace
