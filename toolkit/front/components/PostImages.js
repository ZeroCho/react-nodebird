import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';
import Image from 'next/image';

import ImagesZoom from './ImagesZoom';
import { backUrl } from '../config/config';

const PostImages = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);

  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);
  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);

  if (images.length === 1) {
    return (
      <div style={{ height: 300 }}>
        <Image role="presentation" src={`${images[0].src}`} alt={images[0].src} layout="fill" onClick={onZoom} />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </div>
    );
  }
  if (images.length === 2) {
    return (
      <div>
        <div style={{ width: 150, height: 150, display: 'inline-block' }}>
          <Image role="presentation" width={150} height={150} src={`${images[0].src}`} alt={images[0].src} onClick={onZoom} />
        </div>
        <div style={{ width: 150, height: 150, display: 'inline-block' }}>
          <Image role="presentation" width={150} height={150} src={`${images[1].src}`} alt={images[1].src} onClick={onZoom} />
        </div>
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </div>
    );
  }
  return (
    <>
      <div>
        <Image role="presentation" style={{ width: '50%' }} src={`${images[0].src}`} layout="fill" alt={images[0].src} onClick={onZoom} />
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
  images: PropTypes.arrayOf(PropTypes.object),
};
PostImages.defaultProps = {
  images: [],
};

export default PostImages;
