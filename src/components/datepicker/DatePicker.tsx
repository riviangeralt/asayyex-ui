import React, { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { mergeClassNames } from "src/utils/utils";
import classes from "./DatePicker.module.scss";

type DatePickerProps = {
  size?: "sm" | "md" | "lg" | undefined;
  isDisabled?: boolean;
  error?: boolean;
  value?: Date | undefined;
  onDateChange?: (date: Date) => void;
};

const DatePickerProps: DatePickerProps = {
  size: "md",
  isDisabled: false,
  error: false,
  value: undefined,
  onDateChange: undefined,
};

const DatePicker = (props: DatePickerProps & React.ComponentProps<"div">) => {
  const { size, error, isDisabled, value, onDateChange, ...rest } = props;
  const [monthToDisplay, setMonthToDisplay] = useState(
    value ? new Date(value) : new Date()
  );
  const [showCalendar, setShowCalendar] = useState(false);

  const datepickerSizes = {
    sm: classes.datepicker_sm,
    md: classes.datepicker_md,
    lg: classes.datepicker_lg,
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(monthToDisplay);
    const firstDayOfMonth = getFirstDayOfMonth(monthToDisplay);
    const days: Array<Date | undefined | number> = Array.from(
      { length: daysInMonth },
      (_, i) => new Date(monthToDisplay as Date).setDate(i + 1)
    );
    const blanks: Array<undefined> = Array.from(
      { length: firstDayOfMonth },
      (_, i) => undefined
    );
    const allDays = [...blanks, ...days];
    const rows: Array<Array<Date | undefined | number>> = [];

    let cells: Array<Date | undefined | number> = [];

    allDays.forEach((day, i) => {
      if (i % 7 !== 0) {
        cells.push(day);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(day);
      }
      if (i === allDays.length - 1) {
        rows.push(cells);
      }
    });

    return (
      <div className="absolute z-10 mt-1 w-[300px] max-h-fit overflow-auto rounded-md bg-white p-3 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm scrollbar-thumb-slate-300 scrollbar-thin">
        <div className="flex justify-between items-center">
          {/* prev month */}
          <button
            className="p-[0.1rem] outline-none border-2 border-[var(--primary-color-500)] rounded"
            onClick={() => {
              let monthSubtracted = monthToDisplay.setMonth(
                monthToDisplay.getMonth() - 1
              );
              setMonthToDisplay(new Date(monthSubtracted));
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="m14 18l-6-6l6-6l1.4 1.4l-4.6 4.6l4.6 4.6L14 18Z"
              />
            </svg>
          </button>
          {/* displaying month */}
          <div className="font-bold">
            {months[monthToDisplay.getMonth()]} {monthToDisplay.getFullYear()}
          </div>
          {/* next month */}
          <button
            className="p-[0.1rem] outline-none border-2 border-[var(--primary-color-500)] rounded"
            onClick={() => {
              let monthAdded = monthToDisplay.setMonth(
                monthToDisplay.getMonth() + 1
              );
              setMonthToDisplay(new Date(monthAdded));
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M9.4 18L8 16.6l4.6-4.6L8 7.4L9.4 6l6 6l-6 6Z"
              />
            </svg>
          </button>
        </div>
        <div className="flex">
          {daysOfWeek.map((ele, ind) => {
            return (
              <div
                className={`w-[calc(100%/7)] text-center p-2 cursor-default select-none ${
                  ind === 0 ? "text-red-500" : ""
                }`}
              >
                {ele}
              </div>
            );
          })}
        </div>
        {rows.map((ele) => {
          return (
            <div className="flex">
              {ele.map((date, ind) => {
                let dateToHighlight = `${new Date(date).getDate()}/${new Date(date).getMonth()}/${new Date(date).getFullYear()}`
                let userDate = `${monthToDisplay.getDate()}/${monthToDisplay.getMonth()}/${monthToDisplay.getFullYear()}`
                return (
                  <div
                    className={`w-[calc(100%/7)] text-center relative select-none cursor-pointer transition-all ${date !== undefined ? "hover:bg-[var(--primary-color-500)]" : "" } hover:text-white p-2 ${ind === 0 && date !== undefined ? "text-red-500 hover:bg-red-500" : ""} ${dateToHighlight === userDate ? "bg-[var(--primary-color-500)] text-white" :"text-gray-900"}
                    `}
                    onClick={date ? () => onSelectDate(date) : () => {}}
                  >
                    {date === undefined ? null : new Date(date).getDate()}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  const openCalendar = () => setShowCalendar(true);
  const closeCalendar = () => {
    setShowCalendar(false);
    if (value) {
      setMonthToDisplay(new Date(value));
    } else {
      setMonthToDisplay(new Date());
    }
  };

  const onSelectDate = (date: Date | number) => {
    onDateChange && onDateChange(new Date(date));
    setMonthToDisplay(new Date(date))
  };

  return (
    <OutsideClickHandler onOutsideClick={closeCalendar}>
      <div
        className={mergeClassNames(
          classes.datepicker_container,
          isDisabled && classes.datepicker_disabled,
          error && classes.datepicker_error
        )}
        {...rest}
        onClick={openCalendar}
      >
        <div className={mergeClassNames(classes.datepicker_main)}>
          <input
            className={mergeClassNames(
              classes.datepicker,
              datepickerSizes[size || "md"]
            )}
            spellCheck={false}
            disabled={isDisabled}
            type="text"
            readOnly
            value={`${monthToDisplay.getDate()}/${monthToDisplay.getMonth() + 1}/${monthToDisplay.getFullYear()}`}
          />
        </div>
        {/* end icon */}

        <div className={mergeClassNames(classes.datepicker_end)}>
          <span
            className={mergeClassNames(
              classes.datepicker_icon,
              isDisabled && classes.datepicker_icon__disabled
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M19 19H5V8h14m-3-7v2H8V1H6v2H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-1V1m-1 11h-5v5h5v-5Z"
              />
            </svg>
          </span>
        </div>
      </div>
      {showCalendar && renderCalendar()}
    </OutsideClickHandler>
  );
};

DatePicker.defaultProps = DatePickerProps;

export default DatePicker;
