import React, {Component, PropTypes} from 'react';
import cn from 'classnames';
import CSSCore from 'fbjs/lib/CSSCore';
import {onCSSTransitionEnd} from './utils';
import Button from './Button';

export default class ToastrConfirm extends Component {
  static displayName = 'ToastrConfirm';

  static propTypes = {
    confirm: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    this.isHiding = false;

    if (this.props.confirm.show) {
      this._setTransition(true);
    }
  }

  handleConfirmClick = () => {
    const {options} = this.props.confirm;
    this._setTransition();
    if (options.onOk) {
      options.onOk();
    }
  };

  handleCancelClick = () => {
    const {options} = this.props.confirm;
    this._setTransition();
    if (options.onCancel) {
      options.onCancel();
    }
  };

  _setTransition = (add) => {
    const body = document.querySelector('body');

    if (add) {
      CSSCore.addClass(body, 'toastr-confirm-active');
      CSSCore.addClass(this.confirm, 'bounceInDown');
      this.isHiding = false;
    } else {
      CSSCore.addClass(this.confirm, 'bounceOutUp');
      this.isHiding = true;
    }

    onCSSTransitionEnd(this.confirm, this._onConfirmAnimationComplete);
  };

  _onConfirmAnimationComplete = () => {
    if (this.isHiding) {
      this._removeConfirm();
    }
  };

  _removeConfirm = () => {
    this.isHiding = false;
    const body = document.querySelector('body');
    CSSCore.removeClass(this.confirm, 'bounceOutUp');
    CSSCore.removeClass(this.confirm, 'bounceInDown');
    CSSCore.removeClass(body, 'toastr-confirm-active');
    this.props.hideConfirm();
  };

  render() {
    const {confirm, confirmOptions} = this.props;
    const classes = cn('confirm-holder', {active: confirm.show});
    return (
      <div className={classes}>
        <div className="confirm animated" ref={(ref) => this.confirm = ref}>
          <div className="message">{confirm.message}</div>
          <Button
            className="ok"
            onClick={e => this.handleConfirmClick(e)}>{confirmOptions.okText}</Button>
          <Button
            className="cancel"
            onClick={e => this.handleCancelClick(e)}>{confirmOptions.cancelText}</Button>
        </div>
        <div className="shadow animated" ref={(ref) => this.confirmShadow = ref}></div>
      </div>
    );
  }
}
