import React from 'react'
import {
  MuiThemeProvider,
  createMuiTheme,
} from 'material-ui/styles'
import { green, red } from 'material-ui/colors'

const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: red,
    type: 'light',
  },
})

class MuiLayout extends React.Component {
  constructor(props: any) {
    super(props)
  }

  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }
  render() {
    const { children } = this.props

    return (
      <MuiThemeProvider sheetsManager={new Map()} theme={theme}>
        {children}
      </MuiThemeProvider>
    )
  }
}

export default MuiLayout