import produce from 'immer';

const INITIAL_STATE = {
  active: null,
  edit: false,
};
export default function meetup(state = INITIAL_STATE, actions) {
  return produce(state, (draft) => {
    switch (actions.type) {
      case '@meetup/SET_MEETUP': {
        draft.active = actions.payload.meetup;
        break;
      }
      case '@meetup/NEW_MEETUP': {
        draft.active = null;
        draft.edit = false;
        break;
      }
      case '@meetup/MEETUP_EDIT': {
        draft.edit = true;
        break;
      }
      case '@meetup/CREATE_MEETUP_SUCCESS': {
        draft.active = actions.payload.meetup;
        draft.edit = false;
        break;
      }

      case '@meetup/UPDATE_MEETUP_SUCCESS': {
        draft.active = actions.payload.meetup;
        draft.edit = false;
        break;
      }

      default:
    }
  });
}
