import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import { important, ms, transition } from 'utils/styles'

const ButtonPrimary = withStyles(
  ({ palette, shape, transitions, maxWidth }) => ({
    root: {
      maxWidth,
      width: '100%',
      height: shape.button.height,
      backgroundColor: palette.button.primary,
      borderRadius: shape.button.borderRadius,
      color: palette.button.label.primary,
      transition: transition('all', ms(transitions.primary)),

      '&:hover': {
        background: palette.button.primary,

        '&:disabled': {
          backgroundColor: palette.button.primary
        }
      }
    },
    disabled: {
      opacity: 0.5,
      color: important(palette.button.label.primary)
    },
    label: {
      ...shape.button.label
    }
  })
)(Button)

export default ButtonPrimary
