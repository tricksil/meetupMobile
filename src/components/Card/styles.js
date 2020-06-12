import styled from 'styled-components/native';
import {} from 'react-native';
import Button from '../Button';

export const Container = styled.View`
  background: #fff;
  margin-bottom: 20px;
  border-radius: 4px;
`;

export const Banner = styled.Image.attrs({
  resize: 'cover',
})`
  height: 150px;
  width: 100%;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

export const Content = styled.View`
  padding: 20px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
`;
export const Info = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
`;
export const Text = styled.Text`
  font-size: 13px;
  color: #999;
  margin-left: 5px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 10px;
`;
