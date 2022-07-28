import React, { useEffect } from 'react';
import styles from './music.module.scss';
import classNames from 'classnames/bind';

import { useDispatch, useSelector } from 'react-redux';
import { getLishSongs, getMusic } from '../redux/reducers/musicSlide';
import { RootState, AppDispatch } from '../redux/store';

import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../firebase';
import Tippy from '@tippyjs/react';

const cx = classNames.bind(styles);

interface music {
  id: number;
  name: string;
  url: string;
  singer: string;
  time: any;
  view: string;
  album: string;
  timeUpdate: string;
  play: boolean;
  image: string;
}

const Music = () => {
  const song = useSelector<RootState, any>((state) => state.music.song);
  const play = useSelector<RootState, boolean>((state) => state.music.play);
  /* eslint-disable */
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getLishSongs());
    let obj;
    const db = getFirestore(app);
    async function name() {
      const querySnapshot = await getDocs(collection(db, 'song'));
      obj = querySnapshot.docs[0].data();
      dispatch(getMusic(obj));
    }
    name();
  }, []);
  useEffect(() => {
    document.title = song.name + ' - ' + song.singer;
  }, [song]);
  const songList = useSelector<RootState, any[]>(
    (state) => state.music.musicList
  );

  const handleSongPlay = (item: music) => {
    dispatch(getMusic(item));
  };

  const covertTimeMusic = (time: number) => {
    const seconds: number = Math.floor(time % 60);
    const minutes: number = Math.floor((time - seconds) / 60);

    if (minutes < 10 && seconds < 10) {
      return `0${minutes}:0${seconds}`;
    } else if (minutes >= 10) {
      return `${minutes}:0${seconds}`;
    } else {
      return `0${minutes}:${seconds}`;
    }
  };

  return (
    <>
      <div className={cx('wrapper')}>
        <div className={cx('left')}>
          <div className={cx('media-img', play && 'circle')}>
            <img src={song.image} alt='NNCA' />
          </div>
          <div className={cx('media-content')}>
            <div>
              <h3>{song.name}</h3>
              <p>Cập nhật :{song.timeUpdate}</p>
              <p>{song.singer}</p>
              <p>{song.view} người yêu thích</p>
            </div>
            <div className={cx('group')}>
              <p className={cx('btn-play')}>
                <i className='bx bx-play'></i>
                Phát ngẫu nhiên
              </p>
              <div className={cx('favourite')}>
                <i className='bx bx-heart'></i>
                <i className='bx bx-dots-horizontal-rounded'></i>
              </div>
            </div>
          </div>
        </div>
        <div className={cx('right')}>
          <p className={cx('description')}>
            Đang phát : <span>{song.name}</span>
          </p>

          <div className={cx('list-media', 'title')}>
            <div className={cx('list-left')}>
              <i className='bx bx-sort'></i>
              BÀI HÁT
            </div>
            <div className={cx('list-center')}>ALBUM</div>
            <div className={cx('list-right')}>THỜI GIAN</div>
          </div>
          {songList.map((item) => (
            <div
              onClick={() => handleSongPlay(item)}
              className={cx('list-media', song.id === item.id && 'active')}
              key={item.id}
            >
              <div className={cx('list-left')}>
                <i className='bx bx-music'></i>
                <div className={cx('img')}>
                  <img src={item.image} alt='error' />
                  {play ? (
                    <div className={cx('icon')}>
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                  ) : null}
                </div>
                <div className={cx('music-content')}>
                  <span>{item.name}</span>
                  <span>{item.singer}</span>
                </div>
              </div>
              <div className={cx('list-center')}>
                {item.album}
                <Tippy
                  content={<span className={cx('tooltip')}>tải xuống</span>}
                >
                  <i className='bx bx-download'></i>
                </Tippy>
              </div>
              <div className={cx('list-right')}>
                {covertTimeMusic(item.time)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Music;
function fileDownload(data: any, filename: string) {
  throw new Error('Function not implemented.');
}
