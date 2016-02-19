'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ToastrBox = require('./ToastrBox');

var _ToastrBox2 = _interopRequireDefault(_ToastrBox);

var _ToastrConfirm = require('./ToastrConfirm');

var _ToastrConfirm2 = _interopRequireDefault(_ToastrConfirm);

var _actions = require('./actions');

var actions = _interopRequireWildcard(_actions);

var _toastrEmitter = require('./toastrEmitter');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReduxToastr = (_dec = (0, _reactRedux.connect)(function (state) {
  return {
    toastr: state.toastr
  };
}, actions), _dec(_class = function (_Component) {
  _inherits(ReduxToastr, _Component);

  function ReduxToastr(props) {
    _classCallCheck(this, ReduxToastr);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ReduxToastr).call(this, props));

    _this.handleRemoveToastr = function (id) {
      _this.props.remove(id);
    };

    _config2.default.timeOut = _this.props.timeOut;
    _config2.default.newestOnTop = _this.props.newestOnTop;
    return _this;
  }

  _createClass(ReduxToastr, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props;
      var clean = _props.clean;
      var showConfirm = _props.showConfirm;
      var addToastrAction = _props.addToastrAction;

      _toastrEmitter.EE.on('toastr/confirm', showConfirm);
      _toastrEmitter.EE.on('add/toastr', addToastrAction);
      _toastrEmitter.EE.on('clean/toastr', clean);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _toastrEmitter.EE.removeListener('toastr/confirm');
      _toastrEmitter.EE.removeListener('add/toastr');
      _toastrEmitter.EE.removeListener('clean/toastr');
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var toastr = _props2.toastr;
      var confirm = _props2.confirm;
      var remove = _props2.remove;
      var position = _props2.position;

      var classes = (0, _classnames2.default)('redux-toastr', position);
      return _react2.default.createElement(
        'div',
        { className: classes },
        _react2.default.createElement(_ToastrConfirm2.default, _extends({ confirm: toastr.confirm }, this.props)),
        toastr.toastrs.map(function (item) {
          return _react2.default.createElement(_ToastrBox2.default, { key: item.id, item: item, remove: remove });
        })
      );
    }
  }]);

  return ReduxToastr;
}(_react.Component)) || _class);
ReduxToastr.displayName = 'ReduxToastr';
ReduxToastr.propTypes = {
  toastr: _react.PropTypes.object,
  options: _react.PropTypes.object,
  position: _react.PropTypes.string,
  newestOnTop: _react.PropTypes.bool,
  timeOut: _react.PropTypes.number,
  confirm: _react.PropTypes.object
};
ReduxToastr.defaultProps = {
  position: 'top-right',
  newestOnTop: true,
  timeOut: 5000,
  confirmOptions: {
    okText: 'ok',
    cancelText: 'cancel'
  }
};
exports.default = ReduxToastr;