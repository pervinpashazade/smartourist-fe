import "../index.scss";

import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Col,
  Descriptions,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  Spin,
  Tag,
} from "antd";
import type { DescriptionsProps, GetProps, SelectProps } from "antd";
import { ICustomer, IYacht } from "../../../../../app/models";
import axios from "../../../../../utils/axios";
import { debounce } from "lodash";
import { PlusOutlined } from "@ant-design/icons";

import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
import { DatePicker } from "antd/lib";

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;
const { Option } = Select;

const range = (start: number, end: number) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

const disabledDate: RangePickerProps["disabledDate"] = (current) => {
  // Can not select days before today and today
  return current && current < dayjs().endOf("day");
};

// const disabledDateTime = () => ({
//   disabledHours: () => range(0, 24).splice(4, 20),
//   disabledMinutes: () => range(30, 60),
//   disabledSeconds: () => [55, 56],
// });

const disabledRangeTime: RangePickerProps["disabledTime"] = (_, type) => {
  if (type === "start") {
    return {
      disabledHours: () => range(0, 60).splice(4, 20),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => [55, 56],
    };
  }
  return {
    disabledHours: () => range(0, 60).splice(20, 4),
    disabledMinutes: () => range(0, 31),
    disabledSeconds: () => [55, 56],
  };
};

export interface DebounceSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType | ValueType[]>, "options" | "children"> {
  fetchOptions: (search: string) => Promise<ValueType[]>;
  debounceTimeout?: number;
}

interface IProps {
  setProgress: React.Dispatch<React.SetStateAction<number>>;
}

