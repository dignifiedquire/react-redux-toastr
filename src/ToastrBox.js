import CSSCore from 'fbjs/lib/CSSCore';
import React, {Component, PropTypes, dangerouslySetInnerHTML} from 'react'; //  eslint-disable-line no-unused-vars
import classnames from 'classnames';

import {onCSSTransitionEnd} from './utils';
import config from './config';

export default class ToastrBox extends Component {
  static displayName = 'ToastrBox';

  static propTypes = {
    item: PropTypes.object.isRequired,
    remove: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.isHiding = false;
    this.intervalId = null;
    this.transitionIn = 'bounceIn';
    this.transitionOut = 'bounceOut';
  }

  componentDidMount() {
    const {item} = this.props;
    const timeOut = config.get('timeOut');
    const time = item.options.timeOut || timeOut;

    this._setIntervalId(setTimeout(this._removeToastr, time));
    this._setTransition();
    onCSSTransitionEnd(this.toastrBox, this._onAnimationComplite);
  }

  componentWillUnmount() {
    if (this.intervalId) {
      clearTimeout(this.intervalId);
    }
  }

  handleRemoveItem = () => {
    this._removeToastr();
  };

  mouseEnter = () => {
    if (this.intervalId) {
      clearTimeout(this.intervalId);
      this._setIntervalId(null);
      if (this.isHiding) {
        this._setIsHiding(false);
      }
    }
  };

  mouseLeave = () => {
    if (!this.isHiding) {
      this._setIntervalId(setTimeout(this._removeToastr, 1000));
    }
  };

  _onAnimationComplite = () => {
    const {remove, item} = this.props;
    const {options} = item;

    if (this.isHiding) {
      this._setIsHiding(false);
      remove(item.id);
      if (options.onHideComplete) {
        options.onHideComplete();
      }
    } else if (!this.isHiding) {
      if (options.onShowComplete) {
        options.onShowComplete();
      }
    }
  };

  _removeToastr = () => {
    if (!this.isHiding) {
      this._setIsHiding(true);
      this._setTransition(true);
      onCSSTransitionEnd(this.toastrBox, this._onAnimationComplite);
    }
  };

  _setTransition = (hide) => {
    const node = this.toastrBox;
    const animationType = hide ? this.transitionOut : this.transitionIn;

    const onEndListener = (e) => {
      if (e && e.target == node) {
        CSSCore.removeClass(node, animationType);
      }
    };

    onCSSTransitionEnd(this.toastrBox, onEndListener);
    CSSCore.addClass(node, animationType);
  };

  _clearTransition = () => {
    const node = this.toastrBox;
    CSSCore.removeClass(node, this.transitionIn);
    CSSCore.removeClass(node, this.transitionOut);
  };

  _setIntervalId = (intervalId) => {
    this.intervalId = intervalId;
  };

  _setIsHiding = (val) => {
    this.isHiding = val;
  };

  render() {
    const {item} = this.props;
    const classes = classnames('toastr', 'animated', item.type);
    const icons = classnames('icon-holder', item.options.icon);
    return (
      <div
        className={classes}
        onMouseEnter={() => this.mouseEnter()}
        onMouseLeave={() => this.mouseLeave()}
        onClick={() => this.handleRemoveItem()}
        ref={(ref) => this.toastrBox = ref}>

        <div className={icons}></div>
        <div className="message-holder">
          {item.title && <div className="title">{item.title}</div>}
          <div className="message">{item.message}</div>
        </div>
      </div>
    );
  }
}
