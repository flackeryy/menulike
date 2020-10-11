import React from 'react'
import PropTypes from 'prop-types'
import Alert from '@material-ui/lab/Alert'
import MuiSnackbar from '@material-ui/core/Snackbar'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles({
  success: {
    background: '#000'
  }
})

function Snackbar({
  open,
  onClose,
  autoHideDuration,
  message,
  variant,
  anchorVertical,
  anchorHorizontal
}) {
  const classes = useStyles()

  return (
    <MuiSnackbar
      open={open}
      onClose={onClose}
      autoHideDuration={autoHideDuration}
      ClickAwayListenerProps={{
        onClickAway: (f) => f
      }}
      anchorOrigin={{
        vertical: anchorVertical,
        horizontal: anchorHorizontal
      }}
    >
      <Alert
        elevation={6}
        variant="filled"
        severity={variant}
        onClose={onClose}
        classes={{
          filledSuccess: classes.success
        }}
      >
        {message}
      </Alert>
    </MuiSnackbar>
  )
}

Snackbar.propTypes = {
  message: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['success', 'error', 'warning', 'info']).isRequired,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  autoHideDuration: PropTypes.number,
  anchorVertical: PropTypes.string,
  anchorHorizontal: PropTypes.string
}

Snackbar.defaultProps = {
  open: false,
  onClose: (f) => f,
  autoHideDuration: 6000,
  variant: 'success',
  anchorVertical: 'top',
  anchorHorizontal: 'center'
}

export default Snackbar
