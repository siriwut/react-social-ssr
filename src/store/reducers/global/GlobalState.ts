import { Map, fromJS, List } from 'immutable'
/**
 * Global state
 *
 * @export
 * @class GlobalState
 */
export class GlobalState {

 /**
  * Set percent of loading progress and visibility for Master component
  */
  progress = Map({
    percent: 0,
    visible: false
  })

 /**
  * If loading is enabled {true} or not false
  */
  loadingStatus: boolean = true

 /**
  * Whether drawer is open
  */
 drawerOpen: boolean = false

 /**
  * Whether send feedback is diplayed
  */
  sendFeedbackStatus: boolean = false

 /**
  * If user date is loaded {true} or not {false}
  */
  defaultLoadDataStatus: boolean = false

 /**
  * If message popup is open {true} or not {false}
  */
  messageOpen: boolean = false

 /**
  * The text of popup global message
  */
  message: string = ''

 /**
  * The text of website header
  */
  headerTitle: string = ''

 /**
  * Top loading is visible {true} or not {false}
  */
  showTopLoading: boolean = false

 /**
  * Top loading message queue
  */
  topLoadingQueue: number = 0

 /**
  * Master loading is visible {true} or not {false}
  */
  showMasterLoading: boolean = true

 /**
  * Master loading message queue
  */
  masterLoadingQueue: number = 0

 /**
  * Temp date storage
  */
  temp: any = Map({
    caller: List()
  })
}
