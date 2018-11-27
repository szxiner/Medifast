'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabSelectionContext = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TabSelection = require('./TabSelection');

var _TabSelection2 = _interopRequireDefault(_TabSelection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TabSelectionContext = exports.TabSelectionContext = _react2.default.createContext({
  selection: {}
});

var TabProvider = function (_Component) {
  _inherits(TabProvider, _Component);

  function TabProvider(props) {
    _classCallCheck(this, TabProvider);

    var _this = _possibleConstructorReturn(this, (TabProvider.__proto__ || Object.getPrototypeOf(TabProvider)).call(this, props));

    _this.selection = new _TabSelection2.default({
      defaultTab: props.defaultTab,
      vertical: props.vertical,
      collapsible: props.collapsible,
      onChange: props.onChange
    });
    return _this;
  }

  _createClass(TabProvider, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.defaultTab !== nextProps.defaultTab && !this.selection.isSelected(nextProps.defaultTab)) {
        this.selection.select(nextProps.defaultTab);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var children = this.props.children;

      return _react2.default.createElement(
        TabSelectionContext.Provider,
        { value: this.selection },
        children
      );
    }
  }]);

  return TabProvider;
}(_react.Component);

TabProvider.defaultProps = {
  defaultTab: undefined,
  onChange: undefined,
  vertical: false,
  collapsible: false
};
TabProvider.propTypes = {
  children: _propTypes2.default.node.isRequired,
  defaultTab: _propTypes2.default.string,
  vertical: _propTypes2.default.bool,
  collapsible: _propTypes2.default.bool,
  onChange: _propTypes2.default.func
};
exports.default = TabProvider;