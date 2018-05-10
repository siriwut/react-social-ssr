"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStatement = exports.privileges = exports.moderatorReducer = exports.getModerateAction = exports.readProvileges = void 0;

var _actionTypes = require("./actionTypes");

/**
 * Read privileges
 */
var readProvileges = function readProvileges(privileges) {
  var initializePrivilegeAction = {
    type: _actionTypes.moderatorActionTypes.INITIALIZE_PRIVILEGES,
    payload: {
      privileges: privileges
    }
  };
  return initializePrivilegeAction;
};
/**
 * Initialize states
 */


exports.readProvileges = readProvileges;
var initialPrivileges = {};
var initialState = {
  privileges: initialPrivileges
};

var getModerateAction = function getModerateAction(statement, meta) {
  var access = statement.access,
      action = statement.action;
  var accessAction = meta.moderator.action ? meta.moderator.action[access] : null;

  if (accessAction) {
    if (!accessAction.type) {
      throw new Error("Action for moderator access object must have {type} field. Happened on { ".concat(action, " } action"));
    }

    return accessAction;
  }

  return {
    type: "RXM_".concat(action, "_").concat(access.toUpperCase())
  };
};
/**
 * Moderator reducer
 */


exports.getModerateAction = getModerateAction;

var moderatorReducer = function moderatorReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  return {
    privileges: privileges(state.privileges, action)
  };
};
/**
 * Priviles reducer
 */


exports.moderatorReducer = moderatorReducer;

var privileges = function privileges() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialPrivileges;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _actionTypes.moderatorActionTypes.INITIALIZE_PRIVILEGES:
      var actionStatements = mapToActionStatement(action.payload.privileges);
      return {
        statements: actionStatements
      };
      break;

    default:
      return state;
      break;
  }
};
/**
 * Get moderator action
 */


exports.privileges = privileges;

var getStatement = function getStatement(state, actionName) {
  if (!(state.moderator && state.moderator.privileges && state.moderator.privileges.statements && Object.keys(state.moderator.privileges.statements).length > 0)) {
    return undefined;
  }

  var statements = state.moderator.privileges.statements;
  return statements[actionName];
};
/**
 * Map privileges to action statement
 */


exports.getStatement = getStatement;

var mapToActionStatement = function mapToActionStatement(privileges) {
  if (!privileges) {
    return privileges;
  }

  var actionStatements = {};
  privileges.statements.forEach(function (statement) {
    var actionArray = statement.action.slice(',');
    actionArray.forEach(function (action) {
      actionStatements[action] = Object.assign({}, statement, {
        action: action
      });
    });
  });
  return actionStatements;
};