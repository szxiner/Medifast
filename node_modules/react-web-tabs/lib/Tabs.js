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

var _TabProvider = require('./TabProvider');

var _TabProvider2 = _interopRequireDefault(_TabProvider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tabs = function (_Component) {
  _inherits(Tabs, _Component);

  function Tabs() {
    _classCallCheck(this, Tabs);

    return _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).apply(this, arguments));
  }

  _createClass(Tabs, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          defaultTab = _props.defaultTab,
          onChange = _props.onChange,
          vertical = _props.vertical,
          collapsible = _props.collapsible,
          className = _props.className,
          props = _objectWithoutProperties(_props, ['children', 'defaultTab', 'onChange', 'vertical', 'collapsible', 'className']);

      return _react2.default.createElement(
        _TabProvider2.default,
        {
          defaultTab: defaultTab,
          onChange: onChange,
          vertical: vertical,
          collapsible: collapsible
        },
        _react2.default.createElement(
          'div',
          _extends({}, props, { 'data-rwt-vertical': vertical, className: 'rwt__tabs ' + (className || '') }),
          children
        )
      );
    }
  }]);

  return Tabs;
}(_react.Component);

Tabs.defaultProps = {
  defaultTab: undefined,
  className: '',
  vertical: false,
  collapsible: false,
  onChange: undefined
};
Tabs.propTypes = {
  children: _propTypes2.default.node.isRequired,
  defaultTab: _propTypes2.default.string,
  className: _propTypes2.default.string,
  vertical: _propTypes2.default.bool,
  collapsible: _propTypes2.default.bool,
  onChange: _propTypes2.default.func
};
exports.default = Tabs;