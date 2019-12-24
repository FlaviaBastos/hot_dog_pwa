export const CHANGETEMP = 'CHANGETEMP';

export const changeTemp = (checked) => {
    return {
      type: CHANGETEMP,
      checked
    };
};