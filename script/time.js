import { hourEl, minuteEl } from './dom.js';

export const updateTime = () => {
  const currentTime = new Date();

  let currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();

  // ! set to 12hrs instead of 24hrs
  // if (currentHour > 12) {
  //   currentHour -= 12;
  // }

  hourEl.textContent = currentHour.toString().padStart(2, '0');
  minuteEl.textContent = currentMinute.toString().padStart(2, '0');
};
