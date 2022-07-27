import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './modal.module.scss';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { app } from '../firebase';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import {
  onClose,
  onCloseProgressBar,
  onShowProgressBar,
} from '../redux/reducers/modalSlide';
import { collection, addDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { getLishSongs } from '../redux/reducers/musicSlide';

const db = getFirestore(app);
const storage = getStorage(app, 'gs://zing-mp3-cca65.appspot.com');
const cx = classNames.bind(styles);

const Modal = () => {
  const showModal = useSelector<RootState, boolean>(
    (state) => state.modal.showModal
  );
  const dispatch = useDispatch<AppDispatch>();
  const [nameOfTheSong, setNamOfTheSong] = useState<string>('');
  const [album, setAlbum] = useState<string>('');
  const [singer, setSinger] = useState<string>('');
  const [audio, setAudio] = useState<File>();
  const [image, setImage] = useState<File | null>();
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleFileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleFileAudio = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAudio(e.target.files[0]);
    }
  };
  useEffect(() => {
    if (imgRef.current && image) {
      imgRef.current.src = URL.createObjectURL(image);
    }
  }, [image]);

  const onCreateSong = async () => {
    if (
      image &&
      audio &&
      nameOfTheSong.trim() !== '' &&
      album.trim() !== '' &&
      singer.trim() !== ''
    ) {
      dispatch(onShowProgressBar());
      const imageRef = ref(storage, `images/${image?.name}`);
      const audioRef = ref(storage, `audio/${audio?.name}`);
      let imgUrl = '';
      let audioUrl = '';
      await uploadBytes(imageRef, image);
      await uploadBytes(audioRef, audio);
      await getDownloadURL(imageRef).then((url) => {
        imgUrl = url;
      });
      await getDownloadURL(audioRef).then((url) => {
        audioUrl = url;
      });

      let objAudio = new Audio(audioUrl);
      const date = new Date();

      objAudio.onloadedmetadata = async (e) => {
        if (objAudio.readyState > 0) {
          const id = uuidv4();
          const song = {
            id: id,
            name: nameOfTheSong,
            singer,
            album,
            time: Math.floor(objAudio.duration),
            image: imgUrl,
            url: audioUrl,
            view: '250 triệu',
            play: false,
            timeUpdate: `${date.getDate()}/${
              date.getMonth() + 1
            }/${date.getFullYear()}`,
          };
          try {
            await addDoc(collection(db, 'song'), song);
            dispatch(getLishSongs());
            dispatch(onClose());
            setNamOfTheSong('');
            setAlbum('');
            setSinger('');
            dispatch(onCloseProgressBar());
          } catch (e) {
            console.error('Error adding document: ', e);
          }
        }
      };
    } else {
      window.confirm('Vui lòng nhập đầy đủ thông tin...');
    }
  };

  return (
    <div>
      {showModal ? (
        <div className={cx('wrapper')}>
          <div
            className={cx('overlay')}
            onClick={() => dispatch(onClose())}
          ></div>
          <div className={cx('container')}>
            <div className={cx('title')}>
              <span>Tạo bài hát mới</span>
              <i className='bx bx-x' onClick={() => dispatch(onClose())}></i>
            </div>
            <div className={cx('form')}>
              <div className={cx('group1')}>
                <div className={cx('input-group')}>
                  <label htmlFor='nameOftheSong'>Tên bài hát</label>
                  <input
                    type='text'
                    name='nameOfSong'
                    id='nameOftheSong'
                    value={nameOfTheSong}
                    onChange={(e) => setNamOfTheSong(e.target.value)}
                    placeholder='vd : Nơi này có anh'
                  />
                </div>
                <div className={cx('input-group')}>
                  <label htmlFor='audio'>Chọn bài hát</label>
                  <input
                    type='file'
                    name='audio'
                    id='audio'
                    accept='audio/mp3'
                    onChange={handleFileAudio}
                  />
                </div>
              </div>
              <div className={cx('input-group')}>
                <label htmlFor='album'>album</label>
                <input
                  type='text'
                  name='album'
                  id='album'
                  value={album}
                  onChange={(e) => setAlbum(e.target.value)}
                  placeholder='vd : MTP'
                />
              </div>
              <div className={cx('input-group')}>
                <label htmlFor='singer'>Ca sỹ</label>
                <input
                  type='text'
                  name='singer'
                  id='singer'
                  value={singer}
                  onChange={(e) => setSinger(e.target.value)}
                  placeholder='vd : Sơn Tùng MTP'
                />
              </div>

              <div className={cx('group2')}>
                <div className={cx('input-group')}>
                  <label htmlFor='image'>chọn avatar</label>
                  <input
                    type='file'
                    name='image'
                    accept='image/png, image/gif, image/jpeg'
                    id='image'
                    onChange={handleFileImage}
                  />
                </div>
                <img src='' alt='' ref={imgRef} />
              </div>

              <div className={cx('submit')}>
                <p onClick={onCreateSong}>Tải lên</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Modal;
