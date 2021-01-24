import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slick from 'react-slick';
import { CloseBtn, Global, Header, ImgWrapper, Indicator, Overlay, SlickWrapper } from './styles';
import { imageUrl } from '../../config/config';

const ImagesZoom = ({ id, images, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  return (
    <Overlay>
      <Global />
      <Header>
        <h1>상세 이미지</h1>
        <CloseBtn onClick={onClose}>X</CloseBtn>
      </Header>
      <SlickWrapper>
        <div>
          <Slick
            initialSlide={0}
            afterChange={(slide) => setCurrentSlide(slide)}
            infinite
            arrows={false}
            slideToShow={1}
            slideToScroll={1}
          >
            {images.map((v) => (
              <ImgWrapper key={v.src}>
                <img
                  src={imageUrl ? `${imageUrl}/${id}/${v.src}` : v.src.replace(/\/thumb\//, '/original/')}
                  alt={v.src}
                />
              </ImgWrapper>
            ))}
          </Slick>
          <Indicator>
            <div>
              {currentSlide + 1}&nbsp;/&nbsp;
              {images.length}
            </div>
          </Indicator>
        </div>
      </SlickWrapper>
    </Overlay>
  );
};
ImagesZoom.propTypes = {
  id: PropTypes.number.isRequired,
  images: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired,
  })).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImagesZoom;
