import React, {
  forwardRef,
  useContext,
  createContext,
  useMemo,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";

const FormGroupContext = createContext({});

export const YesNoOptions = [
  { value: 1, label: "Yes" },
  { value: 0, label: "No" },
];

export const CheckboxGroup = ({
  className = "form--cb-group",
  children,
  ...props
}) => {
  return (
    <div {...{ className }} {...props}>
      {children}
    </div>
  );
};

export const CheckboxLabel = ({
  className = "form--cb-label",
  children,
  ...props
}) => {
  return (
    <label {...{ className }} {...props}>
      {children}
    </label>
  );
};

export const CheckboxField = ({
  className = "form--cb-field",
  children,
  ...props
}) => {
  return <input {...{ className }} {...props} />;
};

let Checkbox = (
  { id, options = [{ value: "1", label: "" }], value, ...props },
  ref,
) => {
  return (
    <CheckboxGroup {...{ ref }}>
      {options.map(({ value: _oV, label: oLabel }) => {
        const oValue = `${_oV}`.replace(/[\W_]+/g, "").toLowerCase();
        return (
          <CheckboxLabel htmlFor={`${id}-${oValue}`} key={`${id}-${oValue}`}>
            <span>
              <CheckboxField
                name={id}
                id={`${id}-${oValue}`}
                value={`${_oV}`}
                checked={`${value}` === `${_oV}`}
                {...props}
              />
            </span>
            <span>{` ${oLabel}`}</span>
          </CheckboxLabel>
        );
      })}
    </CheckboxGroup>
  );
};
Checkbox = forwardRef(Checkbox);

export const Label = ({ className = "form--label", children, ...props }) => {
  return (
    <label {...{ className }} {...props}>
      {children}
      {": "}
    </label>
  );
};

const usePreviousValue = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

let Input = (
  {
    width = 100,
    id,
    value,
    type = "text",
    onChange = () => {},
    onEnter = () => {},
    className: classNameProp,
    onCheck,
    loading,
    options,
    idProp,
    style = {},
    ...props
  },
  ref,
) => {
  const previousValue = usePreviousValue(value);
  const { setIsValid, validProp } = useContext(FormGroupContext);
  let Type = "input";

  switch (type) {
    case "select":
    case "dropdown":
      Type = "select";

      props.children = (
        <React.Fragment>
          {props.placeholder && <option value="">{props.placeholder}</option>}
          {options &&
            options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
        </React.Fragment>
      );

      break;
    case "textarea":
      Type = "textarea";
      props.children = value;
      break;
    case "checkbox":
    case "radio":
      Type = Checkbox;
      width = "auto";
      props.options = options;
      props.type = type;
      break;
    default:
      props.type = type;
      break;
  }

  const baseClassName = "form--input";
  const className = `${baseClassName} ${baseClassName}-${type} ${
    classNameProp || ""
  }`;

  const _width = useMemo(
    () => (parseInt(width) === `${width}` ? `${width}%` : width),
    [width],
  );

  if (width) {
    style.width = _width;
  }

  const ValidityCheck = useCallback(
    (currentValue) => {
      let v;
      if (validProp instanceof Function) {
        v = validProp(currentValue);
      } else {
        v = validProp;
      }

      if (onCheck) {
        onCheck({ id: idProp, valid: v, value });
      }

      setIsValid(v);
    },
    [setIsValid, validProp, value, idProp],
  );

  useEffect(() => {
    if (previousValue !== value) {
      ValidityCheck(value);
    }
  }, [previousValue, value, ValidityCheck]);

  return (
    <Type
      {...{ ref, id, type, className }}
      value={value || ""}
      onKeyDown={(e) => e.key === "Enter" && onEnter()}
      onChange={(e) => onChange(e.currentTarget.value)}
      {...props}
    />
  );
};
Input = forwardRef(Input);

const InitHandlingComponent = ({ id, onInit }) => {
  const [hasRun, setHasRun] = useState(false);

  useEffect(() => {
    if (!hasRun) {
      setHasRun(true);
      onInit({ id });
    }
  }, [onInit, id, hasRun]);

  return null;
};

const ErrorHandlingComponent = ({ onError, id, value }) => {
  useEffect(() => {
    if (onError) {
      onError({ id, value });
    }
  }, [onError, id, value]);

  return null;
};

let FormGroup = (
  {
    className = "",
    replaceClass,
    help,
    onError,
    onInit,
    valid: validProp = true,
    error = "Required.",
    label,
    children,
    id: idProp,
    ...props
  },
  ref,
) => {
  const [isValid, setIsValid] = useState(true);

  const id = useMemo(
    () => `${idProp}-${Math.random().toString(36).substr(2, 9)}`,
    [idProp],
  );

  const InputComponent = Input;
  let InputProps = { id, idProp, ...props };
  const LabelComponent = Label;
  let LabelProps = { htmlFor: id };

  const FormGroupProps = { className: "form--group" };
  if (replaceClass) {
    FormGroupProps.className = className;
  } else {
    FormGroupProps.className = `${FormGroupProps.className} ${className}`;
  }

  return (
    <FormGroupContext.Provider value={{ isValid, validProp, setIsValid }}>
      {!!onInit && <InitHandlingComponent {...{ onInit }} id={idProp} />}
      <div {...FormGroupProps}>
        {label && <LabelComponent {...LabelProps}>{label}</LabelComponent>}
        <InputComponent {...InputProps} {...{ ref }} />
        {!isValid && error ? (
          <div>
            <ErrorHandlingComponent {...{ onError, id: idProp, ...props }} />
            <FormError>{error}</FormError>
          </div>
        ) : null}
        <div>{help}</div>
      </div>
    </FormGroupContext.Provider>
  );
};

FormGroup = forwardRef(FormGroup);
export { FormGroup, Input, Checkbox };
