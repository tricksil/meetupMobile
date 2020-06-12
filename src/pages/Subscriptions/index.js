import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';

import { Container, MeetupsList } from './styles';
import Card from '~/components/Card';

import { handleSubscrible } from '~/util/handleErrors';

function Subscriptions() {
  const [meetups, setMeetups] = useState([]);
  const isFocused = useIsFocused();

  async function loadMeetups() {
    const response = await api.get('subscribe');

    const data = response.data.map((meetup) => ({
      ...meetup,
      banner: {
        url: __DEV__
          ? meetup.banner.url.replace(
              'http://localhost:3333',
              api.defaults.baseURL,
            )
          : meetup.banner.url,
      },
    }));

    setMeetups(data);
  }

  useEffect(() => {
    if (isFocused) loadMeetups();
  }, [isFocused]);

  const handleSubmit = async (meetupId) => {
    try {
      const response = await api.delete(`subscribe/${meetupId}`);
      setMeetups(meetups.find((meetup) => meetup.id !== response.data.id));
      Alert.alert(
        'Sucesso',
        `Você cancelou sua inscrição em ${response.data.title}`,
      );
    } catch (error) {
      Alert.alert('Error', handleSubscrible(error.response.data.error));
    }
  };

  return (
    <Background>
      <Header />
      <Container>
        <MeetupsList
          data={meetups}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Card
              meetup={item}
              subscription={false}
              onSubmit={() => handleSubmit(item.id)}
            />
          )}
        />
      </Container>
    </Background>
  );
}

export default Subscriptions;
