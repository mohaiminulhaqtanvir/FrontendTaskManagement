import React from "react";
import "./style.scss";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  size?: "sm" | "lg";
  variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info";
  isError?: boolean;
  isValid?: boolean;
  errorMessage?: string;
  required?: boolean;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      size,
      variant = "primary",
      isError = false,
      isValid = false,
      errorMessage,
      required = false,
      className = "",
      id,
      ...props
    },
    ref
  ) => {
    return (
      <div className="mb-3">
        {label && (
          <label htmlFor={id} className="form-label">
            {label}
            {required && <span className="text-danger ms-1">*</span>}
          </label>
        )}

        <textarea
          ref={ref}
          id={id}
          required={required}
          className={`form-control form-control-${size} form-control-${variant} input-rounded ${
            isError ? "is-invalid " : ""
          } ${isValid ? "is-valid " : ""} ${className}`}
          {...props}
        />

        {isError && errorMessage && (
          <div className="invalid-feedback">
            {errorMessage}
          </div>
        )}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

export default TextArea;