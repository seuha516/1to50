import countdown from "../sound/countdown.wav";
import wrongbutton from "../sound/wrongbutton.mp3";
import correctbutton from "../sound/correctbutton.mp3";
import win from "../sound/win.mp3";
export const countdownStart = () => {
  let audiofile = new Audio(countdown);
  audiofile.volume = 1;
  audiofile.play();
};
export const wrongbuttonClick = () => {
  let audiofile = new Audio(wrongbutton);
  audiofile.volume = 1;
  audiofile.play();
};
export const correctbuttonClick = () => {
  let audiofile = new Audio(correctbutton);
  audiofile.volume = 1;
  audiofile.play();
};
export const gameWin = () => {
  let audiofile = new Audio(win);
  audiofile.volume = 1;
  audiofile.play();
};
