import { FlexBox } from 'components/Box';
import React from 'react';
import DashboardContent from 'components/DashboardContent';
import { useHistory } from 'react-router';
import { ROUTES } from 'constants/routes';
import { useStoreActions } from 'global-state/hooks';

export const DashboardHomeView: React.FC = () => {
  const history = useHistory();
  const { addAudioSources } = useStoreActions((state) => state.audio);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !files.length) return;

    const sourceName = 'file';

    addAudioSources({
      [sourceName]: URL.createObjectURL(files[0])
    });

    history.push(ROUTES.DASHBOARD_ANALYSER.replace(':id', 'file'));
  };

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
          <input
            type='file'
            accept='.mp3, .wav, .flac, .m4a'
            onChange={onFileChange}
          />
        </FlexBox>
      </DashboardContent>
    </>
  );
};

export default DashboardHomeView;
