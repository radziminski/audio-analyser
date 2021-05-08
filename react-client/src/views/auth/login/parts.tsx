import { ActionButton } from 'components/ActionButton';
import Box from 'components/Box';
import Form from 'components/Form';
import TextInput from 'components/TextInput';
import React, { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from 'global-state/hooks';
import { useHistory } from 'react-router';
import { ROUTES } from 'constants/routes';
import { Heading3 } from 'components/Text';
import { FONT_WEIGHTS } from 'styles/theme';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const history = useHistory();

  const { authError, isLoading, isAuthenticated } = useStoreState(
    (store) => store.auth
  );
  const { login, setError } = useStoreActions((store) => store.auth);

  const onSubmit = async () => {
    void login({ email, password });
  };

  useEffect(() => {
    if (isAuthenticated) history.push(ROUTES.DASHBOARD);
  }, [isAuthenticated, history]);

  useEffect(() => {
    setError(null);
  }, [setError]);

  return (
    <Form onSubmit={onSubmit}>
      <Box height='1rem'>
        {authError && (
          <Heading3
            fontSize='0.8rem'
            color='red'
            fontWeight={FONT_WEIGHTS.medium}
          >
            {authError}
          </Heading3>
        )}
      </Box>
      <Box marginTop='1rem'>
        <TextInput
          type='text'
          label='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Your email'
          name='email'
          autoComplete='on'
        />
      </Box>
      <Box marginTop='2rem'>
        <TextInput
          type='password'
          label='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Your password'
          name='current-password'
          autoComplete='on'
        />
      </Box>
      <Box marginTop='4rem'>
        <ActionButton isLoading={isLoading} type='submit'>
          Login
        </ActionButton>
      </Box>
    </Form>
  );
};

export default LoginForm;
