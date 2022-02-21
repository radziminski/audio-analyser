import React from 'react';
import { StyledComponentPropsWithRef } from 'styled-components';

export type Props = StyledComponentPropsWithRef<'form'>;

const Form: React.FC<Props> = ({ children, ...props }) => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onSubmit && props.onSubmit(e);
  };

  return (
    <form {...props} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default Form;
