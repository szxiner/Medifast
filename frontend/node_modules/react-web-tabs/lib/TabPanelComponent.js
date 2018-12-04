'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable no-nested-ternary */
var TabPanelComponent = function (_Component) {
  _inherits(TabPanelComponent, _Component);

  function TabPanelComponent() {
    _classCallCheck(this, TabPanelComponent);

    return _possibleConstructorReturn(this, (TabPanelComponent.__proto__ || Object.getPrototypeOf(TabPanelComponent)).apply(this, arguments));
  }

  _createClass(TabPanelComponent, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          component = _props.component,
          render = _props.render,
          tabId = _props.tabId,
          children = _props.children,
          className = _props.className,
          selected = _props.selected,
          props = _objectWithoutProperties(_props, ['component', 'render', 'tabId', 'children', 'className', 'selected']);

      var childProps = { selected: selected };
      return _react2.default.createElement(
        'div',
        _extends({}, props, {
          id: tabId,
          role: 'tabpanel',
          'aria-expanded': selected,
          'aria-hidden': !selected,
          'aria-labelledby': tabId + '-tab',
          hidden: !selected,
          className: 'rwt__tabpanel ' + (className || '')
        }),
        component ? _react2.default.createElement(component, childProps) : render ? render(childProps) : children ? children : null
      );
    }
  }]);

  return TabPanelComponent;
}(_react.Component);

TabPanelComponent.defaultProps = {
  className: '',
  component: null,
  children: null,
  render: null,
  selected: false
};
TabPanelComponent.propTypes = {
  tabId: _propTypes2.default.string.isRequired,
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  component: _propTypes2.default.func,
  render: _propTypes2.default.func,
  selected: _propTypes2.default.bool
};
exports.default = TabPanelComponent;