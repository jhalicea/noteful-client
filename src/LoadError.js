import React from "react";
import PropTypes from "prop-types"

export default class LoadError extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {

    if (this.state.hasError) {
      return <h2>Could not display the information, there is an error while loading...</h2>;
    }
    return this.props.children;
  }
}

LoadError.defaultProps = {
  props: {}
}

LoadError.propType = {
  props: PropTypes.object.isRequired
}