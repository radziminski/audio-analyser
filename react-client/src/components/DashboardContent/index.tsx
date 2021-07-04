import React from 'react';
import {
  Container,
  Title,
  SubTitles,
  SubTitle,
  ScrollContainer
} from './parts';
import AudioControlBar from '../AudioControlBar';
import Box, { FlexBox } from '~/components/Box';
import ActionButton from '~/components/ActionButton';
import { useHistory } from 'react-router';
import Icon from '~/components/Icon';
import { useStoreState } from '~/global-state/hooks';
import { CustomSource } from '~/global-state/audio/types';

interface Props {
  title?: string;
  subTitles?: string[];
  canGoBack?: boolean;
}

const DashboardContent: React.FC<Props> = ({
  children,
  subTitles,
  title,
  canGoBack
}) => {
  const history = useHistory();

  const currSource = useStoreState((state) => state.audio.currSource);

  const showControlBar = currSource !== CustomSource.LiveAudio;

  return (
    <Container>
      {showControlBar && <AudioControlBar />}
      <ScrollContainer>
        <FlexBox>
          {title && <Title>{title}</Title>}
          {canGoBack && (
            <Box width='110px' marginLeft='auto'>
              <ActionButton
                height='30px'
                padding={'0'}
                fontSize='0.8rem'
                onClick={() => history.goBack()}
                borderRadius='6px'
                type='text'
              >
                <FlexBox alignItems='center'>
                  <Box marginRight='0.5rem'>
                    <Icon icon='back' size={16} />
                  </Box>
                  Go back
                </FlexBox>
              </ActionButton>
            </Box>
          )}
        </FlexBox>
        {subTitles && subTitles.length > 0 && (
          <SubTitles>
            {subTitles.map((subTitle, index) => (
              <SubTitle key={index}>{subTitle}</SubTitle>
            ))}
          </SubTitles>
        )}
        {children}
      </ScrollContainer>
    </Container>
  );
};

export default DashboardContent;
