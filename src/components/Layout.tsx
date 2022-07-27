import React from 'react';
import styles from './layout.module.scss';
import classNames from 'classnames/bind';
import Sidebar from './Sidebar';
import Header from './Header';
import BottomNavigation from './BottomNavigation';

import Music from '../pages/Music';
import ProgressBar from './ProgressBar';
import Modal from './Modal';
const cx = classNames.bind(styles);

const Layout = () => {
  return (
    <div className={cx('wrapper')}>
      <ProgressBar />
      <Modal />
      <Sidebar />
      <div className={cx('container')}>
        <Header />
        <div className={cx('content')}>
          <Music />
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default Layout;
