import React, { useState} from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import Slick from 'react-slick';

const ImagesZoom = ({ images, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div style={{ position: 'fixed', zIndex: 5000, top: 0, left: 0, right: 0, bottom: 0 }}>
      <header style={{ height: 44, background: 'white', position: 'relative', padding: 0, textAlign: 'center'}}>
        <h1 style={{ margin: 0, fontSize: '17px', color: '#333', lineHeight: '44px' }}>상세 이미지</h1>
        <Icon type="close" onClick={onClose} style={{ position: 'absolute', right: 0, top: 0, padding: 15, lineHeight: '14px', cursor: 'pointer' }} />
      </header>
      <div style={{ height: 'calc(100% - 44px)', background: '#090909' }}>
        <div>
          <Slick
            initialSlide={0}
            afterChange={slide => setCurrentSlide(slide)}
            infinite={false}
            arrows
            slidesToShow={1}
            slidesToScroll={1}
          >
            {images.map((v) => {
              return (
                <div style={{ padding: 32, textAlign: 'center' }}>
                  <img src={`http://localhost:3065/${v.src}`} style={{ margin: '0 auto', maxHeight: 750 }} />
                </div>
              );
            })}
          </Slick>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: 75, height: 30, lineHeight: '30px', borderRadius: 15, background: '#313131', display: 'inline-block', textAlign: 'center', color: 'white', fontSize: '15px' }}>
              {currentSlide + 1} / {images.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ImagesZoom.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string,
  })).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImagesZoom;
