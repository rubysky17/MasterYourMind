type Action =
  | { type: "SET_SELECTED_LEVEL"; payload: number }
  | { type: "SET_IS_STARTED"; payload: boolean }
  | { type: "SET_IS_FINISHED"; payload: boolean }
  | { type: "SET_CURRENT_MATH_LIST"; payload: Array<unknown> };

export const initialState = {
  name: "Guest",
  isStarted: false,
  isFinished: false,
  selectedLevel: 1,
  currentMathList: []
};

export const AppActions = {
  setSelectedLevel: (payload: number): Action => ({
    type: "SET_SELECTED_LEVEL",
    payload,
  }),

  setIsStarted: (payload: boolean): Action => ({
    type: "SET_IS_STARTED",
    payload,
  }),

  setIsFinished: (payload: boolean): Action => ({
    type: "SET_IS_FINISHED",
    payload,
  }),

  setCurrentMathList: (payload: Array<unknown>): Action => ({
    type: "SET_CURRENT_MATH_LIST",
    payload,
  }),
};

export function appReducer(state, action: Action) {
  switch (action.type) {
    case "SET_SELECTED_LEVEL":
      return {
        ...state,
        selectedLevel: action.payload,
      };

    case "SET_IS_STARTED":
      return {
        ...state,
        isStarted: action.payload,
      };

    case "SET_IS_FINISHED":
      return {
        ...state,
        isFinished: action.payload,
      };

    case "SET_CURRENT_MATH_LIST":
      return {
        ...state,
        currentMathList: action.payload,
      };

    default:
      break;
  }
}
