import constants from '../constants';

const initialState = {
  user: null
};

export default (state = initialState, action) => {
  let updatedState = Object.assign({}, state);

  switch (action.type) {
    case constants.CURRENT_USER_RECEIVED:
      updatedState['user'] = action.user;
      return updatedState;

    default:
      return updatedState;
  }
};
