import React from "react";
import ReactDOM from "react-dom";

// Example JS object used for CSS styling
const styles = {
facebookBtn: {
backgroundColor: "rgb(51, 89, 157)"
},
form: {
textAlign: "center"
}
};

export class Login extends React.Component {
constructor(props) {
super(props);
this.state = {
  userName: "",
  password: "",
  passHidden: ""
};
}
handleOnSubmit = e => {
e.preventDefault();
console.log("Submitted!");
};

onUserNameChange = e => {
const value = e.target.value;
this.setState({
  userName: value
});
};
onHiddenPasswordChange = e => {};

onPasswordChange = e => {
const passwordValue = e.target.value;
const hiddenPassValue = this.state.passHidden;
let showLength = 1;
let hideAll = setTimeout(() => {}, 0);

let offset = passwordValue.length - hiddenPassValue.length;

if (offset > 0) {
  this.setState({
    passHidden:
      hiddenPassValue +
      passwordValue.substring(
        hiddenPassValue.length,
        hiddenPassValue.length + offset
      )
  });
} else if (offset < 0) {
  this.setState({
    passHidden: hiddenPassValue.substring(
      0,
      hiddenPassValue.length + offset
    )
  });
}

// Change the visible string
if (passwordValue.length > showLength) {
  this.setState({
    password:
      passwordValue
        .substring(0, passwordValue.length - showLength)
        .replace(/./g, "•") +
      passwordValue.substring(
        passwordValue.length - showLength,
        passwordValue.length
      )
  });
}

// Set the timer
clearTimeout(hideAll);
hideAll = setTimeout(() => {
  this.setState({
    password: passwordValue.replace(/./g, "•")
  });
}, 1000);
  };

  render() {
     return (
  <form  onSubmit={this.handleOnSubmit}>
    <h4>Welcome Back!</h4>
    <div className="form-group row">
      <input
        className="input"
        value={this.state.userName}
        onChange={this.onUserNameChange}
        type="text"
        placeholder="Email"
      />
    </div>
    <div className="form-group row">
      <input
        className="input"
        value={this.state.password}
        onChange={this.onPasswordChange}
        type="text"
        placeholder="Password"
      />
    </div>

   
    <div className="form-group row">
      <button className="btn" type="submit">
        Log In
      </button>
    </div>
  </form>
);
  }
}

 class Form extends React.Component {
  render() {
    const { children, title } = this.props;
    return (
  <div className="col-md-6 mx-auto">
    <header>
      <h1>{title}</h1>
    </header>
    {children}
  </div>
);
  }
}

ReactDOM.render(<Form children={<Login />} />, document.getElementById("root"));