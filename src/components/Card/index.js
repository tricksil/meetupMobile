import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import {
  Container,
  Banner,
  Content,
  Title,
  Info,
  Text,
  SubmitButton,
} from './styles';

const Card = ({ meetup, onSubmit, subscription }) => {
  const dateFormatted = useMemo(
    () =>
      format(parseISO(meetup.date), "dd 'de' MMMM, 'às' HH'h'", { locale: pt }),
    [meetup.date],
  );

  return (
    <Container>
      <Banner
        source={{
          uri: meetup.banner.url,
        }}
      />
      <Content>
        <Title>{meetup.title}</Title>
        <Info>
          <Icon name="event" size={20} color="#999" />
          <Text>{dateFormatted}</Text>
        </Info>
        <Info>
          <Icon name="place" size={20} color="#999" />
          <Text>{meetup.location}</Text>
        </Info>
        <Info>
          <Icon name="person" size={20} color="#999" />
          <Text>Organizador: {meetup.organizer.name}</Text>
        </Info>

        <SubmitButton onPress={onSubmit}>
          {subscription ? 'Realizar Inscrição' : 'Cancelar Incrição'}
        </SubmitButton>
      </Content>
    </Container>
  );
};

Card.propTypes = {
  meetup: PropTypes.oneOfType([PropTypes.object]).isRequired,
  onSubmit: PropTypes.func.isRequired,
  subscription: PropTypes.bool.isRequired,
};

export default Card;
