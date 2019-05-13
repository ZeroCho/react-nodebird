import PropTypes from 'prop-types';
import { Icon } from 'antd';
import React, { useCallback, useState } from 'react';
import ImagesZoom from './ImagesZoom';

const PostImages = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);
  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);
  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);

  if (images.length === 1) {
    return (
      <>
        <img onClick={onZoom} alt="example" src={`http://localhost:3065/${images[0].src}`} />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  if (images.length === 2) {
    return (
      <>
        <div>
          <img onClick={onZoom} alt="example" src={`http://localhost:3065/${images[0].src}`} width="50%" />
          <img onClick={onZoom} alt="example" src={`http://localhost:3065/${images[1].src}`} width="50%" />
        </div>
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  return (
    <>
      <div>
        <img onClick={onZoom} alt="example" src={`http://localhost:3065/${images[0].src}`} width="50%" />
        <div onClick={onZoom}
             style={{ display: 'inline-block', width: '50%', textAlign: 'center', verticalAlign: 'middle' }}>
          <Icon type="plus" />
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
