import { After, ensureReady, } from '@jaredpalmer/after'
import React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './styles/app.css'
import routes from './routes'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import { Provider } from 'react-redux'
import configureStore from 'store/configureStore'
import { ConnectedRouter } from 'react-router-redux'
import { ReduxTypes } from 'constants/reduxTypes'
import MuiLayout from 'layouts/muiLayout'

const theme = createMuiTheme({
	palette: {
		primary: {
			light: '#ffe54c',
			main: '#ffb300',
			dark: '#c68400',
			contrastText: '#000',
		},
		secondary: {
			light: '#6ec6ff',
			main: '#008e6d',
			dark: '#0069c0',
			contrastText: '#000',
		},
	},
	// overrides: {
	// 	MuiAppBar: {
	// 		colorSecondary: {
	// 			backgroundColor: '#2b8dd2'
	// 		}
	// 	}
	// }
})

const reduxStore = configureStore(window[ReduxTypes.__REDUX_STORE__])

ensureReady(routes).then((data) =>
	ReactDOM.hydrate(
		<Provider store={reduxStore.store}>
			<BrowserRouter>
				<MuiLayout>
					<After data={data} routes={routes} />
				</MuiLayout>
			</BrowserRouter>
		</Provider>
		,
		document.getElementById('root')
	)
)

if (module.hot) {
	module.hot.accept()
}
