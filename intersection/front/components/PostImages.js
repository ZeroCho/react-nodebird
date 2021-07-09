import React, { useCallback, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';

import ImagesZoom from './ImagesZoom';

function isImageValid(src) {
  return new Promise((resolve) => {
    const img = document.createElement('img');
    img.onerror = () => resolve(false);
    img.onload = () => resolve(true);
    img.src = src;
  });
}
const PostImages = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);
  const imgEl = useRef();

  useEffect(
    () => {
      isImageValid(images[0].src).then((isValid) => {
        if (!isValid) {
          imgEl.current.remove();
        }
      });
    },
    [images[0].src],
  );

  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);
  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);

  const onError = useCallback((e) => {
    console.dir(e.target);
    e.target.previousSibling.remove();
    // e.target.src = e.target.currentSrc.replace('/thumb/', '/original/');
  }, []);

  if (images.length === 1) {
    return (
      <>
        <picture>
          <source ref={imgEl} srcSet={`${images[0].src}`} />
          <img role="presentation" onClick={onZoom} src={`${images[0].src.replace('/thumb/', '/original/')}`} alt={images[0].src} style={{ maxWidth: '100%', display: 'inline-block' }} />
        </picture>
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  if (images.length === 2) {
    return (
      <>
        <picture style={{ width: '50%', display: 'inline-block' }}>
          <source ref={imgEl} srcSet={`${images[0].src}`} />
          <img role="presentation" onClick={onZoom} src={`${images[0].src.replace('/thumb/', '/original/')}`} alt={images[0].src} style={{ maxWidth: '100%', display: 'inline-block' }} />
        </picture>
        <picture style={{ width: '50%', display: 'inline-block' }}>
          <source ref={imgEl} srcSet={`${images[1].src}`} />
          <img role="presentation" onClick={onZoom} src={`${images[1].src.replace('/thumb/', '/original/')}`} alt={images[0].src} style={{ maxWidth: '100%', display: 'inline-block' }} />
        </picture>
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  return (
    <>
      <div>
        <picture style={{ width: '50%' }} onError={onError}>
          <source ref={imgEl} srcSet={`${images[0].src}`} />
          <img role="presentation" onClick={onZoom} src={`${images[0].src.replace('/thumb/', '/original/')}`} alt={images[0].src} style={{ maxWidth: '50%' }} />
        </picture>
        <div
          role="presentation"
          style={{ display: 'inline-block', width: '50%', textAlign: 'center', verticalAlign: 'middle' }}
          onClick={onZoom}
        >
          <PlusOutlined />
          <br />
          {images.length - 1}
          개의 사진 더보기
        </div>
      </div>
      {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
    </>
  );
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PostImages;
