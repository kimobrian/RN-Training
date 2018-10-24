import React, { Component } from "react";
import { View } from "react-native";

export default class AnimatedBar extends Component {
  render() {
    let widthStyle = { width: this.props.value };
    return <View style={[styles.bar, widthStyle]} />;
  }
}

const styles = {
  bar: {
    height: 15,
    borderWidth: 1,
    borderColor: "#c72f06",
    backgroundColor: "#e75832"
  }
};
