import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { createSelector } from 'reselect'
import { useDispatch, useSelector } from 'react-redux'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useTranslation } from 'react-i18next'
import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/core/styles/makeStyles'

import ButtonPrimary from 'components/buttons/ButtonPrimary'
import Snackbar from 'components/notifications/Snackbar'
import {
  placeDataSelector,
  placeSendQrErrorSelector,
  placeSendQRSelector
} from 'modules/selectors/place'
import { fetchPlaceSendQr } from 'modules/actions/place'
import { clearSendQr } from 'modules/actions/place'
import CircularProgressWrapper from '../../components/progresses/CircularProgressWrapper'

const useStyles = makeStyles(() => ({
  buttonSendQR: {
    marginBottom: 20
  }
}))

const getSendPlaceQR = createSelector(
  placeSendQRSelector,
  ({ isSuccess, isFetching }) => ({
    isSendQrSuccess: isSuccess,
    isFetching
  })
)

const getSendPlaceQrError = createSelector(
  placeSendQrErrorSelector,
  ({ message }) => ({ errorMessage: message })
)

const getPlaceData = createSelector(
  placeDataSelector,
  ({ public_url, email }) => ({
    publicUrl: public_url,
    email
  })
)

function Buttons() {
  const { t } = useTranslation(['buttons', 'alerts'])
  const classes = useStyles()
  const dispatch = useDispatch()
  const { publicUrl, email } = useSelector(getPlaceData)
  const { isSendQrSuccess, isFetching } = useSelector(getSendPlaceQR)
  const { errorMessage } = useSelector(getSendPlaceQrError)
  const [showSnackbar, setSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [errorSnackbar, setErrorSnackbar] = useState(false)
  const [errorSnackbarMessage, setErrorSnackbarMessage] = useState('')

  const handleSendQrClick = useCallback(() => {
    dispatch(fetchPlaceSendQr())
  }, [dispatch])

  useEffect(() => {
    if (isSendQrSuccess) {
      setSnackbar(true)
      setSnackbarMessage(t('alerts:qr_email_success', { email }))
      dispatch(clearSendQr())
    }
  }, [isSendQrSuccess, setSnackbarMessage, email, t, dispatch])

  useEffect(() => {
    if (errorMessage) {
      setErrorSnackbar(true)
      setErrorSnackbarMessage(errorMessage)
      dispatch(clearSendQr())
    }
  }, [errorMessage, setErrorSnackbar, setErrorSnackbarMessage, dispatch])

  const handleCopy = useCallback(() => {
    setSnackbar(true)
    setSnackbarMessage(t('alerts:menu_link_copied'))
  }, [setSnackbar, t])

  const handleCloseSnackBar = useCallback(() => {
    setSnackbar(false)
    setErrorSnackbar(false)
  }, [setSnackbar, setErrorSnackbar])

  return (
    <Grid container direction="column">
      <Snackbar
        open={showSnackbar}
        onClose={handleCloseSnackBar}
        variant="success"
        message={snackbarMessage}
      />
      <Snackbar
        open={errorSnackbar}
        onClose={handleCloseSnackBar}
        variant="error"
        message={errorSnackbarMessage}
      />
      <ButtonPrimary
        className={classes.buttonSendQR}
        onClick={handleSendQrClick}
      >
        <CircularProgressWrapper isLoading={isFetching}>
          {t('buttons:send_qr_email')}
        </CircularProgressWrapper>
      </ButtonPrimary>
      <CopyToClipboard text={publicUrl} onCopy={handleCopy}>
        <ButtonPrimary>{t('buttons:copy_link')}</ButtonPrimary>
      </CopyToClipboard>
    </Grid>
  )
}

Buttons.propTypes = {
  sendPlaceQr: PropTypes.func,
  setCopySuccess: PropTypes.bool
}

export default Buttons
