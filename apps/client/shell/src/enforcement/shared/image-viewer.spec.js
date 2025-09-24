import React from 'react';
import { render } from '@testing-library/react';
import ImageViewer from './image-viewer';

const mock = {
  images: [
    {
      id: '1',
      url: 'https://fakesitefortestingimage.com',
      deviceType: 'MOBILE',
      deviceId: '123-abc',
      observationId: '456-def',
      operatorName: 'cpa10956',
      imageType: 'PLATE'
    },
    {
      id: '2',
      url: 'https://fakesitefortestingimage.com',
      deviceType: 'MOBILE',
      deviceId: '123-abc',
      observationId: '456-def',
      operatorName: 'cpa10956',
      imageType: 'PROFILE'
    }
  ]
};

describe('Observation images', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ImageViewer
      visible
      activeIndex={1}
      images={mock.images}/>
      );
    expect(baseElement).toBeTruthy();
  });
});
