import { Center } from '~/components/Box';
import Loader from '~/components/Loader';
import { Heading4 } from '~/components/Text';
import React from 'react';
import { FONT_WEIGHTS } from '~/styles/theme';
import { Container, Label } from './parts';

export interface ITableListColumn<T = string> {
  title: T;
  width: number;
  noArrow?: boolean;
}

interface Props {
  columns: ITableListColumn[];
  showMessage?: boolean;
  errorMessage?: string;
  isLoading?: boolean;
  onLabelClick?: (label: string) => void;
  selectedLabel?: string;
  selectedLabelArrowReversed?: boolean;
}

export const TableList: React.FC<Props> = ({
  columns,
  children,
  showMessage,
  errorMessage,
  isLoading,
  onLabelClick,
  selectedLabel,
  selectedLabelArrowReversed
}) => {
  const getTableWithLabels = (content: React.ReactNode | null = null) => (
    <Container columnsWidths={columns.map((column) => column.width)}>
      {columns.map((column) => (
        <Label
          text={column.title}
          key={column.title}
          noArrow={column.noArrow}
          selected={selectedLabel === column.title}
          arrowReversed={
            selectedLabel === column.title && selectedLabelArrowReversed
          }
          onClick={() => onLabelClick && onLabelClick(column.title)}
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

  if (showMessage) {
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
