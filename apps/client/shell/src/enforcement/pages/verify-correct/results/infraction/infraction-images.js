/* eslint-disable @typescript-eslint/no-empty-function */
import React, {
  useState,
  useEffect,
  useRef,
  createRef,
} from 'react';
import {
  makeStyles,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Checkbox,
  Tooltip,
  Typography,
  Divider,
} from '@material-ui/core';
import { useIntl } from 'react-intl';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

import keys from '../../../../../languages/keys';
import { roleTypes } from '../../../../../admin/admin.enums';
 
const useStyles = makeStyles((theme) => ({
  imagesContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing(),
  },
  tile: {
    outline: 'none',
    '&:hover': {
      cursor: 'pointer',
    },
    '&:focus': {
      backgroundColor: theme.palette.accent.main,
    },
  },
  selector: {
    color: theme.palette.common.white,
    userSelect: 'none',
    '&:hover': {
      cursor: 'pointer',
    },
    '&:checked': {
      color: theme.palette.common.white,
    },
  },
  image: {
    height: '-webkit-fill-available',
  },
  subtitle: {
    marginTop: theme.spacing(),
    marginBottom: theme.spacing(0.5),
  },
}));
 
const foucsFirstElement = () => {
  document.getElementById('prevent-outside-tab').focus();
};
 
