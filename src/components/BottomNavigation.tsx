import React, { useEffect, useRef, useState } from 'react';
import Styles from './bottomNavigation.module.scss';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';

import { getMusic, onPlay } from '../redux/reducers/musicSlide';

const cx = classNames.bind(Styles);

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

const BottomNavigation = () => {
  /* eslint-disable */
  const [volumeMusic, setVolumeMusic] = useState(100);
  const [musicTime, setMusicTime] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);
  const [duration, setDuration] = useState(1);
  const song = useSelector<RootState, music>((state) => state.music.song);
  const songList = useSelector<RootState, music[]>(
    (state) => state.music.musicList
  );
  const play = useSelector<RootState, boolean>((state) => state.music.play);
  const dispatch = useDispatch<AppDispatch>();
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
  // set volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = Number(volumeMusic / 100);
    }
  }, [volumeMusic]);

  // play music
  useEffect(() => {
    setDuration(song.time);
  }, []);

  useEffect(() => {
    const setTime = setInterval(() => {
      if (audioRef.current) {
        setMusicTime(Number(audioRef.current.currentTime));
      }
    }, 1000);

    return () => {
      clearInterval(setTime);
    };
  }, []);
  /* eslint-disable */
  useEffect(() => {
    if (audioRef.current) {
      if (musicTime > duration) {
        audioRef.current.currentTime = 0;
        dispatch(onPlay(false));
        setMusicTime(0);
        let index = 0;
        songList.forEach((item, i) => {
          if (item.id === song.id) {
            index = i;
          }
        });

        if (index > -1 && index === songList.length - 1) {
          const music = { ...songList[0], play: false };

          dispatch(getMusic(music));
        } else {
          const music = { ...songList[index + 1], play: true };

          dispatch(getMusic(music));
          dispatch(onPlay(true));
        }
      }
    }
  }, [musicTime]);

  useEffect(() => {
    setDuration(song.time);
    if (play && audioRef.current) {
      audioRef.current.play();
    }
  }, [song]);
  const handlePlayAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
    dispatch(onPlay(true));
  };

  const handlePauseAudio = () => {
    audioRef.current?.pause();
    dispatch(onPlay(false));
  };

  const handleVolumeMusic = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolumeMusic(Number(e.target.value));
  };
  const handleTimeMusic = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(e.target.value);
    }
    setMusicTime(Number(e.target.value));
  };
  const handleOpenVolume = () => {
    volumeMusic > 0 ? setVolumeMusic(0) : setVolumeMusic(100);
  };
  const handlePrevSong = () => {
    let index = 0;
    songList.forEach((item, i) => {
      if (item.id === song.id) {
        index = i;
      }
    });
    if (index === 0) {
      const music = { ...songList[songList.length - 1], play: true };

      dispatch(getMusic(music));
      dispatch(onPlay(true));
    } else {
      const music = { ...songList[index - 1], play: true };
      dispatch(onPlay(true));

      dispatch(getMusic(music));
    }
  };
  const handleNextSong = () => {
    let index = 0;
    songList.forEach((item, i) => {
      if (item.id === song.id) {
        index = i;
      }
    });
    if (index === songList.length - 1) {
      const music = { ...songList[0], play: true };

      dispatch(getMusic(music));
      dispatch(onPlay(true));
    } else {
      const music = { ...songList[index + 1], play: true };

      dispatch(getMusic(music));
      dispatch(onPlay(true));
    }
  };
  return (
    <div className={cx('wrapper')}>
      <audio src={song.url} ref={audioRef} autoPlay={song.play} />
      <div className={cx('music')}>
        <div className={cx('image')}>
          <img src={song.image} alt='sss' />
        </div>
        <div className={cx('music-name')}>
          <p>{song.name}</p>
          <p>{song.singer}</p>
        </div>
        <div className={cx('favourite')}>
          <i className='bx bx-heart'></i>
          <i className='bx bx-dots-horizontal-rounded'></i>
        </div>
      </div>
      <div className={cx('play')}>
        <div className={cx('play-feature')}>
          <i className='bx bxl-tailwind-css'></i>
          <i className='bx bx-skip-previous' onClick={handlePrevSong}></i>
          {play ? (
            <i className='bx bx-equalizer' onClick={handlePauseAudio}></i>
          ) : (
            <i className='bx bx-play-circle' onClick={handlePlayAudio}></i>
          )}

          <i className='bx bx-skip-next' onClick={handleNextSong}></i>
          <i className='bx bx-transfer-alt'></i>
        </div>
        <div className={cx('play-time')}>
          <span>{covertTimeMusic(musicTime)}</span>
          <input
            type='range'
            value={musicTime}
            max={duration}
            min={0}
            step={1}
            onChange={handleTimeMusic}
          />
          <span>{covertTimeMusic(duration)}</span>
        </div>
      </div>
      <div className={cx('option')}>
        <i className='bx bx-video'></i>
        <i className='bx bx-microphone'></i>
        <i className='bx bx-package'></i>
        <div className={cx('volume')}>
          {volumeMusic > 0 ? (
            <i className='bx bx-volume-full' onClick={handleOpenVolume}></i>
          ) : (
            <i className='bx bx-volume-mute' onClick={handleOpenVolume}></i>
          )}

          <input
            type='range'
            max={100}
            min={0}
            step={1}
            value={volumeMusic}
            onChange={handleVolumeMusic}
          />
        </div>
        <div className={cx('vertical-tiles')}></div>
        <i className='bx bxl-tiktok'></i>
      </div>
    </div>
  );
};

export default BottomNavigation;
