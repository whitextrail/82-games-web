import {
  SEND_PREDICTION,
  FETCH_USER_PREDICTIONS,
} from '../actions/util/types';
import {
  evalActionPayload,
  initialStateDecorator,
} from '../lib/reducers';
import { normalizeUserPredictionList } from '../lib/user-predictions';

const userPredictionsState = initialStateDecorator({
  byId: {},
  allIds: [],
  selectedId: null,
});

const updatePredictionsReducer = (state, { response }) => {
  const {
    entities: { userPredictions },
    result,
  } = normalizeUserPredictionList(response);
  console.log(response);
  return {
    byId: userPredictions,
    allIds: result,
    selectedId: result[0],
  };
};

export default (state = userPredictionsState, action) => {
  const { type } = action;

  switch (type) {
    case SEND_PREDICTION:
    case FETCH_USER_PREDICTIONS:
      return evalActionPayload(state, action, updatePredictionsReducer);
    default:
      return state;
  }
};
