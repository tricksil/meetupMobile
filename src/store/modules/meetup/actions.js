export function setMeetup(meetup) {
  return {
    type: '@meetup/SET_MEETUP',
    payload: { meetup },
  };
}
export function newMeetup() {
  return {
    type: '@meetup/NEW_MEETUP',
  };
}
export function meetupEdit() {
  return {
    type: '@meetup/MEETUP_EDIT',
  };
}

export function createMeetupRequest(data) {
  return {
    type: '@meetup/CREATE_MEETUP_REQUEST',
    payload: { data },
  };
}

export function createMeetupSuccess(meetup) {
  return {
    type: '@meetup/CREATE_MEETUP_SUCCESS',
    payload: { meetup },
  };
}

export function updateMeetupRequest(data) {
  return {
    type: '@meetup/UPDATE_MEETUP_REQUEST',
    payload: { data },
  };
}

export function updateMeetupSuccess(meetup) {
  return {
    type: '@meetup/UPDATE_MEETUP_SUCCESS',
    payload: { meetup },
  };
}

export function meetupFailure() {
  return {
    type: '@meetup/MEETUP_FAILURE',
  };
}
