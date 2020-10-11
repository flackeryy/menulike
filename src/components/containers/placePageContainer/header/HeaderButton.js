import Button from '@material-ui/core/Button'
import withStyles from '@material-ui/core/styles/withStyles'

const HeaderButton = withStyles({
  root: {
    textTransform: 'none',
    fontSize: 16,
    lineHeight: 19,
    margin: 5
  }
})(Button)

export default HeaderButton
