import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import { important, rgba } from './utils/styles'

export default function createTheme() {
  return createMuiTheme({
    maxWidth: 600,
    palette: {
      background: {
        primary: '#ebe8eb'
      },
      button: {
        primary: '#000',
        secondary: 'transparent',
        border: {
          primary: '#000',
          secondary: '#000'
        },
        label: {
          primary: '#fff',
          secondary: '#000'
        }
      },
      heading: {
        primary: '#000'
      },
      subHeading: {
        primary: 'rgba(0, 0, 0, 0.6)'
      },
      formControl: {
        border: {
          primary: '#000'
        },
        focused: {
          shadow: {
            primary: 'rgba(0, 0, 0, 0.5)'
          }
        },
        error: {
          shadow: {
            primary: 'rgb(244, 67, 54, 0.5)'
          }
        },
        placeholder: {
          primary: 'rgba(0, 0, 0, 0.5)'
        }
      },
      link: {
        primary: '#666666'
      }
    },
    lineHeight: {
      primary: 24
    },
    transitions: {
      primary: 350
    },
    fontFamily: {
      primary: 'Roboto'
    },
    shape: {
      container: {
        width: '100%',
        maxWidth: 600
      },
      button: {
        height: 56,
        borderRadius: 28,
        borderWidth: 2,
        borderStyle: 'solid',
        label: {
          textTransform: 'uppercase',
          fontWeight: 600
        }
      },
      heading: {
        fontSize: 24,
        marginBottom: 40,
        lineHeight: '29px',
        textAlign: 'center',
        fontWeight: 'bold'
      },
      subHeading: {
        fontSize: 18,
        marginBottom: 33,
        lineHeight: '24px',
        textAlign: 'center',
        whiteSpace: 'normal'
      },
      formControl: {
        height: 56,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 28,
        boxSizing: 'border-box',
        textAlign: 'center'
      },
      formControlFocused: {
        borderWidth: 2
      },
      formControlMui: {
        '& input': {
          fontSize: 16
        },
        '& label': {
          color: rgba(0, 0, 0, 0.5),
          fontSize: 14,
          transform: 'none'
        },
        '& > div': {
          '&::after': {
            borderBottomColor: '#000'
          }
        }
      },
      formControlMuiLabel: {
        fontSize: 14,
        transform: 'none',
        marginBottom: 2
      },
      formControlMuiLabelFocused: {
        color: important(rgba(0, 0, 0, 0.5))
      }
    }
  })
}
