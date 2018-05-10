// - Import react components
import { connect } from 'react-redux'
import { Map } from 'immutable'
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import withRedux from 'src/util/withRedux'
import configureStore from 'store/configureStore'

// - Material-UI
import Button from 'material-ui/Button'
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'

// - Import app components

// - Import API

// - Import actions
import * as globalActions from 'store/actions/globalActions'

import { IHomeProps } from './IHomeProps'
import { IHomeState } from './IHomeState'
import { withStyles } from 'material-ui/styles'
import { homeStyles } from 'containers/home/homeStyles'
import Sample from 'components/sample'

/**
 * Create component class
 */
export class HomeComponent extends Component<IHomeProps, IHomeState> {

  static async getInitialProps(data: any) {
    return { data: data }
  }

  /**
   * Component constructor
   */
  constructor(props: IHomeProps) {
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

    const { translate, data, classes } = this.props
    return (
      <Grid container item justify='center' direction='row' alignItems='center'>
        <Card className={classes.card}>
          <CardContent>
            <Typography gutterBottom variant='headline' component='h2'>
              Here is Home page
          </Typography>
            <Sample />
            <Typography component='p'>
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
              across all continents except Antarctica
          </Typography>
          </CardContent>
          <CardActions>
            <NavLink to='/other' > <Button color='primary' className={classes.button}>
              Go to Other page
      </Button></NavLink>
          </CardActions>
        </Card>

      </Grid>
    )
  }
}

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: IHomeProps) => {

  return {

  }
}

/**
 * Map state to props
 */
const mapStateToProps = (state: Map<string, any>, ownProps: IHomeProps) => {
  return {
  }
}

// - Connect component to redux store
// export default HomeComponent
export default withRedux(mapStateToProps, mapDispatchToProps)(withStyles(homeStyles)(HomeComponent as any))
