/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

export const UPDATE_PAGE = 'UPDATE_PAGE';
export const UPDATE_OFFLINE = 'UPDATE_OFFLINE';
export const UPDATE_DRAWER_STATE = 'UPDATE_DRAWER_STATE';
export const OPEN_SNACKBAR = 'OPEN_SNACKBAR';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';
export const RECEIVE_WEATHER = 'RECEIVE_WEATHER'
export const FAIL_WEATHER = 'FAIL_WEATHER'

export const navigate = (path) => (dispatch) => {
  // Extract the page name from path.
  const page = path === '/' ? 'view1' : path.slice(1);

  // Any other info you might want to extract from the path (like page type),
  // you can do here
  dispatch(loadPage(page));

  // Close the drawer - in case the *path* change came from a link in the drawer.
  dispatch(updateDrawerState(false));
};

const loadPage = (page) => (dispatch) => {
  switch(page) {
    case 'view1':
      import('../components/my-view1.js').then((module) => {
        // Put code in here that you want to run every time when
        // navigating to view1 after my-view1.js is loaded.
      });
      break;
    case 'view2':
      import('../components/my-view2.js');
      break;
    case 'view3':
      import('../components/my-view3.js');
      break;
    case 'about':
      import('../components/about-page.js');
      break;
    default:
      page = 'view404';
      import('../components/my-view404.js');
  }

  dispatch(updatePage(page));
};

const updatePage = (page) => {
  return {
    type: UPDATE_PAGE,
    page
  };
};

let snackbarTimer;

export const showSnackbar = () => (dispatch) => {
  dispatch({
    type: OPEN_SNACKBAR
  });
  clearTimeout(snackbarTimer);
  snackbarTimer = setTimeout(() =>
    dispatch({ type: CLOSE_SNACKBAR }), 3000);
};

export const updateOffline = (offline) => (dispatch, getState) => {
  // Show the snackbar, unless this is the first load of the page.
  if (getState().app.offline !== undefined) {
    dispatch(showSnackbar());
  }
  dispatch({
    type: UPDATE_OFFLINE,
    offline
  });
};

export const updateLayout = (wide) => (dispatch, getState) => {
  if (getState().app.drawerOpened) {
    dispatch(updateDrawerState(false));
  }
};

export const updateDrawerState = (opened) => (dispatch, getState) => {
  if (getState().app.drawerOpened !== opened) {
    dispatch({
      type: UPDATE_DRAWER_STATE,
      opened
    });
  }
};

export const fetchWeather = () => (dispatch) => {
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(`Lat: ${position.coords.latitude} Long: ${position.coords.longitude}`)
    let lat = position.coords.latitude
    let long = position.coords.longitude
    let forecastEndpoint = `https://ajhs4lp7ff.execute-api.us-east-1.amazonaws.com/prod?lat=${lat}&long=${long}`
    console.log(`Endpoint: ${forecastEndpoint}`)
    
    fetch(forecastEndpoint)
    .then(res => res.json())
    .then(response => {
      let city = response.name
      let condition = response.weather[0].description
      let icon = response.weather[0].main
      let fahr = response.main.temp
      console.log(`You're in ${city}, and temp is ${fahr}C. Weather condition is ${condition}. ICON: ${icon}`)
      dispatch(receiveWeather(city, condition, fahr, icon))
    }) // end then response
    .catch(error => console.error('API Error:', error))
  }, console.log('Unable to retrieve your location'));
}

export const receiveWeather = (city, condition, fahr, icon) => {
  console.log(`IN ACTION: city ${city}, ${fahr}, ${icon}`)
  return {
    type: RECEIVE_WEATHER,
    city,
    condition,
    fahr,
    icon
  }
}