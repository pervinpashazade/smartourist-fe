import { Button, Col, Divider, Modal, Row, Steps } from "antd";
import { useState } from "react";
import { Step1 } from "./Steps/Step1";
import { Step2 } from "./Steps/Step2";
import { Step3 } from "./Steps/Step3";

const BookingCreate = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => prev + 1);
  const prev = () => setCurrent((prev) => prev - 1);

  const STEPS = [
    { component: <Step1 /> },
    { component: <Step2 /> },
    { component: <Step3 /> },
  ];

  return (
    <Modal
      open
      centered
      // onOk={() => setOpen(false)}
      // onCancel={() => setOpen(false)}
      className="full-screen-modal"
      footer={[
        // <Button key="back" onClick={() => {}}>
        //   Return
        // </Button>,
        // <Button
        //   key="submit"
        //   type="primary"
        //   // loading={loading}
        //   // onClick={handleOk}
        // >
        //   Submit
        // </Button>,
        <div style={{ marginTop: 16 }}>
          <Divider />
          {current > 0 && (
            <Button onClick={prev} style={{ marginRight: 8 }}>
              Previous
            </Button>
          )}
          {current < STEPS.length - 1 ? (
            <Button type="primary" onClick={next}>
              Next
            </Button>
          ) : (
            <Button type="primary" onClick={() => console.log("Finish")}>
              Finish
            </Button>
          )}
        </div>,
      ]}
    >
      <div>
        <Steps progressDot current={current} items={[{}, {}, {}]} />

        <Row>
          <Col span={18}>
            {" "}
            <div style={{ marginTop: 24 }}>{STEPS[current].component}</div>
          </Col>
          <Col span={6}>
            <h1>Summary</h1>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default BookingCreate;
