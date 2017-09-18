import constants from '../constants';

const initialState = {
  currentLocation: {
    lat: 40.7504753,
    lng: -73.9932668
  },
  list: null,
  moved: false
};

export default (state = initialState, action) => {
  let updatedState = Object.assign({}, state);
  let updatedList =
    updatedState['list'] == null ? [] : [...updatedState['list']];

  switch (action.type) {
    case constants.POSTS_RECEIVED:
      updatedState['list'] = action.posts;

      return updatedState;

    case constants.POST_CREATED:
      updatedList.unshift(action.post);
      updatedState['list'] = updatedList;

      return updatedState;

    case constants.CURRENT_LOCATION_CHANGED:
      updatedState['currentLocation'] = action.location;
      updatedState['list'] = null;
      updatedState['moved'] = true;

      return updatedState;

    default:
      return updatedState;
  }
};
