const FETCH_CARS = 'FETCH_CARS';
const FETCH_CAR = 'FETCH_CAR';
const CAR_CREATED = 'CAR_CREATED';
const CAR_DELETED = 'CAR_DELETED';
const garageName = "GeorgesGarage";

export function fetchCars() {
  // API CALL
  const promise = fetch(`https://wagon-garage-api.herokuapp.com/${garageName}/cars`)
    .then(response => response.json());
  return {
    type: FETCH_CARS,
    payload: promise
  }
}

export function fetchCar(id) {
  const promise = fetch(`https://wagon-garage-api.herokuapp.com/cars/${id}`)
    .then(response => response.json());
  return {
    type: FETCH_CAR,
    payload: promise
  }
}

export function deleteCar(history, car) {
  const request = fetch(`https://wagon-garage-api.herokuapp.com/cars/${car.id}`, {
    method: 'DELETE'
  }).then(response => response.json())
  .then(() => history.push(""));

  return {
    type: CAR_DELETED,
    payload: car
  };
}

export function createCar(body, callback) {
  const request = fetch(`https://wagon-garage-api.herokuapp.com/${garageName}/cars`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }).then(response => response.json())
  .then(callback);

  return {
    type: CAR_CREATED,
    payload: request
  };
}
