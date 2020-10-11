import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ButtonPrimary from 'components/buttons/ButtonPrimary'
import ButtonOutlined from 'components/buttons/ButtonOutlined'
import Heading from 'components/typographies/Heading'
import SubHeading from 'components/typographies/SubHeading'
import { px } from 'utils/styles'
import { clearCreatePlace } from 'modules/actions/places'
import LogoPrimary from 'assets/logos/logo_primary.svg'

const useStyles = makeStyles(({ lineHeight }) => ({
  root: {
    padding: '41px 52px 27px',
    flex: 1
  },
  logo: {
    marginBottom: 34
  },
  loginButtonLabel: {
    marginBottom: 33,
    fontSize: 14,
    fontWeight: 300,
    lineHeight: px(lineHeight.primary)
  }
}))

function Welcome() {
  const { t } = useTranslation(['home_page', 'buttons'])
  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(clearCreatePlace())
  }, [dispatch])

  return (
    <Grid
      container
      direction="column"
      justify="space-between"
      className={classes.root}
    >
      <Grid container direction="column" alignItems="center">
        <Grid item container justify="center">
          <img src={LogoPrimary} alt="logo_primary" className={classes.logo} />
        </Grid>
        <Heading>{t('home_page:heading')}</Heading>
        <SubHeading>{t('home_page:sub_heading')}</SubHeading>
        <ButtonPrimary component={Link} to="/places/create">
          {t('buttons:create_menu')}
        </ButtonPrimary>
      </Grid>
      <Grid container direction="column" alignItems="center">
        <Typography align="center" className={classes.loginButtonLabel}>
          {t('home_page:already_have_account')}
        </Typography>
        <ButtonOutlined component={Link} to="/places/login">
          {t('buttons:login')}
        </ButtonOutlined>
      </Grid>
    </Grid>
  )
}

export default Welcome
