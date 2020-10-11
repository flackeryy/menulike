import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'

const ButtonOutlined = withStyles(({ palette, shape, maxWidth }) => ({
  root: {
    maxWidth,
    width: '100%',
    background: palette.button.secondary,
    borderColor: palette.button.border.secondary,
    ...shape.button
  },
  label: {
    color: palette.button.label.secondary,
    ...shape.button.label
  }
}))(Button)

export default ButtonOutlined
