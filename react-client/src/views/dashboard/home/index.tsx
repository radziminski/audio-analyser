import Box, { FlexBox } from '~/components/Box';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import DashboardContent from '~/components/DashboardContent';
import ProjectsTableList from '~/components/ProjectsTableList';
import { Heading5, Paragraph } from '~/components/Text';
import { COLORS } from '~/styles/theme';
import { ActionBox, ActionCard } from './parts';
import { ROUTES } from '~/constants/routes';
import FileDropZone from '~/components/FileDropZone';
import { useStoreActions } from '~/global-state/hooks';
import { CustomSource } from '~/global-state/audio/types';

export const DashboardHomeView: React.FC = () => {
  const history = useHistory();

  const { addAudioSources, stop } = useStoreActions((state) => state.audio);

  const onAnalyzeLiveAudio = () => {
    history.push(
      ROUTES.DASHBOARD_ANALYSER.replace(':id', CustomSource.LiveAudio)
    );
  };

  const onFileChange = useCallback(
    (file: File) => {
      const name = new Date().toISOString();
      addAudioSources({
        [name]: URL.createObjectURL(file)
      });

      stop();

      history.push(ROUTES.DASHBOARD_ANALYSER.replace(':id', name));
    },
    [history]
  );

  return (
    <>
      <DashboardContent title='Welcome to Audio Analyzer!'>
        <Box marginY='1rem' opacity={0.7} maxWidth='1400px'>
          <Paragraph color={COLORS.white} lineHeight='150%'>
            To upload or record an audio file, first create or choose an
            existing project to do it. Then enter a given project page and you
            will be able to open an modal for file creation. Alternatively, you
            can analyse given file or live audio data by using buttons below. In
            that case, the file will NOT be uploaded to the servers.Be aware
            that in this case the file will not be available anymore after
            reloading the page.
          </Paragraph>
        </Box>

        <FlexBox marginY='4rem'>
          <ActionCard onClick={() => history.push(ROUTES.DASHBOARD_PROJECTS)}>
            <Heading5 light>Browse all projects</Heading5>
          </ActionCard>
          <ActionCard onClick={onAnalyzeLiveAudio}>
            <Heading5 light>Analyse live audio from microphone</Heading5>
          </ActionCard>
          <ActionBox>
            <FileDropZone
              disabled={false}
              onFileChange={onFileChange}
              text='Drop or click to analyse file locally, without uploading it to the server'
            />
          </ActionBox>
        </FlexBox>

        <Box marginBottom='1rem'>
          <Heading5 light>Recently visited projects:</Heading5>
        </Box>
        <ProjectsTableList projectsShownLimit={5} />
      </DashboardContent>
    </>
  );
};

export default DashboardHomeView;
