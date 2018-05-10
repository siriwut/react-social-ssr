import * as Redux from 'redux'

export const moderator: Redux.Middleware;
  
export as namespace ReduxModerator;

export interface ActionInitPrivilege {
    type: string
    payload: {}
    meta: {}
}

export interface ActionStatement {
    [key: string] : Statement
}

export interface ModeratorState {
    privileges: ActionStatement
}

export interface Statement {
    action: string[]
    access: string

}

export interface Privileges {
    statements: Statement[]
}

export interface ReduxModeratorOptions {
    stateTransformer: (state: any) => any
}

export function setPrivileges(privileges: Privileges): ActionInitPrivilege
export function moderatorReducer(state: ModeratorState, action: Redux.Action): ModeratorState;
export function createModerator(options?: ReduxModeratorOptions): Redux.Middleware;

export default moderator;
