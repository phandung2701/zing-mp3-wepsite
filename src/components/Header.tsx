import React from 'react';
import styles from './header.module.scss';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { onClose, onShow } from '../redux/reducers/modalSlide';
import Tippy from '@tippyjs/react';

const cx = classNames.bind(styles);

const Header = () => {
  const dispatch = useDispatch();
  const showModal = useSelector<RootState, boolean>(
    (state) => state.modal.showModal
  );
  const handleShowModal = () => {
    if (showModal) {
      dispatch(onClose());
    } else {
      dispatch(onShow());
    }
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('header-left')}>
        <i className='bx bx-left-arrow-alt'></i>
        <i className='bx bx-right-arrow-alt'></i>
        <div className={cx('form-search')}>
          <i className='bx bx-search'></i>
          <input
            type='text'
            name='search'
            placeholder='Tìm kiếm bài hát, nghệ sỹ, lời bài hát...'
          />
        </div>
      </div>
      <div className={cx('header-right')}>
        <i className='bx bxs-t-shirt'></i>
        <i className='bx bx-diamond'></i>
        <Tippy content={<span className={cx('tooltip')}>tải lên</span>}>
          <i className='bx bx-upload' onClick={handleShowModal}></i>
        </Tippy>
        <i className='bx bx-reset'></i>
        <div className={cx('avatar')}>TD</div>
      </div>
    </div>
  );
};

export default Header;
