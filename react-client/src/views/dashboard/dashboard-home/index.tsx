import { FlexBox } from 'components/Box';
import React from 'react';
import DashboardContent from 'components/DashboardContent';
import { useHistory } from 'react-router';
import { ROUTES } from 'constants/routes';

export const DashboardHomeView: React.FC = () => {
  const history = useHistory();

  return (
    <>
      <DashboardContent title='Home'>
        <FlexBox color='white' flexDirection='column'>
          <button
            style={{ color: 'white', padding: '20px' }}
            onClick={() => {
              history.push(ROUTES.DASHBOARD_ANALYSER.replace(':id', 'sample'));
            }}
          >
            Change to sample
          </button>
          <button
            style={{ color: 'white', padding: '20px' }}
            onClick={() => {
              history.push(ROUTES.DASHBOARD_ANALYSER.replace(':id', 'sample2'));
            }}
          >
            Change to sample2
          </button>
          <button
            style={{ color: 'white', padding: '20px' }}
            onClick={() => {
              history.push(ROUTES.DASHBOARD_ANALYSER.replace(':id', 'sample3'));
            }}
          >
            Change to sample3
          </button>
          <button
            style={{ color: 'white', padding: '20px' }}
            onClick={() => {
              history.push(ROUTES.DASHBOARD_ANALYSER.replace(':id', 'volumes'));
            }}
          >
            Change to volumes
          </button>
        </FlexBox>
      </DashboardContent>
    </>
  );
};

export default DashboardHomeView;
