import Box, { FlexBox } from 'components/Box';
import React from 'react';
import DashboardContent from 'components/DashboardContent';
import { useHistory } from 'react-router';
import { ROUTES } from 'constants/routes';
import { useStoreActions } from 'global-state/hooks';
import { COLORS } from 'styles/theme';
import Anchor from 'components/Anchor';
import { Heading4 } from 'components/Text';

const MOCK_FILES = [
  {
    title: 'Example: Song',
    source: 'song'
  },
  {
    title: 'Example: Guitar Rec',
    source: 'guitar'
  },
  {
    title: 'Example: Different volumes',
    source: 'volumes'
  },
  {
    title: 'Example: Sine waves',
    source: 'freqs'
  }
];

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
        <FlexBox color='white' flexDirection='column' align-items='center'>
          {MOCK_FILES.map((fileElement) => (
            <Box
              padding='20px'
              color={COLORS.white}
              textAlign='center'
              key={fileElement.title}
            >
              <Anchor
                to={ROUTES.DASHBOARD_ANALYSER.replace(
                  ':id',
                  fileElement.source
                )}
              >
                {fileElement.title}
              </Anchor>
            </Box>
          ))}
          <Box
            padding='20px'
            marginTop='20px'
            color={COLORS.white}
            textAlign='center'
          >
            <Box marginBottom='10px'>
              <Heading4 fontWeight={300} fontSize='1rem'>
                Or upload your own file:
              </Heading4>
            </Box>

            <input
              type='file'
              accept='audio/*'
              onChange={onFileChange}
              style={{ width: '110px', cursor: 'pointer' }}
            />
          </Box>
        </FlexBox>
      </DashboardContent>
    </>
  );
};

export default DashboardHomeView;
