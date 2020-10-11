import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'

const SubHeading = withStyles(({ palette, shape, maxWidth }) => ({
  root: {
    maxWidth,
    width: '100%',
    color: palette.subHeading.primary,
    ...shape.subHeading
  }
}))(Typography)

export default SubHeading
