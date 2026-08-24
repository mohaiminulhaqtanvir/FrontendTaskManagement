import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import clsx from "clsx";

import Icon from "../Icon";
import "./style.scss";

type ISizes = "lg" | "md" | "sm";

type IDateInputProps = {
  name?: string;
  size?: ISizes;
  variant?: "solid" | "outline";

  label?: string;
  autoFocus?: boolean;

  isRequired?: boolean;
  hasInfo?: boolean;
  infoText?: string;

  placeholder?: string;

  defaultValue?: string;
  value?: string;

  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  min?: string;
  max?: string;

  minDate?: Date;
  maxDate?: Date;

  isError?: boolean;
  helpText?: string;
  isValid?: boolean;
  errorMessage?: string;

  noMargin?: boolean;

  registerProperty?: any;

  disabled?: boolean;
  readOnly?: boolean;

  startIcon?: React.ReactNode;
  startIconClassName?: string;

  endIcon?: React.ReactNode;

  className?: string;
  title?: string;

  showClear?: boolean;
};

const DateInput = ({
  name,
  size = "sm",
  variant = "outline",

  label,
  autoFocus,

  isRequired = false,
  hasInfo = false,
  infoText,

  placeholder = "DD/MM/YYYY",

  defaultValue,
  value,

  onChange,

  min,
  max,

  minDate,
  maxDate,

  isError = false,
  helpText,
  isValid = false,
  errorMessage,

  noMargin = false,

  registerProperty,

  disabled = false,
  readOnly = false,

  startIcon,
  startIconClassName,

  endIcon,

  className,
  title,

  showClear = true,
}: IDateInputProps) => {
  /**
   * =========================================
   * Parse Date
   * Supports:
   *
   * DD/MM/YYYY
   * YYYY-MM-DD
   * YYYY-MM-DDTHH:mm:ss
   * =========================================
   */

  const parseDate = (dateString?: string): Date | null => {
    if (!dateString) {
      return null;
    }

    const value = String(dateString).trim();

    // DD/MM/YYYY
    const ddmmyyyy = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);

    if (ddmmyyyy) {
      const day = Number(ddmmyyyy[1]);
      const month = Number(ddmmyyyy[2]) - 1;
      const year = Number(ddmmyyyy[3]);

      const date = new Date(year, month, day);

      if (
        date.getFullYear() === year &&
        date.getMonth() === month &&
        date.getDate() === day
      ) {
        return date;
      }

      return null;
    }

    // YYYY-MM-DD
    const yyyymmdd = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);

    if (yyyymmdd) {
      const year = Number(yyyymmdd[1]);
      const month = Number(yyyymmdd[2]) - 1;
      const day = Number(yyyymmdd[3]);

      const date = new Date(year, month, day);

      if (
        date.getFullYear() === year &&
        date.getMonth() === month &&
        date.getDate() === day
      ) {
        return date;
      }
    }

    return null;
  };

  /**
   * =========================================
   * Date -> DD/MM/YYYY
   * =========================================
   */

  const formatDate = (date: Date | null): string => {
    if (!date) {
      return "";
    }

    const day = String(date.getDate()).padStart(2, "0");

    const month = String(date.getMonth() + 1).padStart(2, "0");

    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  /**
   * =========================================
   * State
   * =========================================
   */

  const [dateValue, setDateValue] = useState<string>(
    value ?? defaultValue ?? ""
  );

  /**
   * =========================================
   * IMPORTANT:
   * Sync value whenever edit data changes
   * =========================================
   */

  useEffect(() => {
    if (value !== undefined) {
      setDateValue(value);
    }
  }, [value]);

  /**
   * =========================================
   * Selected Date
   * =========================================
   */

  const selectedDate = parseDate(dateValue);

  /**
   * =========================================
   * Date Change
   * =========================================
   */

  const handleDateChange = (date: Date | null) => {
    const formattedDate = formatDate(date);

    setDateValue(formattedDate);

    const fieldName = name ?? registerProperty?.name;

    const event = {
      target: {
        name: fieldName,
        value: formattedDate,
      },

      currentTarget: {
        name: fieldName,
        value: formattedDate,
      },
    } as React.ChangeEvent<HTMLInputElement>;

    /**
     * Custom onChange
     */
    onChange?.(event);

    /**
     * React Hook Form
     */
    registerProperty?.onChange?.(event);
  };

  /**
   * =========================================
   * Clear
   * =========================================
   */

  const handleClear = () => {
    if (disabled || readOnly) {
      return;
    }

    handleDateChange(null);
  };

  /**
   * =========================================
   * Show Clear
   * =========================================
   */

  const shouldShowClear = showClear && !!dateValue && !disabled && !readOnly;

  /**
   * =========================================
   * Min / Max
   * =========================================
   */

  const finalMinDate = minDate ?? parseDate(min);

  const finalMaxDate = maxDate ?? parseDate(max);

  return (
    <div className={clsx("w-100 fv-row", !noMargin && "mb-3", className)}>
      {/* LABEL */}

      {label && (
        <label className="d-flex align-items-center fs-5">
          <span className={isRequired ? "required" : ""}>
            {label}

            {isRequired && <span className="text-danger ms-1">*</span>}
          </span>

          {hasInfo && <Icon icon="help" hoverTitle={infoText} />}
        </label>
      )}

      {/* DATE INPUT */}

      <div className="date-input-wrapper">
        {/* START ICON */}

        {startIcon && (
          <span
            className={clsx(
              "date-input-start-icon",
              {
                "mt-1": !startIconClassName,
              },
              startIconClassName
            )}
          >
            {startIcon}
          </span>
        )}

        {/* DATE PICKER */}

        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          placeholderText={placeholder}
          minDate={finalMinDate}
          maxDate={finalMaxDate}
          disabled={disabled}
          readOnly={readOnly}
          autoFocus={autoFocus}
          required={isRequired}
          showPopperArrow={false}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          title={title}
          className={clsx(
            `form-control form-control-${size}`,
            `form-control-${variant}`,
            "input-rounded",
            "date-input",
            {
              "is-invalid": isError,
              "is-valid": isValid,
              "ps-11": !!startIcon,
              "pe-12": shouldShowClear,
            }
          )}
        />

        {/* CALENDAR ICON */}

        <span
          className={clsx("date-input-calendar-icon", {
            "with-clear": shouldShowClear,
          })}
        >
          <Icon icon="calendar_month" />
        </span>

        {/* CLEAR BUTTON */}

        {shouldShowClear && (
          <button
            type="button"
            className="date-input-clear"
            onClick={handleClear}
            title="Clear date"
            aria-label="Clear date"
          >
            ×
          </button>
        )}

        {/* END ICON */}

        {endIcon && !shouldShowClear && (
          <span className="date-input-end-icon">{endIcon}</span>
        )}
      </div>

      {/* ERROR */}

      {isError && (
        <div className="invalid-feedback d-block">{errorMessage}</div>
      )}

      {/* HELP */}

      {!isError && helpText && (
        <div className="form-text text-gray-600">{helpText}</div>
      )}
    </div>
  );
};

export default DateInput;
