'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TabProvider = require('./TabProvider');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

var withTabSelection = function withTabSelection(Component) {
  var TabSelectionComponent = function TabSelectionComponent(props) {
    return _react2.default.createElement(
      _TabProvider.TabSelectionContext.Consumer,
      null,
      function (selection) {
        return _react2.default.createElement(Component, _extends({}, props, { selection: selection }));
      }
    );
  };
  TabSelectionComponent.WrappedComponent = Component;
  TabSelectionComponent.displayName = 'withTabSelection(' + getDisplayName(Component) + ')';
  return TabSelectionComponent;
};

exports.default = withTabSelection;