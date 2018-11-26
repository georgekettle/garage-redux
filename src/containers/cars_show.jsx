import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCar, deleteCar } from '../actions/index';

class CarsShow extends Component {
  componentWillMount() {
    if (!this.props.car) {
      this.props.fetchCar(this.props.match.params.id);
    }
  }

  handleDelete = () => {
    this.props.deleteCar(this.props.history, this.props.car);
  }

  // handleDelete = (id) => {
  //   this.props.deleteCar(id, (car) => {
  //     this.props.history.push('/'); // Navigate after delete
  //       return car;
  //   });
  // }

  render() {
    if (!this.props.car) {
      return <p>Loading...</p>;
    }

    return (
      <div>
        <div className="post-item">
          <h3>{this.props.car.brand} - {this.props.car.model}</h3>
          <p>Plate Number: {this.props.car.plate}</p>
          <p>Owner: {this.props.car.owner}</p>
        </div>
        <Link to="/">Back</Link>
        <button onClick={this.handleDelete}>Delete</button>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const idFromUrl = parseInt(ownProps.match.params.id, 10); // From URL
  const car = state.cars.find(p => p.id === idFromUrl);
  return { car };
}

// function mapStateToProps(state, ownProps) {
//   const idFromUrl = parseInt(ownProps.match.params.id, 10); // From URL
//   const car = state.cars.find(c => c.id === idFromUrl);
//   return { car };
// }

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCar, deleteCar }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CarsShow);


