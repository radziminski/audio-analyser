import { ActionButton } from 'components/ActionButton';
import Box, { FlexBox } from 'components/Box';
import Form from 'components/Form';
import TextInput from 'components/TextInput';
import React, { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from 'global-state/hooks';
import { useHistory } from 'react-router';
import { ROUTES } from 'constants/routes';
import { Heading3 } from 'components/Text';
import { FONT_WEIGHTS } from 'styles/theme';

export const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

  const history = useHistory();

  const { authError, isLoading, isAuthenticated } = useStoreState(
    (store) => store.auth
  );
  const { register, setError } = useStoreActions((store) => store.auth);

  useEffect(() => {
    setError(null);
  }, [setError]);

  const onSubmit = async () => {
    if (password !== repeatPassword) {
      return setError('Passwords do not match.');
    }

    const res = await register({
      email,
      password,
      firstName: firstName || undefined,
      lastName: lastName || undefined
    });

    if (res) history.push(ROUTES.AUTH_LOGIN);
  };

  useEffect(() => {
    if (isAuthenticated) history.push(ROUTES.DASHBOARD);
  }, [isAuthenticated, history]);

  return (
    <Form onSubmit={onSubmit}>
      <Box height='1.4rem'>
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
          label='Email*'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Ex. john@gmail.com'
        />
      </Box>
      <FlexBox marginTop='2rem' justifyContent='space-between'>
        <Box width='48%'>
          <TextInput
            type='password'
            label='Password*'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Strong Password'
          />
        </Box>
        <Box width='48%'>
          <TextInput
            type='password'
            label='Repeat Password*'
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            placeholder='Repeat password'
          />
        </Box>
      </FlexBox>
      <FlexBox marginTop='2rem' justifyContent='space-between'>
        <Box width='48%'>
          <TextInput
            type='text'
            label='First Name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder='Ex. John'
          />
        </Box>
        <Box width='48%'>
          <TextInput
            type='text'
            label='Last Name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder='Ex. Smith'
          />
        </Box>
      </FlexBox>

      <Box marginTop='4rem'>
        <ActionButton isLoading={isLoading}>Login</ActionButton>
      </Box>
    </Form>
  );
};

export default RegisterForm;
