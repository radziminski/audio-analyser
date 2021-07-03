import { FlexBox } from '~/components/Box';
import React from 'react';
import DashboardContent from '~/components/DashboardContent';

export const DashboardHomeView: React.FC = () => {
  return (
    <>
      <DashboardContent title='Welcome to Audio Analyzer!'>
        <FlexBox
          color='white'
          flexDirection='column'
          alignItems='center'
        ></FlexBox>
      </DashboardContent>
    </>
  );
};

export default DashboardHomeView;
