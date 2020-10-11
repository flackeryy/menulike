import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'

const Heading = withStyles(({ palette, shape, maxWidth }) => ({
  root: {
    maxWidth,
    width: '100%',
    color: palette.heading.primary,
    ...shape.heading
  }
}))(Typography)

export default Heading
