import React, { useState } from 'react';
import styled from 'styled-components';
import Slick from 'react-slick';
import PropTypes from 'prop-types';
import { Icon } from 'antd';

const Overlay = styled.div`
  position: fixed;
  z-index: 5000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Header = styled.header`
  height: 44px;
  background: white;
  position: relative;
  padding: 0;
  text-align: center;
  & h1 {
    margin: 0;
    font-size: 17px;
    color: #333;
    line-height: 44px;
  }
`;

const Wrapper = styled.div`
  height: calc(100% - 44px);
  background: #090909;
`;

const ImgWrapper = styled.div`
  padding: 32px;
  text-align: center;
  
  & img {
    margin: 0 auto;
    max-height: 750px;
  }
`;

const Indicator = styled.div`
  width: 75px;
  height: 30px;
  line-height: 30px;
  border-radius: 15px;
  background: #313131;
  display: inline-block;
  text-align: center;
  color: white;
  font-size: 15px;
`;

const CloseBtn = styled(Icon)`
  position: absolute;
  right: 0;
  top: 0;
  padding: 15px;
  line-height: 14px;
  cursor: pointer;
  & img {
    width: 14px;
    height: 14px;
  }
`;

const SlickWrapper = styled.div``;

const ImagesZoom = ({ images, current, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(current);

  return (
    <Overlay>
      <Header>
        <h1>상세 이미지</h1>
        <CloseBtn type="close" onClick={onClose} />
      </Header>
      <Wrapper>
        <SlickWrapper>
          <Slick
            initialSlide={currentSlide}
            afterChange={(slide) => {
              setCurrentSlide(slide);
            }}
            infinite={false}
            arrows
            slidesToShow={1}
            slidesToScroll={1}
          >
            {images.map(v => (
              <ImgWrapper key={v.src}>
                <img src={`http://localhost:3065/${v.src}`} />
              </ImgWrapper>
            ))}
          </Slick>
          <div style={{ textAlign: 'center' }}>
            <Indicator>{currentSlide + 1} / {images.length}</Indicator>
          </div>
        </SlickWrapper>
      </Wrapper>
    </Overlay>
  );
};

ImagesZoom.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  current: PropTypes.number,
  onClose: PropTypes.func.isRequired,
};

ImagesZoom.defaultProps = {
  current: 0,
};

export default ImagesZoom;
