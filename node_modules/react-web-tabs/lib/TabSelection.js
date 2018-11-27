"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TabSelection = function () {
  function TabSelection() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        defaultTab = _ref.defaultTab,
        _ref$vertical = _ref.vertical,
        vertical = _ref$vertical === undefined ? false : _ref$vertical,
        _ref$collapsible = _ref.collapsible,
        collapsible = _ref$collapsible === undefined ? false : _ref$collapsible,
        onChange = _ref.onChange;

    _classCallCheck(this, TabSelection);

    this.selected = defaultTab;
    this.tabs = [];
    this.subscribtions = [];
    this.onChange = onChange;
    this.vertical = vertical;
    this.collapsible = collapsible;
  }

  _createClass(TabSelection, [{
    key: "select",
    value: function select(tabId) {
      var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref2$focus = _ref2.focus,
          focus = _ref2$focus === undefined ? false : _ref2$focus;

      if (!this.tabs.includes(tabId) || !this.collapsible && this.isSelected(tabId)) {
        return;
      }

      if (this.isSelected(tabId)) {
        this.selected = undefined;
      } else {
        this.selected = tabId;
      }

      this.subscribtions.forEach(function (callback) {
        return callback({ focus: focus });
      });

      if (this.onChange) {
        this.onChange(tabId);
      }
    }
  }, {
    key: "selectPrevious",
    value: function selectPrevious(options) {
      var prevIndex = this.tabs.indexOf(this.selected) - 1;

      this.select(this.tabs[prevIndex >= 0 ? prevIndex : this.tabs.length - 1], options);
    }
  }, {
    key: "selectNext",
    value: function selectNext(options) {
      var nextIndex = (this.tabs.indexOf(this.selected) + 1) % this.tabs.length;

      this.select(this.tabs[nextIndex], options);
    }
  }, {
    key: "selectFirst",
    value: function selectFirst(options) {
      this.select(this.tabs[0], options);
    }
  }, {
    key: "selectLast",
    value: function selectLast(options) {
      this.select(this.tabs[this.tabs.length - 1], options);
    }
  }, {
    key: "isSelected",
    value: function isSelected(tabId) {
      return tabId === this.selected;
    }
  }, {
    key: "isVertical",
    value: function isVertical() {
      return this.vertical;
    }
  }, {
    key: "register",
    value: function register(tabId) {
      if (this.tabs.includes(tabId)) {
        return;
      }

      this.tabs.push(tabId);

      // set the first registered tab as select if no tab was assigned as default
      if (!this.selected) {
        this.select(tabId);
      }
    }
  }, {
    key: "unregister",
    value: function unregister(tabId) {
      this.tabs = this.tabs.filter(function (id) {
        return id !== tabId;
      });
    }
  }, {
    key: "subscribe",
    value: function subscribe(callback) {
      this.subscribtions.push(callback);
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe(callback) {
      this.subscribtions = this.subscribtions.filter(function (cb) {
        return cb !== callback;
      });
    }
  }]);

  return TabSelection;
}();

exports.default = TabSelection;