import React from 'react';
import classNames from 'classnames/bind';
import styles from './progressBar.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const cx = classNames.bind(styles);

const ProgressBar = () => {
  const show = useSelector<RootState, boolean>(
    (state) => state.modal.showProgressBar
  );
  return (
    <div>
      {show ? (
        <div className={cx('loading-spinner__wrapper')}>
          <div className={cx('loading-spinner__overlay')}>
            <div className={cx('lds-dual-ring')}></div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProgressBar;
