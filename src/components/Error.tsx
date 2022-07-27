import React from 'react';
import classNames from 'classnames/bind';
import styles from './error.module.scss';

const cx = classNames.bind(styles);

const Error = () => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        <h3>Thông báo</h3>
      </div>
      <div className={cx('body')}>Vui lòng điền đầy đủ thông tin...</div>
    </div>
  );
};

export default Error;
