import React, { Component } from 'react'
import { connect, Provider } from 'react-redux'
import { Store } from 'redux'
import { ReduxTypes } from 'constants/reduxTypes'
import configureStore from 'store/configureStore'
import CommonAPI from 'api/CommonAPI'

// https://github.com/zeit/next.js/blob/master/examples/with-redux/utils/withRedux.js

const getOrCreateStore = (initStore: Function, initialState: any) => {
  // Always make a new store if server
  if (CommonAPI.checkServer() || typeof window === 'undefined') {
    return initStore(initialState).store
  }

  // Store in global variable if client
  if (!window[ReduxTypes.__REDUX_STORE__]) {
    window[ReduxTypes.__REDUX_STORE__] = initStore(initialState).store
  }
  return window[ReduxTypes.__REDUX_STORE__]
}

export default (...args: any[]) => (Component: any) => {
  const ConnectedComponent = connect.apply(null, args)(Component)

  class WithProviderComponent extends React.Component<any, any> {
    static async getInitialProps(data: any) {
        return { initialState: data.store.getState() }
    }

    constructor(props: any, context: any) {
      super(props, context)
    }

    componentWillMount() {
    }

    render() {
      const { initialState, store} = this.props
      return (
        <Provider store={store && store.dispatch ? store : getOrCreateStore(configureStore, initialState)}>
          <ConnectedComponent />
        </Provider>
      )
    }
  
  }

  return WithProviderComponent
}