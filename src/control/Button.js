import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
import { Loading } from "./Loading";

const ButtonRender = ({
  children,
  className = "",
  type,
  form = false,
  to,
  href,
  forwardedRef,
  ...props
}) => {
  let classNames = className || "";

  if (
    !classNames.includes("db") &&
    !classNames.includes("dib") &&
    !classNames.includes("inline-flex") &&
    !classNames.includes("flex")
  ) {
    classNames += " dib";
  }

  if (props.disabled) {
    props.onClick = () => {};
  }

  if (href) {
    return (
      <a ref={forwardedRef} href={href} className={classNames} {...props}>
        {children}
      </a>
    );
  }

  if (to) {
    return (
      <Link ref={forwardedRef} to={to} className={classNames} {...props}>
        {children}
      </Link>
    );
  }

  if (form) {
    return (
      <button
        ref={forwardedRef}
        className={classNames}
        type="submit"
        {...props}
      >
        {children}
      </button>
    );
  }

  return (
    <div ref={forwardedRef} className={classNames} {...props}>
      {children}
    </div>
  );
};

let Button = (
  {
    loading,
    disabled,
    style = {},
    className: classNameProp,
    Loading: LoadingProp,
    ...props
  },
  ref,
) => {
  const LoadingComponent = LoadingProp ? LoadingProp : Loading;

  const baseClassName = "form--btn";
  const className = classNameProp ? classNameProp : baseClassName;

  if (loading) {
    return (
      <div
        className={`${
          className?.includes("db")
            ? `${baseClassName}-wrap-db`
            : `${baseClassName}-wrap-dib`
        } ${baseClassName}-wrap`}
      >
        <ButtonRender
          forwardedRef={ref}
          disabled
          style={{ ...style, flexGrow: 1 }}
          {...{ className }}
          {...props}
        />
        <LoadingComponent className="form--btn-loading" />
      </div>
    );
  }

  return (
    <ButtonRender
      forwardedRef={ref}
      {...{ className, style, disabled }}
      {...props}
    />
  );
};

Button = forwardRef(Button);
export { Button };
