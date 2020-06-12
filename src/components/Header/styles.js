import styled from 'styled-components/native';
import logo from '~/assets/logo.png';

export const Wrapper = styled.SafeAreaView`
  flex-direction: row;
`;
export const Container = styled.View`
  flex: 1;
  padding: 30px;
  background: rgba(0, 0, 0, 0.2);
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.Image.attrs({
  source: logo,
  resizeMode: 'cover',
})`
  height: 24px;
  width: 24px;
`;
