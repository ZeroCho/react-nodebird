import React, { useCallback, useEffect, useRef, useState, VFC } from 'react';
import { PlusOutlined } from '@ant-design/icons';

import ImagesZoom from './ImagesZoom';

function isImageValid(src: string) {
  return new Promise((resolve) => {
    const img = document.createElement('img');
    img.onerror = () => resolve(false);
    img.onload = () => resolve(true);
    img.src = src;
  });
}

interface Props {
  images: Array<{ src: string }>;
}
const PostImages: VFC<Props> = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);
  const imgEl = useRef<HTMLSourceElement>(null);

  const firstImageSrc = images[0].src;
  useEffect(() => {
    isImageValid(firstImageSrc).then((isValid) => {
      if (!isValid) {
        imgEl.current?.remove();
      }
    });
  }, [firstImageSrc]);

  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);
  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);
  const onError = useCallback((e) => {
    console.dir(e.target);
    e.target.previousSibling.remove();
  }, []);

  if (images.length === 1) {
    return (
      <>
        <picture>
          <source ref={imgEl} srcSet={`${images[0].src}`} />
          <img
            role="presentation"
            onClick={onZoom}
            src={`${images[0].src.replace('/thumb/', '/original/')}`}
            alt={images[0].src}
            style={{ maxWidth: '100%', display: 'inline-block' }}
          />
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
          <img
            role="presentation"
            onClick={onZoom}
            src={`${images[0].src.replace('/thumb/', '/original/')}`}
            alt={images[0].src}
            style={{ maxWidth: '100%', display: 'inline-block' }}
          />
        </picture>
        <picture style={{ width: '50%', display: 'inline-block' }}>
          <source ref={imgEl} srcSet={`${images[1].src}`} />
          <img
            role="presentation"
            onClick={onZoom}
            src={`${images[1].src.replace('/thumb/', '/original/')}`}
            alt={images[0].src}
            style={{ maxWidth: '100%', display: 'inline-block' }}
          />
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
          <img
            role="presentation"
            onClick={onZoom}
            src={`${images[0].src.replace('/thumb/', '/original/')}`}
            alt={images[0].src}
            style={{ maxWidth: '50%' }}
          />
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

export default PostImages;
