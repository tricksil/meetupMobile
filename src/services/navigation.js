import { CommonActions } from '@react-navigation/native';

let navigator;

function setNavigator(ref) {
  navigator = ref;
}

function navigate(name, params) {
  if (navigator && name) {
    const actions = CommonActions.navigate({ name, params });
    navigator.dispatch(actions);
  }
}

export { setNavigator, navigate };
