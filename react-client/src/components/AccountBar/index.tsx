import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router';

import Box, { Center } from '~/components/Box';
import Icon from '~/components/Icon';
import { ROUTES } from '~/constants/routes';
import { useStoreActions, useStoreState } from '~/global-state/hooks';
import { useOutsideClick } from '~/hooks/useOutsideClick';

import {
  AvatarContainer,
  Container,
  IconContainer,
  LowerTextContainer,
  TextContainer,
  Tooltip,
  TooltipItem,
  UpperTextContainer
} from './parts';

const NAME_CUT_CHAR_NUM = 18;

export const AccountBar: React.FC = () => {
  const [tooltipOpened, setTooltipOpened] = useState(false);
  const tooltipRef = useRef(null);
  const { user } = useStoreState((state) => state.user);
  const {
    ui: { closeModal },
    auth: { logout },
    project: { clearProjects },
    user: { clear: clearUser },
    audio: { clear: clearAudio }
  } = useStoreActions((state) => state);
  const history = useHistory();

  useOutsideClick(tooltipRef, () => tooltipOpened && setTooltipOpened(false));

  const onLogout = () => {
    logout();
    clearUser();
    clearProjects();
    closeModal();
    clearAudio();
    history.push(ROUTES.AUTH_LOGIN);
  };

  const getUsername = () => {
    if (user) {
      if (user.firstName || user.lastName)
        return `${user.firstName ?? ''} ${user.lastName ?? ''}`;

      return user.email;
    }
    return 'Unknown';
  };
  const username = getUsername();

  return (
    <Center height='100%'>
      <Container onClick={() => setTooltipOpened(!tooltipOpened)}>
        <AvatarContainer>
          <Icon icon='user-fill' size={26} />
        </AvatarContainer>
        <TextContainer>
          <UpperTextContainer>Welcome</UpperTextContainer>
          <LowerTextContainer>
            {username.length > NAME_CUT_CHAR_NUM
              ? username.substring(0, NAME_CUT_CHAR_NUM) + '...'
              : username}
          </LowerTextContainer>
        </TextContainer>
        <IconContainer>
          <Box
            transform={tooltipOpened ? 'rotate(-180deg)' : ''}
            transition='transform 0.3s'
          >
            <Icon icon='arrow-up-fill' size={16} />
          </Box>
        </IconContainer>
      </Container>
      {tooltipOpened && (
        <Tooltip role='tooltip' ref={tooltipRef}>
          <TooltipItem onClick={onLogout}>
            <Icon icon='logout' size={16} />{' '}
            <Box marginLeft='0.5rem'>Logout</Box>
          </TooltipItem>
        </Tooltip>
      )}
    </Center>
  );
};

export default AccountBar;
