import React from 'react'
import PropTypes from 'prop-types'
import Div100vh from 'react-div-100vh'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Grid from '@material-ui/core/Grid'
import Header from './placePageContainer/Header'
import Footer from './placePageContainer/Footer'
import { DIV_100_VH_PLACE_PAGE_CONTAINER_STYLES } from 'constants/div100vh'

const useStyles = makeStyles(({ palette }) => ({
  root: {
    display: 'flex',
    width: '100%'
  },
  container: {
    flex: 1,
    background: palette.background.primary
  },
  content: {
    minHeight: 'calc(100% - 113px)',
    maxHeight: 'calc(100% - 113px)',
    overflow: 'auto'
  }
}))

function PlacePageContainer({
  headerLeftComponent,
  headerRightComponent,
  footerActiveLeft,
  footerActiveRight,
  title,
  children
}) {
  const classes = useStyles()
  return (
    <Div100vh
      className={classes.root}
      style={DIV_100_VH_PLACE_PAGE_CONTAINER_STYLES}
    >
      <Grid
        container
        className={classes.container}
        direction="column"
        justify="space-between"
        wrap="nowrap"
      >
        <Header
          title={title}
          leftComponent={headerLeftComponent}
          rightComponent={headerRightComponent}
        />
        <Grid
          container
          direction="column"
          alignItems="center"
          className={classes.content}
        >
          {children}
        </Grid>
        <Footer activeLeft={footerActiveLeft} activeRight={footerActiveRight} />
      </Grid>
    </Div100vh>
  )
}

PlacePageContainer.propTypes = {
  headerLeftComponent: PropTypes.node,
  headerRightComponent: PropTypes.node,
  title: PropTypes.string,
  children: PropTypes.node,
  footerActiveLeft: PropTypes.bool,
  footerActiveRight: PropTypes.bool
}

PlacePageContainer.defaultProps = {
  headerLeftComponent: <div />,
  headerRightComponent: <div />
}

export default PlacePageContainer
