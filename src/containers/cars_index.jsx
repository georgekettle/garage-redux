import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchCars } from '../actions/index';
import { Link } from 'react-router-dom';


class CarsIndex extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchCars();
  }

  renderCarsList = (cars) => {
    return cars.map((car) => {
      return (
        <Link to={`/cars/${car.id}`} key={car.id}>
          <div className="car-list-item">
            <p>{car.plate}</p>
            <h3>{car.brand} {car.model}</h3>
            <p>{car.owner}</p>
          </div>
        </Link>
      );
    })
  }

  render() {
    return (
      <div>
        <div className="first-row">
          <h3>Cars</h3>
          <Link className="btn btn-primary btn-cta" to="/cars/new">
            Create a Car
          </Link>
        </div>
        {this.renderCarsList(this.props.cars)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cars: state.cars
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCars }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CarsIndex);
