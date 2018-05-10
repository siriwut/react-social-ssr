import { take, fork, select, put, call, cancelled, all } from 'redux-saga/effects'
import { CommentActionType } from 'constants/commentActionType'
import { eventChannel, Channel } from 'redux-saga'
import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType'
import { Map } from 'immutable'

/***************************** Subroutines ************************************/

/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

export default function* commentSaga() {
    yield all([
    ])
  }
  