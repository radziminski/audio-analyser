import { Center } from 'components/Box';
import Loader from 'components/Loader';
import { Heading4 } from 'components/Text';
import React from 'react';
import { FONT_WEIGHTS } from 'styles/theme';
import { Container, Label } from './parts';

export interface ITableListColumn {
  title: string;
  width: number;
  noArrow?: boolean;
}

interface Props {
  columns: ITableListColumn[];
  isEmpty?: boolean;
  errorMessage?: string;
  isLoading?: boolean;
}

export const TableList: React.FC<Props> = ({
  columns,
  children,
  isEmpty,
  errorMessage,
  isLoading
}) => {
  const getTableWithLabels = (content: React.ReactNode | null = null) => (
    <Container columnsWidths={columns.map((column) => column.width)}>
      {columns.map((column) => (
        <Label
          text={column.title}
          key={column.title}
          noArrow={column.noArrow}
        />
      ))}
      {content}
    </Container>
  );

  if (isLoading)
    return (
      <>
        {getTableWithLabels()}
        <Center marginY='4rem'>
          <Loader />
        </Center>
      </>
    );

  if (isEmpty) {
    return (
      <>
        {getTableWithLabels()}
        <Center marginY='4rem'>
          <Heading4
            color='rgba(255,255,255, 0.7)'
            fontWeight={FONT_WEIGHTS.light}
            fontSize='1rem'
          >
            {errorMessage ?? 'Nothing to show here'}
          </Heading4>
        </Center>
      </>
    );
  }

  return <>{getTableWithLabels(children)}</>;
};

export default TableList;
