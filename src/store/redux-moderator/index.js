"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createModerator = createModerator;
Object.defineProperty(exports, "moderatorReducer", {
  enumerable: true,
  get: function get() {
    return _moderator.moderatorReducer;
  }
});
exports.setPrivileges = void 0;

var _moderator = require("./core/moderator");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Initializr privileges
 */
var setPrivileges = function setPrivileges(privileges) {
  validatePrivilages(privileges);
  return (0, _moderator.readProvileges)(privileges);
};
/**
 * Create moderator
 */


exports.setPrivileges = setPrivileges;

function createModerator(options) {
  var stateTransformer = options.stateTransformer; // Middleware

  return function (store) {
    return function (next) {
      return function (action) {
        if (options) {
          if (options.stateTransformer) {
            if (typeof options.stateTransformer != 'function') {
              throw new Error('The option {stateTransformer} must be a function!');
            }

            stateTransformer = options.stateTransformer;
          }
        }

        var state = stateTransformer ? stateTransformer(store.getState()) : store.getState();
        var meta = action.meta,
            type = action.type;

        if (!(meta && meta.moderator)) {
          return next(action);
        }

        var _meta$moderator = meta.moderator,
            _meta$moderator$activ = _meta$moderator.active,
            active = _meta$moderator$activ === void 0 ? false : _meta$moderator$activ,
            key = _meta$moderator.key;

        if (!active) {
          return next(action);
        }

        if (!key) {
          key = type;
        }

        var actionStatement = (0, _moderator.getStatement)(state, key);

        if (actionStatement.access == 'allow') {
          return next(action);
        }

        return next({
          type: 'Moderator'
        });
      };
    };
  };
}

;
/**
 * Validate privileges
 */

var validatePrivilages = function validatePrivilages(privileges) {
  if (!privileges) {
    throw new Error('Privileges can not be null!');
  }

  if (_typeof(privileges) != 'object') {
    throw new Error('Priviles should be an obejct!');
  }

  if (!privileges.statements) {
    throw new Error('Statements can not be null!');
  }

  if (!Array.isArray(privileges.statements)) {
    throw new Error('Statements should be an array type!');
  }

  for (var index = 0; index < privileges.statements.length; index++) {
    var statement = privileges.statements[index];

    if (!statement.action) {
      throw new Error("Each statement needs 'action' field!");
    }

    if (!Array.isArray(statement.action)) {
      throw new Error("Acction must be an array of string! ".concat(statement.action));
    }

    if (!statement.access) {
      throw new Error("Each statement needs 'access' field!");
    }
  }
};