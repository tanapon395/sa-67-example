import { useState, useEffect } from "react";
import {
  Space,
  Button,
  Col,
  Row,
  Divider,
  Form,
  Input,
  Card,
  message,
  DatePicker,
  Select,
} from "antd";
import dayjs from "dayjs";
import { PlusOutlined } from "@ant-design/icons";
import { UsersInterface } from "../../../interfaces/IUser";
import { GendersInterface } from "../../../interfaces/IGender";
import { GetGenders, GetUserById, UpdateUser } from "../../../services/https";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

function CustomerEdit() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const [user, setUser] = useState<UsersInterface>();
  const [genders, setGenders] = useState<GendersInterface[]>([]);

  // รับข้อมูลจาก params
  let { id } = useParams();
  // อ้างอิง form กรอกข้อมูล
  const [form] = Form.useForm();

  const onFinish = async (values: UsersInterface) => {
    values.ID = user?.ID;
    let res = await UpdateUser(values);
    if (res.status) {
      messageApi.open({
        type: "success",
        content: res.message,
      });
      setTimeout(function () {
        navigate("/customer");
      }, 2000);
    } else {
      messageApi.open({
        type: "error",
        content: res.message,
      });
    }
  };

  const getGendet = async () => {
    let res = await GetGenders();
    if (res.status) {
      setGenders(res.data);
    }
  };

  const getUserById = async () => {
    let res = await GetUserById(Number(id));
    if (res.status) {
      setUser(res.data);
      // set form ข้อมูลเริ่มของผู่้ใช้ที่เราแก้ไข
      form.setFieldsValue({
        StudentID: res.data.StudentID,
        FirstName: res.data.FirstName,
        LastName: res.data.LastName,
        GenderID: res.data.GenderID,
        Email: res.data.Email,
        Phone: res.data.Phone,
        LinkedIn: res.data.LinkedIn,
        BirthDay: dayjs(res.data.BirthDay),
      });
    }
  };

  useEffect(() => {
    getGendet();
    getUserById();
  }, []);

  return (
    <div>
      {contextHolder}
      <Card>
        <h2> แก้ไขข้อมูล ผู้ดูแลระบบ</h2>
        <Divider />
        <Form
          name="basic"
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="ชื่อจริง"
                name="FirstName"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกชื่อ !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="นามกสุล"
                name="LastName"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกนามสกุล !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="รหัสนักศึกษา"
                name="StudentID"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกรหัสนักศึกษา !",
                  },
                  {
                    pattern: /^[BMD][0-9]{7}$/,
                    message: "ID must start with 'BMD' followed by exactly 7 digits!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                name="GenderID"
                label="เพศ"
                rules={[{ required: true, message: "กรุณาระบุเพศ !" }]}
              >
                <Select allowClear>
                  {genders.map((item) => (
                    <Option value={item.ID} key={item.Name}>
                      {item.Name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="เบอร์โทรศัพท์"
                name="Phone"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกเบอร์โทรศัพท์ !",
                  },
                  {
                    pattern: /^[0]\d{9}$/,
                    message: "Phone number must be exactly 10 digits and start with '0'!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="LinkedIn"
                name="LinkedIn"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอก LinkedIn Profile URL !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="อีเมล"
                name="Email"
                rules={[
                  {
                    type: "email",
                    message: "รูปแบบอีเมลไม่ถูกต้อง !",
                  },
                  {
                    required: true,
                    message: "กรุณากรอกอีเมล !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="วัน/เดือน/ปี เกิด"
                name="BirthDay"
                rules={[
                  {
                    required: true,
                    message: "กรุณาเลือกวันเกิด !",
                  },
                ]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Row justify="end">
            <Col style={{ marginTop: "40px" }}>
              <Form.Item>
                <Space>
                  <Button htmlType="button" style={{ marginRight: "10px" }}>
                    ยกเลิก
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<PlusOutlined />}
                  >
                    ยืนยัน
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
}

export default CustomerEdit;