export const Step1: React.FC<IProps> = ({ setProgress }) => {
  const [bookingForm] = Form.useForm();
  const [customerForm] = Form.useForm();

  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<ICustomer>();
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(false);
  const [isOpenCreateCustomer, setIsOpenCreateCustomer] = useState(false);

  const [yachts, setYachts] = useState<IYacht[]>([]);
  const [selectedYacht, setSelectedYacht] = useState<IYacht>();
  const [isLoadingYachts, setIsLoadingYachts] = useState(false);

  const [selectedDates] = useState<[string, string]>();

  const [selectedGuests, setSelectedGuests] = useState<number>();

  const customerDescriptionItems: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "ID",
      children: selectedCustomer?.id,
      span: 0.5,
    },
    {
      key: "2",
      label: "Fullname",
      children: selectedCustomer?.fullname || "-",
      span: 2,
    },
    {
      key: "3",
      label: "Phone",
      children: selectedCustomer?.phone || "-",
      span: 1.5,
    },
    {
      key: "4",
      label: "Category",
      span: 1,
      children: selectedCustomer?.category?.name ? (
        <Tag>{selectedCustomer?.category?.name}</Tag>
      ) : (
        "-"
      ),
    },
    {
      key: "5",
      label: "Email",
      children: selectedCustomer?.email || "-",
      span: 2,
    },
  ];

  const yachtDescriptionItems: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Hourly",
      children: "100 AED",
      span: 0.5,
    },
    {
      key: "2",
      label: "Daily",
      children: "500 AED",
      span: 0.5,
    },
    {
      key: "3",
      label: "Weekly",
      children: "2000 AED",
      span: 0.5,
    },
    {
      key: "4",
      label: "Monthly",
      children: "5000 AED",
      span: 0.5,
    },
  ];

  const handleSearchCustomer = useCallback(
    debounce(async (fullname: string) => {
      if (!fullname.trim()) return; // Prevent API call if input is empty

      try {
        setIsLoadingCustomers(true);
        const response = await axios.get<ICustomer[]>("/admin/customers", {
          params: {
            fullname,
            include: "category",
          },
        });

        const formattedCustomers = response.data.map((customer) => ({
          label: customer.fullname, // Ensure this field exists
          value: String(customer.id), // Convert to string for consistency
          ...customer, // Spread the rest of the customer
        }));

        setCustomers(formattedCustomers);
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setIsLoadingCustomers(false);
      }
    }, 800), // 800ms debounce delay
    []
  );

  const handleSearchYacht = useCallback(
    debounce(async (name?: string) => {
      try {
        setIsLoadingYachts(true);
        const response = await axios.get<IYacht[]>("/admin/yachts", {
          params: { name },
        });

        const formattedYachts = response.data.map((yacht) => ({
          label: yacht.name, // Ensure this field exists
          value: String(yacht.id), // Convert to string for consistency
          ...yacht, // Spread the rest of the yacht
        }));

        setYachts(formattedYachts);
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setIsLoadingYachts(false);
      }
    }, 800), // 800ms debounce delay
    []
  );

  const onCloseCreateCustomer = useCallback(() => {
    setIsOpenCreateCustomer(false);
  }, []);

  useEffect(() => {
    handleSearchYacht();
  }, []);

  const handleChangeProggress = useCallback(
    (operation: "increment" | "decrement") => {
      switch (operation) {
        case "increment":
          setProgress((prev) => {
            const newValue = prev + 100 / 4;
            return newValue > 100 ? 100 : newValue;
          });
          break;
        case "decrement":
          setProgress((prev) => {
            const newValue = prev - 100 / 4;
            return newValue < 0 ? 0 : newValue;
          });
          break;

        default:
          break;
      }
    },
    []
  );

  return (
    <>
      <Form form={bookingForm} variant="outlined" layout="vertical">
        <div className="booking-create__body--form">
          <Form.Item
            name="client"
            rules={[{ required: true, message: "This field is mandatory" }]}
            className="booking-create__body--form--item"
            label={
              <div>
                Client Details
                {!selectedCustomer && (
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => setIsOpenCreateCustomer(true)}
                  >
                    <PlusOutlined /> New
                  </Button>
                )}
              </div>
            }
          >
            <Select
              showSearch
              allowClear
              placeholder="Search a client"
              value={selectedCustomer}
              options={customers}
              loading={isLoadingCustomers}
              onSearch={handleSearchCustomer}
              notFoundContent={
                isLoadingCustomers ? <Spin size="small" /> : null
              }
              onChange={(value, option) => {
                setSelectedCustomer(option as ICustomer);
                if (value && !Boolean(selectedCustomer)) {
                  handleChangeProggress("increment");
                } else if (!value && Boolean(selectedCustomer)) {
                  handleChangeProggress("decrement");
                }
              }}
              filterOption={false} // Prevents Ant Design from filtering, using API results instead
              style={{ width: "100%" }}
            />
            {selectedCustomer && (
              <div
                style={{
                  marginTop: "1rem",
                }}
              >
                <Descriptions
                  layout="vertical"
                  items={customerDescriptionItems}
                  className="booking-create__body--client-description"
                />
              </div>
            )}
          </Form.Item>
        </div>

        <div className="booking-create__body--form">
          <Form.Item
            name="yacht"
            rules={[{ required: true, message: "Please input!" }]}
            label="Yacht Details"
            className="booking-create__body--form--item"
          >
            <Select
              showSearch
              placeholder="Search a yacht"
              value={selectedYacht}
              options={yachts}
              loading={isLoadingYachts}
              onSearch={handleSearchYacht}
              notFoundContent={
                isLoadingCustomers ? <Spin size="small" /> : null
              }
              onChange={(value, option) => {
                setSelectedYacht(option as IYacht);
                if (value && !Boolean(selectedYacht)) {
                  handleChangeProggress("increment");
                } else if (!value && Boolean(selectedYacht)) {
                  handleChangeProggress("decrement");
                }
              }}
              filterOption={false} // Prevents Ant Design from filtering, using API results instead
              style={{ width: "100%" }}
            />
            <div
              style={{
                marginTop: "1rem",
              }}
            >
              {selectedYacht && (
                <Descriptions
                  layout="vertical"
                  items={yachtDescriptionItems}
                  className="booking-create__body--client-description"
                />
              )}
            </div>
          </Form.Item>
        </div>

        <div className="booking-create__body--form">
          <Form.Item
            name="date"
            rules={[{ required: true, message: "Please input!" }]}
            label="Date"
            className="booking-create__body--form--item"
          >
            <RangePicker
              disabledDate={disabledDate}
              disabledTime={disabledRangeTime}
              disabled={!Boolean(selectedYacht)}
              style={{ width: "100%" }}
              showTime={{
                hideDisabledOptions: true,
                // defaultValue: [
                //   dayjs("00:00:00", "HH:mm:ss"),
                //   dayjs("11:59:59", "HH:mm:ss"),
                // ],
              }}
              format="DD-MM-YYYY HH:mm"
              onChange={(dates, _) => {
                if (dates && !Boolean(selectedDates)) {
                  handleChangeProggress("increment");
                } else if (!dates) {
                  handleChangeProggress("decrement");
                }
              }}
            />
          </Form.Item>

          <Form.Item
            label="Guests"
            name="guests"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Input
              min={1}
              type="number"
              style={{ width: "50%" }}
              placeholder="Number of guests"
              max={selectedYacht?.guest_limit}
              disabled={!Boolean(selectedYacht)}
              onChange={(e) => {
                const value = e.target.value;
                if (Number(value) > 0 && !Boolean(selectedGuests)) {
                  handleChangeProggress("increment");
                } else if (+value === 0) {
                  handleChangeProggress("decrement");
                }

                setSelectedGuests(+value || 0); // Update state if needed
              }}
            />
          </Form.Item>
        </div>
      </Form>

      <Drawer
        title="Create a new account"
        width={720}
        onClose={onCloseCreateCustomer}
        open={isOpenCreateCustomer}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onCloseCreateCustomer}>Cancel</Button>
            <Button onClick={onCloseCreateCustomer} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form form={customerForm} layout="vertical" variant="filled">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="fullname"
                label="Fullname"
                rules={[
                  { required: true, message: "Please enter client fullname" },
                ]}
              >
                <Input placeholder="Please enter client fullname" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="username"
                label="Username"
                rules={[
                  { required: true, message: "Please enter client username" },
                ]}
              >
                <Input placeholder="Please enter client username" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="Phone"
                rules={[
                  { required: true, message: "Please enter client phone" },
                ]}
              >
                <Input placeholder="Please enter client phone" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please enter client email" },
                ]}
              >
                <Input placeholder="Please enter client email" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: "Please enter account password" },
                ]}
              >
                <Input.Password placeholder="Please enter account password" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="confirm_password"
                label="Confirm password"
                rules={[
                  { required: true, message: "Please enter confirm password" },
                ]}
              >
                <Input.Password placeholder="Please enter confirm password" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="category"
                label="Category"
                rules={[
                  {
                    required: true,
                    message: "Please select a client category",
                  },
                ]}
              >
                <Select placeholder="Please select a client category">
                  <Option value="category1">Category 1</Option>
                  <Option value="category2">Category 2</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
