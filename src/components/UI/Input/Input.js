import React from "react";
import classes from "./Input.css";

const Input = (props) => {
  let inputElement = null;
  let validationText = "";
  const inputClasses = [classes.InputElement];

  if (props.inValid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.InValid);
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <div>
          <input
            className={inputClasses.join(" ")}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}
          />
          <p className={classes.ValidationError}>{validationText}</p>
        </div>
      );
      break;
    case "textarea":
      inputElement = (
        <div>
          <textarea
            className={inputClasses.join(" ")}
            {...props}
            value={props.value}
            onChange={props.changed}
          />
          <p className={classes.ValidationError}>{validationText}</p>
        </div>
      );
      break;
    case "select":
      inputElement = (
        <div>
          <select
            className={classes.Input}
            value={props.value}
            onChange={props.changed}
          >
            {props.elementConfig.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.displayValue}
              </option>
            ))}
          </select>
          <p className={classes.ValidationError}>{validationText}</p>
        </div>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props}
          value={props.value}
          onChange={props.changed}
        />
      );
  }
  return (
    <div>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
