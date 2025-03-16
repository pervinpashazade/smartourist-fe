import { DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Card, Col, InputNumber, List, Row, Typography } from "antd";

const { Title, Text } = Typography;

export const BookingSummary = () => {
  return (
    <Card
      title={
        <Title level={3}>
          <ShoppingCartOutlined /> Shopping Cart
        </Title>
      }
      style={{ maxWidth: 400, margin: "auto" }}
    >
      <List
        dataSource={[]}
        renderItem={(_) => (
          <List.Item
            actions={[
              <InputNumber
                min={1}
                // value={item.quantity}
                // onChange={(value) => updateQuantity(item.id, value || 1)}
              />,
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                // onClick={() => removeItem(item.id)}
              />,
            ]}
          >
            <List.Item.Meta
              title={"item.name"}
              description={`$${"item.price"}`}
            />
            {/* <Text strong>${"item.price" * "item.quantity"}</Text> */}
            <Text strong>$600</Text>
          </List.Item>
        )}
      />

      <Row justify="space-between" style={{ marginTop: 16 }}>
        <Col>
          <Text>Total:</Text>
        </Col>
        <Col>
          <Title level={4}>${0}</Title>
        </Col>
      </Row>

      <Button
        type="primary"
        block
        // onClick={() => message.success("Proceeding to checkout...")}
        // disabled={!cart.length}
      >
        Checkout
      </Button>
    </Card>
  );
};
