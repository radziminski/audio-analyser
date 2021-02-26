import React from 'react';
import { Container, Title, SubTitles, SubTitle } from './parts';

interface Props {
  title?: string;
  subTitles?: string[];
}

const DashboardContent: React.FC<Props> = ({ children, subTitles, title }) => {
  return (
    <Container>
      {title && <Title>{title}</Title>}
      {subTitles && subTitles.length > 0 && (
        <SubTitles>
          {subTitles.map((subTitle, index) => (
            <SubTitle key={index}>{subTitle}</SubTitle>
          ))}
        </SubTitles>
      )}
      {children}
    </Container>
  );
};

export default DashboardContent;
