import React from "react";
import classes from "./Input.css";

const Input = (props) => {
  let inputElement = null;

  switch (props.elementType) {
    case "input":
      console.log(classes.InputElement);
      inputElement = (
        <div>
          <input
            className={classes.InputElement}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}
          />
        </div>
      );
      break;
    case "textarea":
      inputElement = (
        <div>
          <textarea
            className={classes.InputElement}
            {...props}
            value={props.value}
            onChange={props.changed}
          />
        </div>
      );
      break;
    case "select":
      inputElement = (
        <div>
          <select
            className={classes.InputElement}
            value={props.value}
            onChange={props.changed}
          >
            {props.elementConfig.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.displayValue}
              </option>
            ))}
          </select>
        </div>
      );
      break;
    default:
      inputElement = (
        <input
          className={classes.InputElement}
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
