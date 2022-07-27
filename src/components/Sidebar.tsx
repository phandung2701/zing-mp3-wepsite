import React, { useState } from 'react';
import styles from './sidebar.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface categoryItem {
  id: number;
  title: string;
  icon: string;
  color?: string;
}

const category: categoryItem[] = [
  {
    id: 1,
    title: 'Cá nhân',
    icon: 'bx bx-user',
  },
  {
    id: 2,
    title: 'Khám phá',
    icon: 'bx bx-color',
  },
  {
    id: 3,
    title: '#zingchart',
    icon: 'bx bx-line-chart',
  },
  {
    id: 4,
    title: 'Radio',
    icon: 'bx bx-podcast',
  },

  {
    id: 5,
    title: 'Theo dõi',
    icon: 'bx bxs-book-content',
  },
];
const category2: categoryItem[] = [
  {
    id: 6,
    title: 'Nhạc mới',
    icon: 'bx bx-music',
  },
  {
    id: 7,
    title: 'Thể loại',
    icon: 'bx bx-category',
  },
  {
    id: 8,
    title: 'Top 100',
    icon: 'bx bx-star',
  },
  {
    id: 9,
    title: 'MV',
    icon: 'bx bxl-gmail',
  },
];
const library: categoryItem[] = [
  {
    id: 10,
    title: 'Bài hát',
    icon: 'bx bxl-medium-square',
    color: '#0591ff',
  },
  {
    id: 11,
    title: 'playlist',
    icon: 'bx bxs-playlist',
    color: '#8bc54c',
  },
  {
    id: 12,
    title: 'Gần đây',
    icon: 'bx bxs-time-five',
    color: '#fcc564',
  },
];
const Sidebar = () => {
  const [showSideBar, setShowSideBar] = useState<boolean>(false);
  return (
    <div className={cx('wrapper', showSideBar && 'active')}>
      <div className={cx('logo')}>
        <img
          src='	https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/backgrounds/logo-dark.svg'
          alt='Zing'
        />
        <img
          src='	https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.7.9/static/media/icon_zing_mp3_60.f6b51045.svg'
          alt='logo'
        />
      </div>
      <div className={cx('category')}>
        {category.map((item) => (
          <div className={cx('category-item')} key={item.id}>
            <i className={item.icon}></i>
            <span>{item.title}</span>
          </div>
        ))}
      </div>
      <div className={cx('border-sb')}></div>
      <div className={cx('scrollbar')}>
        {category2.map((item) => (
          <div className={cx('category-item')} key={item.id}>
            <i className={item.icon}></i>
            <span>{item.title}</span>
          </div>
        ))}
        <div className={cx('banner-sb')}>
          <div className={cx('text')}>
            Nghe nhạc không quảng cáo cùng kho nhạc VIP
          </div>
          <p>NÂNG CẤP VIP</p>
        </div>
        <div className={cx('library')}>
          <p>Thư viện</p>
          {library.map((item) => (
            <div className={cx('category-item')} key={item.id}>
              <i
                className={item.icon}
                style={{ background: `${item.color}` }}
              ></i>
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={cx('create-playlist')}>
        <i className='bx bx-plus'></i>
        <span>Tạo playlist mới</span>
      </div>
      <div className={cx('show-playlist')}>
        <i
          className='bx bx-chevron-right'
          onClick={() => setShowSideBar(true)}
        ></i>
        <i
          className='bx bx-chevron-left'
          onClick={() => setShowSideBar(false)}
        ></i>
      </div>
    </div>
  );
};

export default Sidebar;
