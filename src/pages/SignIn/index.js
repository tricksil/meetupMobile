import React from 'react';
import { Image } from 'react-native';

import Background from '~/components/Background';

import logo from '~/assets/logo.png';

import { Container, Form, FormInput, SubmitButton } from './styles';

const SignIn = () => {
  return (
    <Background>
      <Container>
        <Image source={logo} />

        <Form>
          <FormInput />

          <SubmitButton>Entrar</SubmitButton>
        </Form>
      </Container>
    </Background>
  );
};

export default SignIn;
