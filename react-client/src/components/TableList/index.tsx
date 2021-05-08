import Box from 'components/Box';
import React from 'react';
import { Container, Label } from './parts';

export interface ITableListColumn {
  title: string;
  width: number;
  noArrow?: boolean;
}

interface Props {
  columns: ITableListColumn[];
  maxHeight?: string;
}

export const TableList: React.FC<Props> = ({
  columns,
  children,
  maxHeight
}) => {
  return (
    <>
      <Container columnsWidths={columns.map((column) => column.width)}>
        {columns.map((column) => (
          <Label
            text={column.title}
            key={column.title}
            noArrow={column.noArrow}
          />
        ))}
      </Container>
      <Box borderRadius='10px' overflow='hidden'>
        <Container
          columnsWidths={columns.map((column) => column.width)}
          maxHeight={maxHeight}
        >
          {children}
        </Container>
      </Box>
    </>
  );
};

export default TableList;
