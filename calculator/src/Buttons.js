import { CALCULATIONS } from './App';

export const Button = function Button({ dispatch, digit }) {
  return (
    <button
      onClick={() =>
        dispatch({ type: CALCULATIONS.ADD_DIGIT, payload: { digit } })
      }
    >
      {digit}
    </button>
  );
};
export const OpButton = function OpButton({ dispatch, operation }) {
  return (
    <button
      onClick={() =>
        dispatch({
          type: CALCULATIONS.CHOOSE_OPERATION,
          payload: { operation },
        })
      }
    >
      {operation}
    </button>
  );
};
