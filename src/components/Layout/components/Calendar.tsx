import "./index.scss";

import React from "react";
import dayjs from "dayjs";

import "dayjs/locale/zh-cn";

import { Calendar, Select } from "antd";
import type { CalendarProps } from "antd";
import type { Dayjs } from "dayjs";
import dayLocaleData from "dayjs/plugin/localeData";

dayjs.extend(dayLocaleData);

interface IProps {}

export const SiderCalendar: React.FC<IProps> = ({}) => {
  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>["mode"]) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  return (
    <div>
      <Calendar
        fullscreen={false}
        rootClassName="pro-calendar"
        onPanelChange={onPanelChange}
        headerRender={({ value, onChange }) => {
          const start = 0;
          const end = 12;
          const monthOptions = [];

          let current = value.clone();
          const localeData = value.localeData();
          const months = [];
          for (let i = 0; i < 12; i++) {
            current = current.month(i);
            months.push(localeData.monthsShort(current));
          }

          for (let i = start; i < end; i++) {
            monthOptions.push(
              <Select.Option key={i} value={i} className="month-item">
                {months[i]}
              </Select.Option>
            );
          }

          const year = value.year();
          const month = value.month();
          const options = [];
          for (let i = year - 10; i < year + 10; i += 1) {
            options.push(
              <Select.Option key={i} value={i} className="year-item">
                {i}
              </Select.Option>
            );
          }
          return (
            <div className="pro-calendar--header">
              <Select
                size="small"
                popupMatchSelectWidth={false}
                className="my-year-select"
                value={year}
                onChange={(newYear) => {
                  const now = value.clone().year(newYear);
                  onChange(now);
                }}
              >
                {options}
              </Select>
              <Select
                size="small"
                popupMatchSelectWidth={false}
                value={month}
                onChange={(newMonth) => {
                  const now = value.clone().month(newMonth);
                  onChange(now);
                }}
              >
                {monthOptions}
              </Select>
            </div>
          );
        }}
      />
    </div>
  );
};
