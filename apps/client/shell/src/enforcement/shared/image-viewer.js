import React from 'react';
import Viewer from 'react-viewer';

const ObservationImageViewer = (props) => {
  const { images, visible, activeIndex, onClose, handleCheck, handleImageChange } = props;

  const handleClickAway = (e, activeIndex) => {
    handleCheck({ ...e, currentTarget: { value: 0 } }, activeIndex);
    onClose();
  };

  const handleClose = (e) => {
    handleCheck({ ...e, currentTarget: { value: 0 } }, activeIndex);
    onClose();
  };
  return (
    activeIndex !== -1 &&
    visible !== false &&
    images !== null && (
      <Viewer
        images={images}
        visible={visible}
        activeIndex={activeIndex}
        rotatable={false}
        scalable={false}
        downloadable={false}
        zoomSpeed={0.2}
        noImgDetails
        noNavbar
        onChange={handleImageChange}
        zIndex={2000}
        onClose={handleClose}
        onMaskClick={(e) => handleClickAway(e, activeIndex)}
      />
    )
  );
};

export default ObservationImageViewer;
