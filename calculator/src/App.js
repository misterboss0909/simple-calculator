import { useReducer } from 'react';
import { Button } from './Buttons';
import { OpButton } from './Buttons';

export const CALCULATIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  RESULT: 'result',
};

function reducer(state, { type, payload }) {
  // eslint-disable-next-line default-case
  switch (type) {
    case CALCULATIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          activeNum: payload.digit,
          overwrite: false,
        };
      }

      return {
        ...state,
        activeNum: `${state.activeNum || ''}${payload.digit}`,
      };
    case CALCULATIONS.CHOOSE_OPERATION:
      if (state.activeNum == null && state.firstNum == null) {
        return state;
      }

      if (state.activeNum == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }

      if (state.firstNum == null) {
        return {
          ...state,
          operation: payload.operation,
          firstNum: state.activeNum,
          activeNum: null,
        };
      }

      return {
        ...state,
        firstNum: result(state),
        operation: payload.operation,
        activeNum: null,
      };
    case CALCULATIONS.CLEAR:
      return {};
    case CALCULATIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          activeNum: null,
        };
      }
      if (state.activeNum == null) return state;
      if (state.activeNum.length === 1) {
        return { ...state, activeNum: null };
      }

      return {
        ...state,
        activeNum: state.activeNum.slice(0, -1),
      };
    case CALCULATIONS.RESULT:
      if (
        state.operation == null ||
        state.activeNum == null ||
        state.firstNum == null
      ) {
        return state;
      }

      return {
        ...state,
        overwrite: true,
        firstNum: null,
        operation: null,
        activeNum: result(state),
      };
  }
}

function result({ activeNum, firstNum, operation }) {
  const prev = parseFloat(firstNum);
  const current = parseFloat(activeNum);
  if (isNaN(prev) || isNaN(current)) return '';
  let computation = '';
  // eslint-disable-next-line default-case
  switch (operation) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case '*':
      computation = prev * current;
      break;
    case '/':
      computation = prev / current;
      break;
  }

  return computation.toString();
}

//makes decimal operation posible
const INTEGER_FORMATTER = new Intl.NumberFormat('en-us', {
  maximumFractionDigits: 0,
});
function formatOperand(operand) {
  if (operand == null) return;
  const [integer, decimal] = operand.split('.');
  if (decimal == null) return INTEGER_FORMATTER.format(integer);
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}

function App() {
  const [{ activeNum, firstNum, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <div className='container'>
      <div className='calculator-grid'>
        <div className='result'>
          <div className='first-num'>
            {formatOperand(firstNum)} {operation}
          </div>
          <div className='active-num'>{formatOperand(activeNum)}</div>
        </div>
        <button
          className='span'
          onClick={() => dispatch({ type: CALCULATIONS.CLEAR })}
        >
          AC
        </button>
        <button onClick={() => dispatch({ type: CALCULATIONS.DELETE_DIGIT })}>
          DEL
        </button>
        <OpButton operation='/' dispatch={dispatch} />
        <Button digit='7' dispatch={dispatch} />
        <Button digit='8' dispatch={dispatch} />
        <Button digit='9' dispatch={dispatch} />
        <OpButton operation='*' dispatch={dispatch} />
        <Button digit='4' dispatch={dispatch} />
        <Button digit='5' dispatch={dispatch} />
        <Button digit='6' dispatch={dispatch} />
        <OpButton operation='+' dispatch={dispatch} />
        <Button digit='1' dispatch={dispatch} />
        <Button digit='2' dispatch={dispatch} />
        <Button digit='3' dispatch={dispatch} />
        <OpButton operation='-' dispatch={dispatch} />
        <Button digit='0' dispatch={dispatch} />
        <Button digit='.' dispatch={dispatch} />
        <button
          className='span'
          onClick={() => dispatch({ type: CALCULATIONS.RESULT })}
        >
          =
        </button>
      </div>
    </div>
  );
}

export default App;
