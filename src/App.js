import React, { Component } from "react";
import classes from "./App.css";
import Input from "./components/UI/Input/Input";
import Button from "./components/UI/Button/Button";

class App extends Component {
  state = {
    registrationForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        validation : {
          required: true,
          validationMessage: 'Please enter a valid Name'
        },
        valid: false,
        touched:false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-mail",
        },
        value: "",
        validation : {
          required: true,
          validationMessage: 'Please enter a valid Email Address'
        },
        valid: false,
        touched:false
      },
      gender: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "male", displayValue: "Male" },
            { value: "female", displayValue: "Female" },
          ],
        },
        value: "male",
        valid:true
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation : {
          required: true,
          validationMessage: 'Please enter a valid Password'
        },
        valid: false,
        touched:false
      },
    },
    isFormValid: false,
  };

  registrationHandler = (event) => {
    let formData = {};

    event.preventDefault();
    for (let formElementIdentifier in this.state.registrationForm) {
      formData[formElementIdentifier] = this.state.registrationForm[
        formElementIdentifier
      ].value;
    }
    console.log("formData",formData);
    alert("registered!")
  };
  inputChangeHandler = (event, inputIdentifier) => {
    let updateRegistrationForm = { ...this.state.registrationForm };
    let updateRegistrationElement = updateRegistrationForm[inputIdentifier];
    let isFormValid = true;

    updateRegistrationElement["value"] = event.target.value;
    updateRegistrationForm[inputIdentifier] = updateRegistrationElement;
    updateRegistrationElement.valid = this.checkValidity(updateRegistrationElement["value"], updateRegistrationElement["validation"]);
    updateRegistrationElement.touched=true;
    updateRegistrationForm[inputIdentifier] = updateRegistrationElement;

    for(let element in updateRegistrationForm) {
      isFormValid = updateRegistrationForm[element].valid && isFormValid;
    }
    this.setState({isFormValid: isFormValid});
    this.setState({ registrationForm: updateRegistrationForm });
  };

  checkValidity = (value, rules) => {
    let isValid = true;

    if(!rules) {
      return true;
    }

    if(rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if(rules.minLength) {
      isValid = value.length >= rules.minLength && isValid
    }
    if(rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid
    }
    return isValid;
  }

  render() {
    const formElementsArray = [];

    for (let key in this.state.registrationForm) {
      formElementsArray.push({
        id: key,
        config: this.state.registrationForm[key],
      });
    }
    return (
      <div className={classes.App}>
        <h4>Enter Registration Details</h4>
        <form className={classes.Form} onSubmit={this.registrationHandler}>
          {formElementsArray.map((formElement) => (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              inValid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              changed={(event) =>
                this.inputChangeHandler(event, formElement.id)
              }
            />
          ))}
        </form>
        <Button btnType="Success" disabled={!this.state.isFormValid} clicked={this.registrationHandler}>
          Register
        </Button>
      </div>
    );
  }
}

export default App;
