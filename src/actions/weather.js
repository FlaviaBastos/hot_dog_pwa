export const RECEIVE_WEATHER = 'RECEIVE_WEATHER';
export const FAIL_WEATHER = 'FAIL_WEATHER';

export const receiveWeather = (city, condition, fahr, icon) => {
    return {
      type: RECEIVE_WEATHER,
      city,
      condition,
      fahr,
      icon
    }
  }