const InfractionImages = ({
  images,
  onImageUpdate,
  activeInfraction,
  activeImageViewer,
  activeImage,
  onActiveImage,
  permissions,
}) => {
  const classes = useStyles();
  const intl = useIntl();
  const [selectedImages, setSelectedImages] = useState([]);
  const [columns, setColumns] = useState('auto');
  const isVerification = permissions.includes(roleTypes[2]);
  let imageRefs = useRef([]);
  const containerRef = useRef(null);
 
  imageRefs.current = images.map(
    (ref, index) => (imageRefs.current[index] = createRef())
  );
 
  useEffect(() => {
    const filteredImages = images.filter((img) => img.useToEnforce);
    setSelectedImages(filteredImages);
    setColumns(filteredImages.length);
  }, [images]);
 
  useEffect(() => {
    if (imageRefs.current[activeImage]) {
      imageRefs.current[activeImage].current?.focus();
    }
  }, [imageRefs, activeImage]);
 
  const handleCheck = (event, index) => {
    const { value } = event.currentTarget;
    let currentPhotoIndex;
 
    if (activeImageViewer) {
      return;
    }
    if (event.type === 'keypress' && isVerification) {
      currentPhotoIndex = activeInfraction.enforcementPhotos.findIndex(
        (i) => i.photoId === images[index].id
      );
      onImageUpdate({
        id: activeInfraction.id,
        index: currentPhotoIndex,
        enforcementPhotos: activeInfraction.enforcementPhotos,
        enforcementPhoto: activeInfraction.enforcementPhotos[currentPhotoIndex],
        useToEnforce: !activeInfraction.enforcementPhotos[currentPhotoIndex]
          .useToEnforce,
      });
    }
    if (
      event.type === 'mousedown' ||
      (event.type === undefined && isVerification)
    ) {
      currentPhotoIndex = activeInfraction.enforcementPhotos.findIndex(
        (i) => i.photoId === images[index].id
      );
      if (activeInfraction.enforcementPhotos[currentPhotoIndex].useToEnforce) {
        return;
      } else {
        onImageUpdate({
          id: activeInfraction.id,
          index: currentPhotoIndex,
          enforcementPhotos: activeInfraction.enforcementPhotos,
          enforcementPhoto:
            activeInfraction.enforcementPhotos[currentPhotoIndex],
          useToEnforce: true,
        });
      }
    }
    if (event.type === 'change' && isVerification) {
      currentPhotoIndex = activeInfraction.enforcementPhotos.findIndex(
        (i) => i.photoId === images[value].id
      );
      onImageUpdate({
        id: activeInfraction.id,
        index: currentPhotoIndex,
        enforcementPhotos: activeInfraction.enforcementPhotos,
        enforcementPhoto: activeInfraction.enforcementPhotos[currentPhotoIndex],
        useToEnforce: !activeInfraction.enforcementPhotos[currentPhotoIndex]
          .useToEnforce,
      });
    }
  };
 
  return (
    <>
      <div ref={containerRef} className={classes.imagesContainer}>
        {selectedImages.length !== 0 && (
          <ImageList cols={columns} style={{ margin: 0 }} rowHeight={420}>
            <ImageListItem
              key="Subheader"
              cols={columns}
              style={{ height: 'auto' }}
            >
              <div className={classes.subtitle}>
                <Typography variant="subtitle2" color="textSecondary">
                  {intl.formatMessage({ id: keys.selectedImages })}
                </Typography>
                <Divider />
              </div>
            </ImageListItem>
            {selectedImages.map((image, index) => (
              <ImageListItem
                style={{ width: 'auto' }}
                key={index}
                className={classes.tile}
                tabIndex={-1}
              >
                <Tooltip
                  placement="right"
                  title={
                    <p style={{ fontSize: 12 }}>
                      {`${intl.formatMessage({ id: keys.cameraType })} ${
                        image.deviceType
                      }`}
                      <br />
                      {`${intl.formatMessage({ id: keys.cameraId })} ${
                        image.deviceId
                      }`}
                      <br />
                      {image.operatorName !== '' &&
                        `${intl.formatMessage({ id: keys.operatorName })} ${
                          image.operatorName
                        }`}
                    </p>
                  }
                >
                  <div
                    style={{
                      position: 'relative',
                      overflow: 'hidden',
                      height: '100%',
                      width: '100%',
                    }}
                  >
                    <TransformWrapper
                      initialScale={1}
                      minScale={1}
                      maxScale={10}
                      wheel={{ step: 2 }}
                      pan={{ disabled: false }}
                      pinch={{ disabled: false }}
                      doubleClick={{ disabled: false, mode: 'zoomIn', step: 2 }}
                      wrapperStyle={{
                        width: '100%',
                        height: '100%',
                      }}
                      contentStyle={{
                        width: '100%',
                        height: '100%',
                      }}
                    >
                      <TransformComponent
                        wrapperStyle={{
                          width: '100%',
                          height: '100%',
                        }}
                        contentStyle={{
                          width: '100%',
                          height: '100%',
                        }}
                      >
                        <img
                          src={image.src}
                          alt="img"
                          className={classes.image}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                          }}
                        />
                      </TransformComponent>
                    </TransformWrapper>
                  </div>
                </Tooltip>
              </ImageListItem>
            ))}
          </ImageList>
        )}
        <ImageList cols={4}>
          <ImageListItem key="Subheader" cols={4} style={{ height: 'auto' }}>
            <div className={classes.subtitle}>
              <Typography variant="subtitle2" color="textSecondary">
                {intl.formatMessage({ id: keys.availableImages })}
              </Typography>
              <Divider />
            </div>
          </ImageListItem>
          {images.map((image, index) => (
            <ImageListItem
              key={index}
              ref={imageRefs.current[index]}
              className={classes.tile}
              tabIndex={0}
              style={{ height: '240px', width: '' }}
              onKeyPress={(e) => {
                if (e.charCode === 32) handleCheck(e, index);
              }}
            >
              <Tooltip
                placement="top"
                title={
                  <p style={{ fontSize: 12 }}>
                    {`${intl.formatMessage({ id: keys.cameraType })} ${
                      image.deviceType
                    }`}
                    <br />
                    {`${intl.formatMessage({ id: keys.cameraId })} ${
                      image.deviceId
                    }`}
                    <br />
                    {image.operatorName !== '' &&
                      `${intl.formatMessage({ id: keys.operatorName })} ${
                        image.operatorName
                      }`}
                  </p>
                }
              >
                <img src={image.src} alt="img" className={classes.image} />
              </Tooltip>
              <ImageListItemBar
                position="top"
                actionIcon={
                  <label className={classes.selector}>
                    {intl.formatMessage({ id: keys.useToEnforce })}
                    <Checkbox
                      inputProps={{ tabIndex: -1 }}
                      data-testid="checkbox"
                      value={index}
                      color="default"
                      classes={{ root: classes.selector }}
                      onChange={(e) => handleCheck(e)}
                      checked={image.useToEnforce}
                    />
                  </label>
                }
                onClick={(e) => e.stopPropagation()}
                onKeyPress={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.preventDefault()}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>

      <span tabIndex="0" onFocus={foucsFirstElement}></span>
    </>
  );
};
 
export default InfractionImages;