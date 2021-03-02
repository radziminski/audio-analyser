import Icon from 'components/Icon';
import React from 'react';
import {
  AvatarContainer,
  Container,
  IconContainer,
  LowerTextContainer,
  TextContainer,
  UpperTextContainer
} from './parts';

const NAME_CUT_CHAR_NUM = 18;

export const AccountBar: React.FC = () => {
  const currUsername = 'Jan Radzimiński';
  return (
    <Container>
      <AvatarContainer>
        <Icon icon='user-fill' size={26} />
      </AvatarContainer>
      <TextContainer>
        <UpperTextContainer>Welcome</UpperTextContainer>
        <LowerTextContainer>
          {currUsername.length > NAME_CUT_CHAR_NUM
            ? currUsername.substring(0, NAME_CUT_CHAR_NUM) + '...'
            : currUsername}
        </LowerTextContainer>
      </TextContainer>
      <IconContainer>
        <Icon icon='arrow-down-fill' size={16} />
      </IconContainer>
    </Container>
  );
};

export default AccountBar;
