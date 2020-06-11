import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { Alert } from 'react-native';

import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';
// import history from '~/services/history';

import {
  meetupFailure,
  createMeetupSuccess,
  updateMeetupSuccess,
} from './actions';

export function* createMeetup({ payload }) {
  try {
    const { banner_id, ...rest } = payload.data;
    if (!banner_id) {
      Alert.alert('Aviso', 'Selecione um Banner');
      return;
    }

    const meetup = {
      banner_id,
      ...rest,
    };
    console.tron.log(meetup);
    const response = yield call(api.post, 'meetups', meetup);
    Alert.alert('Sucesso', 'Meetup criado com sucesso');
    yield put(createMeetupSuccess(response.data));
    // history.push('/dashboard');
  } catch (error) {
    Alert.alert(
      'Error',
      'Falha ao criar meetup, verifique seus dados por favor',
    );
    yield put(meetupFailure());
  }
}

export function* updateMeetup({ payload }) {
  try {
    const { banner_id, ...rest } = payload.data;
    if (!banner_id) {
      Alert.error('Selecione um Banner');
      return;
    }
    const idMeetup = yield select((state) => state.meetup.active.id);
    const meetup = {
      banner_id,
      ...rest,
    };
    const response = yield call(api.put, `/meetups/${idMeetup}`, meetup);
    Alert.alert('Sucesso', 'Meetup atualizado com sucesso');
    const data = {
      ...response.data,
      dateFormatted: format(
        parseISO(response.data.date),
        "dd 'de' MMMM', às' HH'h'",
        {
          locale: pt,
        },
      ),
      date: parseISO(response.data.date),
    };

    yield put(updateMeetupSuccess(data));

    // history.push('/details');
  } catch (error) {
    Alert.error(
      'Error',
      'Falha ao atualizar meetup, verifique seus dados por favor',
    );
    yield put(meetupFailure());
  }
}

export default all([
  takeLatest('@meetup/CREATE_MEETUP_REQUEST', createMeetup),
  takeLatest('@meetup/UPDATE_MEETUP_REQUEST', updateMeetup),
]);
