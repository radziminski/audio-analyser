import React from 'react';
import DashboardContent from 'components/DashboardContent';
import NavPanel from 'components/NavPanel';

interface Props {
  title?: string;
  subTitles?: string[];
}

const Layout: React.FC<Props> = ({ children, title, subTitles }) => {
  return (
    <>
      <NavPanel />
      <DashboardContent
        title={title || 'Here goes the title'}
        subTitles={subTitles}
      >
        {children}
      </DashboardContent>
    </>
  );
};

export default Layout;
