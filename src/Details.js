import { Component } from "react";
import { withRouter } from "react-router-dom";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";

class Details extends Component {
  // constructor() {
  //   super(); // to call component constructor

  //   this.state = { loading: true };
  // }

  // New JS feature, We have written babel parser to convert for the old browsers
  state = { loading: true };

  async componentDidMount() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
    );
    const json = await res.json();
    this.setState(Object.assign({ loading: false }, json.pets[0]));
  }
  render() {
    if (this.state.loading) return <h2>Loading...</h2>;
    const { animal, breed, city, state, description, name, images } =
      this.state;
    return (
      <div className="details">
        <Carousel images={images} />
        <h1>{name}</h1>
        <h2>{`${animal} - ${breed} - ${city}, ${state}`}</h2>
        <ThemeContext.Consumer>
          {([themehook]) => (
            <button style={{ backgroundColor: themehook }}>Adopt {name}</button>
          )}
        </ThemeContext.Consumer>
        <p>{description}</p>
      </div>
    );
  }
}

const DetailsWithRouter = withRouter(Details);
export default function DetailsWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <DetailsWithRouter />
    </ErrorBoundary>
  );
}
