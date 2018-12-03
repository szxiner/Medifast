import React, { Component } from "react";
import { Button, Form, Input, Radio, Row, Col } from "antd";
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 }
};

class InnerPaymentForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    console.log(getFieldDecorator);
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col span={10}>
              <FormItem label="First Name">
                {getFieldDecorator("first", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your First Name!"
                    }
                  ]
                })(<Input placeholder="First Name" />)}
              </FormItem>
            </Col>
            <Col span={2} />
            <Col span={10}>
              <FormItem label="Last Name">
                {getFieldDecorator("last", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your Last Name!"
                    }
                  ]
                })(<Input placeholder="Last Name" />)}
              </FormItem>
            </Col>
            <Col span={2} />
          </Row>
          <Row>
            <Col span={10}>
              <FormItem label="Billing Address">
                {getFieldDecorator("address", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your Street Address!"
                    }
                  ]
                })(<Input placeholder="542 W. 15th St" />)}
              </FormItem>
            </Col>
            <Col span={2} />
            <Col span={10}>
              <FormItem label="City">
                {getFieldDecorator("city", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your City!"
                    }
                  ]
                })(<Input placeholder="New York" />)}
              </FormItem>
            </Col>
            <Col span={2} />
          </Row>
          <Row>
            <Col span={10}>
              <FormItem label="State">
                {getFieldDecorator("state", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your state!"
                    }
                  ]
                })(<Input placeholder="NY" />)}
              </FormItem>
            </Col>
            <Col span={2} />
            <Col span={10}>
              <FormItem label="Zip Code">
                {getFieldDecorator("zip", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your zip code!"
                    }
                  ]
                })(<Input placeholder="10001" />)}
              </FormItem>
            </Col>
            <Col span={2} />
          </Row>
          <hr />
          <Row>
            <Col span={10}>
              <FormItem label="Name on Card">
                {getFieldDecorator("name", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your name on card!"
                    }
                  ]
                })(<Input placeholder="John Doe" />)}
              </FormItem>
            </Col>
            <Col span={2} />
            <Col span={10}>
              <br />
              <br />
              <Radio>Same as your name</Radio>
            </Col>
            <Col span={2} />
          </Row>
          <Row>
            <Col span={10}>
              <FormItem label="Card Number">
                {getFieldDecorator("card", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your card number!"
                    }
                  ]
                })(<Input placeholder="1111-2222-3333-4444" />)}
              </FormItem>
            </Col>
            <Col span={2} />
            <Col span={4}>
              <FormItem label="Expire date">
                {getFieldDecorator("date", {
                  rules: [
                    {
                      required: true,
                      message: "Please input the expire date!"
                    }
                  ]
                })(<Input placeholder="01/24" />)}
              </FormItem>
            </Col>
            <Col span={2} />
            <Col span={4}>
              <FormItem label="CVV">
                {getFieldDecorator("cvv", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your cvv number!"
                    }
                  ]
                })(<Input placeholder="123" />)}
              </FormItem>
            </Col>
            <Col span={2} />
          </Row>
          <br />
          <Row>
            <Col span={12} />
            <Col span={10}>
              <FormItem>
                <Button
                  style={{
                    width: "100%",
                    borderRadius: 22
                  }}
                  type="primary"
                  icon="credit-card"
                  htmlType="submit"
                >
                  Confirm Payment
                </Button>{" "}
              </FormItem>
            </Col>
            <Col span={2} />
          </Row>
        </Form>
      </div>
    );
  }
}

const PaymentForm = Form.create()(InnerPaymentForm);

export default PaymentForm;
