import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';
import DateInput from '~/components/DateInput';

import { Container, MeetupsList } from './styles';
import Card from '~/components/Card';

import { handleSubscrible } from '~/util/handleErrors';

function Dashboard() {
  const [date, setDate] = useState(new Date());
  const [pageCount, setPageCount] = useState(1);
  const [meetups, setMeetups] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();

  async function loadMeetups(page = 1) {
    const response = await api.get('meetups', {
      params: {
        date,
        page,
      },
    });

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

    setMeetups(page >= 2 ? [...meetups, ...data] : data);
    setRefreshing(false);
    setPageCount(page);
  }

  useEffect(() => {
    if (isFocused) {
      setDate(new Date());
      setMeetups([]);
      setPageCount(1);
      setRefreshing(false);
      loadMeetups();
    }
  }, [isFocused]);

  useEffect(() => {
    loadMeetups();
  }, [date]);

  const loadMore = () => {
    const nextPage = pageCount + 1;

    loadMeetups(nextPage);
  };

  const refreshList = () => {
    setRefreshing(true);
    setMeetups([]);
    loadMeetups();
  };

  const handleSubmit = async (meetupId) => {
    try {
      const response = await api.post(`subscribe/${meetupId}`);
      Alert.alert('Sucesso', `Você se inscriveu em${response.data.title}`);
    } catch (error) {
      Alert.alert('Error', handleSubscrible(error.response.data.error));
    }
  };

  return (
    <Background>
      <Header />
      <Container>
        <DateInput date={date} onChange={setDate} />
        <MeetupsList
          data={meetups}
          onRefresh={refreshList}
          refreshing={refreshing}
          onEndReachedThreshold={0.2}
          onEndReached={loadMore}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Card
              meetup={item}
              subscription
              onSubmit={() => handleSubmit(item.id)}
            />
          )}
        />
      </Container>
    </Background>
  );
}

export default Dashboard;
