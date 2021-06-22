import React from 'react';
import GlobalMessageView from '../global-message';

interface Props {
  light?: boolean;
}

export const DeviceNotSupportedView: React.FC<Props> = ({ light }) => {
  return (
    <GlobalMessageView light={light}>
      Your device has too narrow viewport for this application to run. Please
      visit this website on the device with screen with at least 1200px width.
    </GlobalMessageView>
  );
};

export default DeviceNotSupportedView;
