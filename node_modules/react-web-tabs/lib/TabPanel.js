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

var _TabPanelComponent = require('./TabPanelComponent');

var _TabPanelComponent2 = _interopRequireDefault(_TabPanelComponent);

var _withTabSelection = require('./withTabSelection');

var _withTabSelection2 = _interopRequireDefault(_withTabSelection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable no-nested-ternary */
var TabPanel = function (_Component) {
  _inherits(TabPanel, _Component);

  function TabPanel(props) {
    _classCallCheck(this, TabPanel);

    var _this = _possibleConstructorReturn(this, (TabPanel.__proto__ || Object.getPrototypeOf(TabPanel)).call(this, props));

    _this.update = _this.update.bind(_this);
    return _this;
  }

  _createClass(TabPanel, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.selection.subscribe(this.update);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.selection.unsubscribe(this.update);
    }
  }, {
    key: 'update',
    value: function update() {
      this.forceUpdate();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          tabId = _props.tabId,
          props = _objectWithoutProperties(_props, ['tabId']);

      var selected = this.props.selection.isSelected(tabId);

      return _react2.default.createElement(_TabPanelComponent2.default, _extends({
        tabId: tabId,
        selected: selected
      }, props));
    }
  }]);

  return TabPanel;
}(_react.Component);

TabPanel.propTypes = {
  selection: _propTypes2.default.shape({
    subscribe: _propTypes2.default.func.isRequired,
    unsubscribe: _propTypes2.default.func.isRequired,
    isSelected: _propTypes2.default.func.isRequired
  }).isRequired,
  tabId: _propTypes2.default.string.isRequired
};
exports.default = (0, _withTabSelection2.default)(TabPanel);