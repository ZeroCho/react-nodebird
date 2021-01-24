import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';
import ImagesZoom from './imagesZoom';
import { imageUrl } from '../config/config';

const PostImages = ({ id, images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);

  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);

  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);

  if (images.length === 1) {
    return (
      <div>
        <img
          src={imageUrl ? `${imageUrl}/${id}/${images[0].src}` : images[0].src}
          alt={images[0].src}
          style={{ width: '100%', display: 'inline-block' }}
          role="presentation"
          onClick={onZoom}
        />
        {showImagesZoom && <ImagesZoom id={id} images={images} onClose={onClose} />}
      </div>
    );
  } if (images.length === 2) {
    return (
      <div>
        <img
          src={imageUrl ? `${imageUrl}/${id}/${images[0].src}` : images[0].src}
          alt={images[0].src}
          style={{ width: '50%', display: 'inline-block' }}
          role="presentation"
          onClick={onZoom}
        />
        <img
          src={imageUrl ? `${imageUrl}/${id}/${images[1].src}` : images[1].src}
          alt={images[1].src}
          style={{ width: '50%', display: 'inline-block' }}
          role="presentation"
          onClick={onZoom}
        />
        {showImagesZoom && <ImagesZoom id={id} images={images} onClose={onClose} />}
      </div>
    );
  }
  return (
    <div style={{ position: 'relative' }}>
      <img
        src={imageUrl ? `${imageUrl}/${id}/${images[0].src}` : images[0].src}
        alt={images[0].src}
        style={{ width: '50%', display: 'inline-block' }}
        role="presentation"
        onClick={onZoom}
      />
      <img
        src={imageUrl ? `${imageUrl}/${id}/${images[1].src}` : images[1].src}
        alt={images[1].src}
        style={{ width: '50%', display: 'inline-block' }}
        role="presentation"
        onClick={onZoom}
      />
      <div
        role="presentation"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(0, 0, 0, 50%)',
          borderRadius: '.5em',
          padding: 10,
          textAlign: 'center',
          color: '#fff',
          lineHeight: '30px',
        }}
        onClick={onZoom}
      >
        <PlusOutlined />
        <br />
        {images.length - 2}
        {' '}
        개의 사진 더보기
      </div>
      {showImagesZoom && <ImagesZoom id={id} images={images} onClose={onClose} />}
    </div>
  );
};

PostImages.propTypes = {
  id: PropTypes.number.isRequired,
  images: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired,
  })).isRequired,
};

export default PostImages;
