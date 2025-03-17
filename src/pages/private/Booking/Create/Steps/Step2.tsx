import "../index.scss";

import { Button, Form, Input, Select, Space, Tag, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { IAddon } from "../../../../../app/models";
import axios from "../../../../../utils/axios";

const { Text } = Typography;
const { Option } = Select;

export const Step2: React.FC = () => {
  const [form] = Form.useForm();

  const [foodList, setFoodList] = React.useState<IAddon[]>([]);
  const [isLoadingFoods, setIsLoadingFoods] = useState(false);

  const [entertainmentList, setEntertainmentList] = useState<IAddon[]>([]);
  const [isLoadingEntertainment, setIsLoadingEntertainment] = useState(false);

  const [watersportList, setWatersportList] = useState<IAddon[]>([]);
  const [isLoadingWatersport, setIsLoadingWatersport] = useState(false);

  console.log("form", form.getFieldsValue());

  useEffect(() => {
    axios
      .get("/admin/addons", {
        params: {
          type: "food",
          per_page: 50,
        },
      })
      .then((response) => {
        setFoodList(response.data);
      })
      .finally(() => {
        setIsLoadingFoods(false);
      });

    axios
      .get("/admin/addons", {
        params: {
          type: "entertainment",
          per_page: 50,
        },
      })
      .then((response) => {
        setEntertainmentList(response.data);
      })
      .finally(() => {
        setIsLoadingEntertainment(false);
      });

    axios
      .get("/admin/addons", {
        params: {
          type: "watersport",
          per_page: 50,
        },
      })
      .then((response) => {
        setWatersportList(response.data);
      })
      .finally(() => {
        setIsLoadingWatersport(false);
      });
  }, []);

  return (
    <Form
      form={form}
      initialValues={{
        foods: [{ food: undefined, quantity: 1 }],
        entertainments: [{ entertainment: undefined, quantity: 1 }],
        watersports: [{ watersport: undefined, quantity: 1 }],
      }}
      variant="outlined"
      layout="vertical"
    >
      <div className="booking-create__body--form">
        <Text className="addon-title">Food</Text>
        <Form.List
          name="foods"
          rules={[
            {
              validator: async (_, addons) => {
                if (!addons || addons.length < 1) {
                  return Promise.reject(
                    new Error("At least 1 addon is required")
                  );
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }) => {
            // Get selected addons to hide them in other selects
            const selectedValues =
              form.getFieldValue("foods")?.map((item: any) => item?.food) || [];

            return (
              <>
                {fields.map((field) => (
                  <Space
                    key={field.key}
                    align="baseline"
                    className="addon-grid"
                  >
                    {/* Select Input */}
                    <Form.Item
                      {...field}
                      name={[field.name, "food"]}
                      rules={[{ required: true, message: "Select an addon" }]}
                    >
                      <Select
                        placeholder="Select addon"
                        loading={isLoadingFoods}
                      >
                        {foodList
                          .filter(
                            (option) => !selectedValues.includes(option.id)
                          )
                          .map((option) => (
                            <Option key={option.id} value={option.id}>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <div>{option.name}</div>
                                <div>
                                  <Tag>{option.price} AED</Tag>
                                </div>
                              </div>
                            </Option>
                          ))}
                      </Select>
                    </Form.Item>

                    {/* Quantity Control */}
                    <Form.Item name={[field.name, "quantity"]} initialValue={0}>
                      <div className="addon-counter">
                        <Button
                          disabled={
                            form.getFieldValue([
                              "foods",
                              field.name,
                              "quantity",
                            ]) < 2
                          }
                          onClick={() => {
                            const addons = form.getFieldValue("foods");
                            if (addons[field.name].quantity > 0) {
                              addons[field.name].quantity -= 1;
                              form.setFieldsValue({ foods: addons });
                            }
                          }}
                        >
                          -
                        </Button>
                        <Input
                          min={1}
                          defaultValue={1}
                          value={form.getFieldValue([
                            "foods",
                            field.name,
                            "quantity",
                          ])}
                          readOnly
                        />
                        <Button
                          onClick={() => {
                            const addons = form.getFieldValue("foods");
                            addons[field.name].quantity += 1;
                            form.setFieldsValue({ foods: addons });
                          }}
                        >
                          +
                        </Button>
                      </div>
                    </Form.Item>

                    {/* Remove Button (Only show if more than 1 select exists) */}
                    {fields.length > 1 && (
                      <Button
                        type="text"
                        onClick={() => remove(field.name)}
                        style={{ margin: "0 auto" }}
                      >
                        <MinusCircleOutlined />
                      </Button>
                    )}
                  </Space>
                ))}

                {/* Add New Addon Button */}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  >
                    Add New Addon
                  </Button>
                </Form.Item>
              </>
            );
          }}
        </Form.List>
      </div>

      <div className="booking-create__body--form">
        <Text className="addon-title">Entertainment</Text>
        <Form.List
          name="entertainments"
          rules={[
            {
              validator: async (_, addons) => {
                if (!addons || addons.length < 1) {
                  return Promise.reject(
                    new Error("At least 1 addon is required")
                  );
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }) => {
            // Get selected addons to hide them in other selects
            const selectedValues =
              form
                .getFieldValue("entertainments")
                ?.map((item: any) => item?.entertainment) || [];

            return (
              <>
                {fields.map((field) => (
                  <Space
                    key={field.key}
                    align="baseline"
                    className="addon-grid"
                  >
                    {/* Select Input */}
                    <Form.Item
                      {...field}
                      name={[field.name, "entertainment"]}
                      rules={[{ required: true, message: "Select an addon" }]}
                    >
                      <Select
                        placeholder="Select addon"
                        loading={isLoadingEntertainment}
                      >
                        {entertainmentList
                          .filter(
                            (option) => !selectedValues.includes(option.id)
                          )
                          .map((option) => (
                            <Option key={option.id} value={option.id}>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <div>{option.name}</div>
                                <div>
                                  <Tag>{option.price} AED</Tag>
                                </div>
                              </div>
                            </Option>
                          ))}
                      </Select>
                    </Form.Item>

                    {/* Quantity Control */}
                    <Form.Item name={[field.name, "quantity"]} initialValue={0}>
                      <div className="addon-counter">
                        <Button
                          disabled={
                            form.getFieldValue([
                              "entertainments",
                              field.name,
                              "quantity",
                            ]) < 2
                          }
                          onClick={() => {
                            const addons = form.getFieldValue("entertainments");
                            if (addons[field.name].quantity > 0) {
                              addons[field.name].quantity -= 1;
                              form.setFieldsValue({ entertainments: addons });
                            }
                          }}
                        >
                          -
                        </Button>
                        <Input
                          min={1}
                          defaultValue={1}
                          value={form.getFieldValue([
                            "entertainments",
                            field.name,
                            "quantity",
                          ])}
                          readOnly
                        />
                        <Button
                          onClick={() => {
                            const addons = form.getFieldValue("entertainments");
                            addons[field.name].quantity += 1;
                            form.setFieldsValue({ entertainments: addons });
                          }}
                        >
                          +
                        </Button>
                      </div>
                    </Form.Item>

                    {/* Remove Button (Only show if more than 1 select exists) */}
                    {fields.length > 1 && (
                      <Button
                        type="text"
                        onClick={() => remove(field.name)}
                        style={{ margin: "0 auto" }}
                      >
                        <MinusCircleOutlined />
                      </Button>
                    )}
                  </Space>
                ))}

                {/* Add New Addon Button */}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  >
                    Add New Addon
                  </Button>
                </Form.Item>
              </>
            );
          }}
        </Form.List>
      </div>

      <div className="booking-create__body--form">
        <Text className="addon-title">Watersport</Text>
        <Form.List
          name="watersports"
          rules={[
            {
              validator: async (_, watersports) => {
                if (!watersports || watersports.length < 1) {
                  return Promise.reject(
                    new Error("At least 1 addon is required")
                  );
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }) => {
            // Get selected addons to hide them in other selects
            const selectedValues =
              form
                .getFieldValue("watersports")
                ?.map((item: any) => item?.watersport) || [];

            return (
              <>
                {fields.map((field) => (
                  <Space
                    key={field.key}
                    align="baseline"
                    className="addon-grid"
                  >
                    {/* Select Input */}
                    <Form.Item
                      {...field}
                      name={[field.name, "watersports"]}
                      rules={[{ required: true, message: "Select an addon" }]}
                    >
                      <Select
                        placeholder="Select addon"
                        loading={isLoadingWatersport}
                      >
                        {watersportList
                          .filter(
                            (option) => !selectedValues.includes(option.id)
                          )
                          .map((option) => (
                            <Option key={option.id} value={option.id}>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <div>{option.name}</div>
                                <div>
                                  <Tag>{option.price} AED</Tag>
                                </div>
                              </div>
                            </Option>
                          ))}
                      </Select>
                    </Form.Item>

                    {/* Quantity Control */}
                    <Form.Item name={[field.name, "quantity"]} initialValue={0}>
                      <div className="addon-counter">
                        <Button
                          disabled={
                            form.getFieldValue([
                              "watersports",
                              field.name,
                              "quantity",
                            ]) < 2
                          }
                          onClick={() => {
                            const addons = form.getFieldValue("watersports");
                            if (addons[field.name].quantity > 0) {
                              addons[field.name].quantity -= 1;
                              form.setFieldsValue({ watersports: addons });
                            }
                          }}
                        >
                          -
                        </Button>
                        <Input
                          min={1}
                          defaultValue={1}
                          value={form.getFieldValue([
                            "watersports",
                            field.name,
                            "quantity",
                          ])}
                          readOnly
                        />
                        <Button
                          onClick={() => {
                            const addons = form.getFieldValue("watersports");
                            addons[field.name].quantity += 1;
                            form.setFieldsValue({ watersports: addons });
                          }}
                        >
                          +
                        </Button>
                      </div>
                    </Form.Item>

                    {/* Remove Button (Only show if more than 1 select exists) */}
                    {fields.length > 1 && (
                      <Button
                        type="text"
                        onClick={() => remove(field.name)}
                        style={{ margin: "0 auto" }}
                      >
                        <MinusCircleOutlined />
                      </Button>
                    )}
                  </Space>
                ))}

                {/* Add New Addon Button */}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  >
                    Add New Addon
                  </Button>
                </Form.Item>
              </>
            );
          }}
        </Form.List>
      </div>
    </Form>
  );
};
