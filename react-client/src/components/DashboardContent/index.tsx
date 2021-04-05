import React from 'react';
import {
  Container,
  Title,
  SubTitles,
  SubTitle,
  ScrollContainer
} from './parts';
import AudioControlBar from '../AudioControlBar';

interface Props {
  title?: string;
  subTitles?: string[];
}

const DashboardContent: React.FC<Props> = ({ children, subTitles, title }) => {
  return (
    <Container>
      <AudioControlBar />
      <ScrollContainer>
        {title && <Title>{title}</Title>}
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
