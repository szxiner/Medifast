'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeyCode = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TabComponent = require('./TabComponent');

var _TabComponent2 = _interopRequireDefault(_TabComponent);

var _withTabSelection = require('./withTabSelection');

var _withTabSelection2 = _interopRequireDefault(_withTabSelection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var KeyCode = exports.KeyCode = {
  END: 35,
  HOME: 36,
  LEFT_ARROW: 37,
  UP_ARROW: 38,
  RIGHT_ARROW: 39,
  DOWN_ARROW: 40
};

var Tab = function (_Component) {
  _inherits(Tab, _Component);

  function Tab(props) {
    _classCallCheck(this, Tab);

    var _this = _possibleConstructorReturn(this, (Tab.__proto__ || Object.getPrototypeOf(Tab)).call(this, props));

    _this.update = _this.update.bind(_this);
    _this.handleClick = _this.handleClick.bind(_this);
    _this.handleKeyDown = _this.handleKeyDown.bind(_this);

    props.selection.register(props.tabFor);
    return _this;
  }

  _createClass(Tab, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.selection.subscribe(this.update);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.selection.unsubscribe(this.update);
      this.props.selection.unregister(this.props.tabFor);
    }
  }, {
    key: 'update',
    value: function update() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          focus = _ref.focus;

      this.forceUpdate();
      if (focus && this.props.selection.isSelected(this.props.tabFor)) {
        this.tabComponent.focus();
      }
    }
  }, {
    key: 'handleClick',
    value: function handleClick(event) {
      this.props.selection.select(this.props.tabFor);

      if (this.props.onClick) {
        this.props.onClick(event);
      }
    }
  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown(e) {
      var verticalOrientation = this.props.selection.isVertical();
      if (e.keyCode === KeyCode.HOME) {
        this.props.selection.selectFirst({ focus: true });
      } else if (e.keyCode === KeyCode.END) {
        this.props.selection.selectLast({ focus: true });
      } else if (e.keyCode === KeyCode.LEFT_ARROW && !verticalOrientation) {
        this.props.selection.selectPrevious({ focus: true });
      } else if (e.keyCode === KeyCode.RIGHT_ARROW && !verticalOrientation) {
        this.props.selection.selectNext({ focus: true });
      } else if (e.keyCode === KeyCode.UP_ARROW && verticalOrientation) {
        e.preventDefault();
        this.props.selection.selectPrevious({ focus: true });
      } else if (e.keyCode === KeyCode.DOWN_ARROW && verticalOrientation) {
        e.preventDefault();
        this.props.selection.selectNext({ focus: true });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          tabFor = _props.tabFor,
          children = _props.children,
          className = _props.className,
          props = _objectWithoutProperties(_props, ['tabFor', 'children', 'className']);

      var isSelected = this.props.selection.isSelected(tabFor);

      return _react2.default.createElement(
        _TabComponent2.default,
        _extends({}, props, {
          tabFor: tabFor,
          onClick: this.handleClick,
          onKeyDown: this.handleKeyDown,
          selected: isSelected,
          className: className,
          tabRef: function tabRef(e) {
            _this2.tabComponent = e;
          }
        }),
        children
      );
    }
  }]);

  return Tab;
}(_react.Component);

Tab.defaultProps = {
  className: '',
  selected: false,
  onClick: undefined
};
Tab.propTypes = {
  selection: _propTypes2.default.shape({
    subscribe: _propTypes2.default.func.isRequired,
    unsubscribe: _propTypes2.default.func.isRequired,
    register: _propTypes2.default.func.isRequired,
    unregister: _propTypes2.default.func.isRequired,
    isSelected: _propTypes2.default.func.isRequired,
    select: _propTypes2.default.func.isRequired,
    selectNext: _propTypes2.default.func.isRequired,
    selectPrevious: _propTypes2.default.func.isRequired,
    selectFirst: _propTypes2.default.func.isRequired,
    selectLast: _propTypes2.default.func.isRequired,
    isVertical: _propTypes2.default.func.isRequired
  }).isRequired,
  tabFor: _propTypes2.default.string.isRequired,
  children: _propTypes2.default.node.isRequired,
  className: _propTypes2.default.string,
  selected: _propTypes2.default.bool,
  onClick: _propTypes2.default.func
};
exports.default = (0, _withTabSelection2.default)(Tab);