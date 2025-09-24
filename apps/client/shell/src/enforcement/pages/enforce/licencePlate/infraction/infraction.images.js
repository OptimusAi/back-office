import {
  Divider,
  ImageList,
  ImageListItem,
  makeStyles,
  Tooltip,
  Typography,
} from '@material-ui/core';
import React, {
  createRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useIntl } from 'react-intl';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import keys from '../../../../../languages/keys';
import ImageViewer from '../../../../shared/image-viewer';

const useStyles = makeStyles((theme) => ({
  container: {
    marginLeft: theme.spacing(),
    marginBottom: theme.spacing(),
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
    marginBottom: theme.spacing(),
  },
}));

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
  const [columns, setColumns] = useState(0);

  let imageRefs = useRef([]);
  const containerRef = useRef(null);
  imageRefs.current = images.map(
    (ref, index) => (imageRefs.current[index] = createRef())
  );

  useEffect(() => {
    if (imageRefs.current[activeImage]) {
      imageRefs.current[activeImage].current?.focus();
    }
  }, [imageRefs, activeImage]);

  useEffect(() => {
    setColumns(images.length);
  }, [images]);

  const showImageViewer = (index) => {
    onActiveImage({ isActive: true, index });
  };

  const handleCheck = (event, index) => {
    const { value } = event.currentTarget;
    let currentPhotoIndex;

    if (event.type === 'keypress') {
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

    if (event.type === 'mousedown' || event.type === undefined) {
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

    if (event.type === 'change') {
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

  const handleClose = () => {
    onActiveImage({ isActive: false, index: -1 });
  };

  const handleImageChange = (e) => {
    const index = images.findIndex((i) => i.id === e.id);
    onActiveImage({ isActive: true, index });
  };

  return (
    <div ref={containerRef} className={classes.imagesContainer}>
      <ImageList cols={columns} style={{ margin: 0 }} rowHeight={350}>
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
        {images.map((image, index) => (
          <ImageListItem
            key={index}
            ref={imageRefs.current[index]}
            className={classes.tile}
            tabIndex={0}
            style={{ width: 'auto' }}
            onKeyPress={(e) => {
              if (e.charCode === 13 && !activeImageViewer)
                showImageViewer(image.id);
              if (e.charCode === 13 && activeImageViewer) handleClose();
              if (e.charCode === 32) handleCheck(e, index);
            }}
          >
            <Tooltip
              placement="bottom-start"
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
                data-index={index}
              >
                <TransformWrapper
                  initialScale={1}
                  minScale={1}
                  maxScale={10}
                  wheel={{ step: 1.5 }}
                  pan={{ disabled: false }}
                  pinch={{ disabled: false }}
                  doubleClick={{ disabled: false, mode: 'zoomIn', step: 0.7 }}
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
      <ImageViewer
        visible={activeImageViewer}
        activeIndex={activeImage}
        images={images}
        onClose={handleClose}
        handleCheck={handleCheck}
        handleImageChange={handleImageChange}
      />
    </div>
  );
};

export default InfractionImages;
