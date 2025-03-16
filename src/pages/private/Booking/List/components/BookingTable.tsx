import React, { useEffect, useState } from "react";
import {
  Table,
  Input,
  Select,
  Tag,
  DatePicker,
  TableProps,
  Space,
  Button,
} from "antd";
import { Link } from "react-router-dom";
import { EBookingStatus } from "../../../../../app/enums";
import {
  CaretRightOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DeleteRowOutlined,
  EnvironmentOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { useDebounce } from "../../../../../hooks";
import axios from "../../../../../utils/axios";
import { ColumnsType } from "antd/es/table";

const { RangePicker } = DatePicker;

const BOOKING_STATUS: {
  [key in EBookingStatus]: { label: string; color: string; icon?: any };
} = {
  [EBookingStatus.CREATED]: {
    label: "Created",
    color: "orange",
    icon: <ClockCircleOutlined />,
  },
  [EBookingStatus.PENDING_PAYMENT]: {
    label: "Pending Payment",
    color: "orange",
    icon: <ClockCircleOutlined />,
  },
  [EBookingStatus.PAYMENT_EXPIRED]: {
    label: "Payment Expired",
    color: "default",
    icon: <ExclamationCircleOutlined />,
  },
  [EBookingStatus.NOT_FULLY_PAID]: {
    label: "Not Fully Paid",
    color: "orange",
    icon: <WarningOutlined />,
  },
  [EBookingStatus.FULLY_PAID]: {
    label: "Fully Paid",
    color: "green",
    icon: <CheckCircleOutlined />,
  },
  [EBookingStatus.PAYMENT_FAILED]: {
    label: "Payment Failed",
    color: "red",
    icon: <StopOutlined />,
  },
  [EBookingStatus.NOT_ARRIVED]: {
    label: "Not Arrived",
    color: "default",
    icon: <DeleteRowOutlined />,
  },
  [EBookingStatus.ONBOARD]: {
    label: "Onboard",
    color: "blue",
    icon: <EnvironmentOutlined />,
  },
  [EBookingStatus.COMPLETED]: {
    label: "Completed",
    color: "green",
    icon: <CheckCircleOutlined />,
  },
  [EBookingStatus.CANCELLED]: {
    label: "Cancelled",
    color: "default",
    icon: <StopOutlined />,
  },
};

interface DataType {
  id: number;
  status: EBookingStatus;
  details: { fullname: string; yacht_name: string };
  from_date: string;
  to_date: string;
}

interface TableParams {
  page: number;
  per_page: number;
  total: number;
  id?: string;
  fullname?: string;
  status?: string;
  from_date?: string;
  to_date?: string;
}

const BookingTable: React.FC = () => {
  const [data, setData] = useState<DataType[]>();
  const [loading, setLoading] = useState(false);
  const [searchId, setSearchId] = useState<string>("");
  const debouncedSearchId = useDebounce(searchId, 700);
  const [searchFullname, setSearchFullname] = useState<string>("");
  const debouncedSearchFullname = useDebounce(searchFullname, 700);
  const [tableParams, setTableParams] = useState<TableParams>({
    page: 1,
    per_page: 10,
    total: 0,
  });

  const fetchData = () => {
    setLoading(true);
    axios
      .get<any, any>("/admin/bookings", {
        params: {
          ...tableParams,
          id: debouncedSearchId,
          fullname: debouncedSearchFullname,
        },
      })
      .then((res) => {
        setData(res.data);
        setLoading(false);
        setTableParams((prev) => ({
          ...prev,
          page: res.page,
          per_page: res.per_page,
          total: res.total_count,
        }));
      });
  };

  useEffect(fetchData, [
    tableParams.page,
    tableParams.per_page,
    debouncedSearchId,
    debouncedSearchFullname,
    tableParams.status,
    tableParams.from_date,
    tableParams.to_date,
  ]);

  const handleTableChange: TableProps<DataType>["onChange"] = (pagination) => {
    setTableParams({
      ...tableParams,
      page: pagination.current || 1,
      per_page: pagination.pageSize || 10,
    });
  };

  const onChangeSearchId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchId(e.target.value);
  };

  const onChangeSearchFullname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFullname(e.target.value);
  };

  const onChangeStatus = (value: string) => {
    setTableParams((prev) => ({
      ...prev,
      status: value,
      page: 1,
    }));
  };

  const onDateChange = (_: any, dateStrings: [string, string]) => {
    const [startDate, endDate] = dateStrings;
    if ((startDate && endDate) || (!startDate && !endDate)) {
      setTableParams((prev) => ({
        ...prev,
        from_date: startDate,
        to_date: endDate,
        page: 1,
      }));
    }
  };

  const setPresetDateRange = (range: "yesterday" | "today" | "tomorrow") => {
    const now = dayjs();
    let startDate = now;
    let endDate = now;

    if (range === "yesterday") {
      startDate = now.subtract(1, "day");
      endDate = now.subtract(1, "day");
    } else if (range === "today") {
      startDate = now;
      endDate = now;
    } else if (range === "tomorrow") {
      startDate = now.add(1, "day");
      endDate = now.add(1, "day");
    }

    setTableParams((prev) => ({
      ...prev,
      from_date: startDate.format("YYYY-MM-DD"),
      to_date: endDate.format("YYYY-MM-DD"),
      page: 1,
    }));
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "#",
      dataIndex: "id",
      render: (_, { id }) => <Link to={`/admin/bookings/${id}`}>{id}</Link>,
      width: "10%",
      filtered: Boolean(searchId),
      filterDropdown: () => (
        <Input
          placeholder="Search Booking ID"
          onChange={onChangeSearchId}
          allowClear
          style={{
            width: 165,
            margin: 8,
          }}
        />
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (_, record) => (
        <Tag
          icon={BOOKING_STATUS[record.status].icon}
          color={BOOKING_STATUS[record.status].color}
        >
          {BOOKING_STATUS[record.status].label}
        </Tag>
      ),
      filterDropdown: () => (
        <Select
          defaultValue={tableParams.status}
          onChange={onChangeStatus}
          style={{ width: 150, margin: 8 }}
          placeholder="Select a status"
        >
          <Select.Option value="">All</Select.Option>
          {Object.entries(BOOKING_STATUS).map(([key, { label }]) => (
            <Select.Option key={key} value={key}>
              {label}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Client",
      dataIndex: "details.fullname",
      render: (_, { details }) => details.fullname,
      filtered: Boolean(searchFullname),
      filterDropdown: () => (
        <Input
          placeholder="Search Fullname"
          onChange={onChangeSearchFullname}
          allowClear
          style={{
            width: 165,
            margin: 8,
          }}
        />
      ),
    },
    {
      title: "Yacht",
      dataIndex: "details.yacht_name",
      render: (_, { details }) => details.yacht_name,
    },
    {
      title: "Date",
      dataIndex: "from_date",
      render: (_, { from_date, to_date }) => (
        <span>
          {`${dayjs(from_date).format("MMM. DD - HH:mm")}`}
          &nbsp;
          <CaretRightOutlined />
          &nbsp;
          {`${dayjs(to_date).format("MMM. DD - HH:mm")}`}
        </span>
      ),
      filtered: Boolean(tableParams.from_date || tableParams.to_date),
      filterDropdown: () => (
        <div style={{ padding: 8 }}>
          <RangePicker
            value={[
              tableParams.from_date ? dayjs(tableParams.from_date) : undefined,
              tableParams.to_date ? dayjs(tableParams.to_date) : undefined,
            ]}
            onChange={onDateChange}
            style={{ marginBottom: 8, width: 320 }}
            placeholder={["Start Date", "End Date"]}
          />
          <Space
            style={{
              marginTop: 8,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button type="link" onClick={() => setPresetDateRange("yesterday")}>
              Yesterday
            </Button>
            <Button type="link" onClick={() => setPresetDateRange("today")}>
              Today
            </Button>
            <Button type="link" onClick={() => setPresetDateRange("tomorrow")}>
              Tomorrow
            </Button>
          </Space>
        </div>
      ),
    },
  ];

  return (
    <Table<DataType>
      columns={columns}
      rowKey={(record) => record.id}
      dataSource={data}
      pagination={{
        current: tableParams.page,
        pageSize: tableParams.per_page,
        total: tableParams.total,
      }}
      loading={loading}
      onChange={handleTableChange}
    />
  );
};

export default BookingTable;
