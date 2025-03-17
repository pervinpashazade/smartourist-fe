import React from "react";
import { Card, Checkbox, CheckboxProps, Descriptions, Table } from "antd";

interface IAddon {
  name: string;
  quantity: number;
  price: number;
}

interface IBookingSummaryProps {
  yachtName: string;
  guestsCount: number;
  fromDate: string;
  toDate: string;
  addons: IAddon[];
  subtotal: number;
  bankFee: number;
  vat: number;
  total: number;
}

export const BookingSummary: React.FC<IBookingSummaryProps> = ({
  yachtName,
  guestsCount,
  fromDate,
  toDate,
  addons,
  subtotal,
  bankFee,
  vat,
  total,
}) => {
  const addonColumns = [
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity: number) => `${quantity}x`,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => (
        <div style={{ textAlign: "right" }}>{`AED ${price.toFixed(2)}`}</div>
      ),
    },
  ];

  const onChangeDeposit: CheckboxProps["onChange"] = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <div className="booking-create__summary">
      <Card className="booking-create__summary__card">
        <div>
          <Descriptions column={1} className="yacht-description" size="small">
            <Descriptions.Item label="Yacht">{yachtName}</Descriptions.Item>
            <Descriptions.Item label="Guests">{guestsCount}</Descriptions.Item>
            <Descriptions.Item label="From Date">{fromDate}</Descriptions.Item>
            <Descriptions.Item label="To Date">{toDate}</Descriptions.Item>
          </Descriptions>
        </div>
        {/* Addons Table */}
        {addons.length > 0 && (
          <>
            <Table
              columns={addonColumns}
              dataSource={addons}
              pagination={false}
              rowKey="name"
              onHeaderRow={() => ({ style: { display: "none" } })}
              size="small"
            />
          </>
        )}
        {/* Pricing Summary */}
        <Descriptions
          column={1}
          style={{ marginTop: "1rem", marginBottom: "1rem" }}
        >
          <Descriptions.Item label="Subtotal">
            AED {subtotal.toFixed(2)}
          </Descriptions.Item>
          <Descriptions.Item label="Bank Fee">
            AED {bankFee.toFixed(2)}
          </Descriptions.Item>
          <Descriptions.Item label="VAT">
            AED {vat.toFixed(2)}
          </Descriptions.Item>
          <Descriptions.Item label="Total">
            <strong>AED {total.toFixed(2)}</strong>
          </Descriptions.Item>
        </Descriptions>
        <Checkbox onChange={onChangeDeposit} style={{ marginTop: ".5rem" }}>
          50% deposit payment
        </Checkbox>
      </Card>
    </div>
  );
};
