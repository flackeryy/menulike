import React from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Grid from '@material-ui/core/Grid'
import SubHeading from 'components/typographies/SubHeading'
import { vh } from 'utils/styles'

const useStyles = makeStyles({
  root: {
    flex: 1,
    padding: '20px 0'
  },
  logoContainer: {
    marginBottom: 55
  },
  logo: {
    fontSize: 100
  },
  subHeading: {
    whiteSpace: 'pre'
  },
  arrowHint: {
    fontSize: vh(35)
  }
})

function Placeholder() {
  const { t } = useTranslation('place_menu_page')
  const classes = useStyles()
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid item className={classes.logoContainer}>
        <i className={classNames('icon-ServingDish', classes.logo)} />
      </Grid>
      <SubHeading className={classes.subHeading}>
        {t('place_menu_page:placeholder_text')}
      </SubHeading>
      <Grid item>
        <i className={classNames('icon-ArrowDownBig', classes.arrowHint)} />
      </Grid>
    </Grid>
  )
}

export default Placeholder
