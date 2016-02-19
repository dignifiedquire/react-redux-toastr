import React, {Component, PropTypes} from 'react';
import {connect}            from 'react-redux';
import classnames           from 'classnames';

import ToastrBox            from './ToastrBox';
import ToastrConfirm        from './ToastrConfirm';
import * as actions        from './actions';
import {EE}                 from './toastrEmitter';
import config               from './config';

@connect(state => ({
  toastr: state.toastr
}), actions)
export default class ReduxToastr extends Component {
  static displayName = 'ReduxToastr';

  static propTypes = {
    toastr: PropTypes.object,
    options: PropTypes.object,
    position: PropTypes.string,
    newestOnTop: PropTypes.bool,
    timeOut: PropTypes.number,
    confirm: PropTypes.object
  };

  static defaultProps = {
    position: 'top-right',
    newestOnTop: true,
    timeOut: 5000,
    confirmOptions: {
      okText: 'ok',
      cancelText: 'cancel'
    }
  };

  constructor(props) {
    super(props);
    config.timeOut = this.props.timeOut;
    config.newestOnTop = this.props.newestOnTop;
  }

  componentDidMount() {
    const {clean, showConfirm, addToastrAction} = this.props;

    const confirm = (obj) => {
       this.props.showConfirm(obj.message, obj.options);
    };

    EE.on('toastr/confirm', confirm);
    EE.on('add/toastr', addToastrAction);
    EE.on('clean/toastr', clean);
  }

  componentWillUnmount() {
    EE.removeListener('toastr/confirm');
    EE.removeListener('add/toastr');
    EE.removeListener('clean/toastr');
  }

  handleRemoveToastr = (id) => {
    this.props.remove(id);
  };

  render() {
    const {toastr, confirm, remove, position} = this.props;
    const classes = classnames('redux-toastr', position);
    return (
      <div className={classes}>
        <ToastrConfirm confirm={toastr.confirm} {...this.props}/>
        {toastr.toastrs.map(item => <ToastrBox key={item.id} item={item} remove={remove}/>)}
      </div>
    );
  }
}
