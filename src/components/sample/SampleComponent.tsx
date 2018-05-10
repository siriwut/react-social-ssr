// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import { Map } from 'immutable'

// - Import app components

// - Import API

// - Import actions
import * as globalActions from 'store/actions/globalActions'

import { ISampleProps } from './ISampleProps'
import { ISampleState } from './ISampleState'

/**
 * Create component class
 */
export class SampleComponent extends Component<ISampleProps, ISampleState> {

  /**
   * Component constructor
   */
  constructor(props: ISampleProps) {
    super(props)

    // Defaul state
    this.state = {

    }

    // Binding functions to `this`

  }

  /**
   * Reneder component DOM
   */
  public render() {

    // const { translate} = this.props
    return (
      <div>
        <h1>Hello from sample</h1>
      </div>
    )
  }
}

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: ISampleProps) => {

  return {
  }
}

/**
 * Map state to props
 */
const mapStateToProps = (state: Map<string, any>, ownProps: ISampleProps) => {

  return {

  }
}

// - Connect component to redux store
export default SampleComponent
