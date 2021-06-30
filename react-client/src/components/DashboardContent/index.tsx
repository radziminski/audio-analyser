import React, { useCallback, useRef } from 'react';
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
import { useOnKeyboardPress } from '~/hooks/useOnKeyboardPress';

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
  const ref = useRef<HTMLDivElement>(null);

  // Preventing down scroll on space
  const onSpaceClick = useCallback(
    (e) => (e.code === 'Space' ? e.preventDefault() : true),
    []
  );
  useOnKeyboardPress(onSpaceClick, ref);

  return (
    <Container>
      <AudioControlBar />
      <ScrollContainer ref={ref}>
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
