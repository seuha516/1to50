import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBoardState, setLeftNumbers, setTarget } from '../modules/board';
import { gameEnd } from '../modules/data';
import * as fn from '../utils/functions';
import * as sound from '../utils/sound';
//style
import classNames from 'classnames/bind';
import styles from '../design/Cell.module.scss';
const cx = classNames.bind(styles);

const clickCorrectCell = (object) => {
  sound.correctbuttonClick();
  object.animate(
    [
      { fontSize: '25px', backgroundColor: 'rgba(110, 255, 122, 0.541)' },
      { fontSize: '50px', backgroundColor: 'rgba(110, 255, 122, 0)' },
    ],
    {
      duration: 1000,
      easing: 'cubic-bezier(.19,.91,.29,.95)',
      fill: 'forwards',
    },
  );
};
const clickWrongCell = (object) => {
  sound.wrongbuttonClick();
  object.animate(
    [
      { backgroundColor: 'rgba(238, 78, 78, 0)' },
      { backgroundColor: 'rgba(238, 78, 78, 0.705)' },
      { backgroundColor: 'rgba(238, 78, 78, 0)' },
    ],
    {
      duration: 500,
      easing: 'cubic-bezier(.32,.86,.73,.19)',
      fill: 'forwards',
    },
  );
};

const Cell = ({ value }) => {
  const dispatch = useDispatch();
  const { boardState, target, leftNumbers } = useSelector(({ board }) => ({
    boardState: board.boardState,
    target: board.target,
    leftNumbers: board.leftNumbers,
  }));
  const onClick = (e) => {
    if (e.target.textContent === '') return;
    if (e.target.textContent === String(target)) {
      if (target === 5) {
        sound.gameWin();
        dispatch(gameEnd());
        return;
      }
      let [nextNumber, nextLeftNumbers] = fn.findnextnum(leftNumbers);
      dispatch(setTarget(target + 1));
      dispatch(setLeftNumbers(nextLeftNumbers));
      dispatch(
        setBoardState(
          boardState.map((line) =>
            line.map((cell) =>
              cell.value === target ? { id: cell.id, value: nextNumber } : cell,
            ),
          ),
        ),
      );
    } else {
      clickWrongCell(e.target);
    }
  };

  const newCell = useRef(null);
  useEffect(() => {
    if (target > 1) clickCorrectCell(newCell.current);
  }, [value]);
  return (
    <div className={cx('cell')} ref={newCell} onClick={onClick}>
      {value}
    </div>
  );
};

export default React.memo(Cell);
