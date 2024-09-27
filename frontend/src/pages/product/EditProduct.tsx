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
  Select,
  InputNumber,
  Upload,
  UploadFile,
  GetProp,
  UploadProps,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { GetConcert, GetProductById, UpdateProduct } from "../../services/https";
import { ConcertInterface, ProductInterface } from "../../interfaces/IProduct";
import ImgCrop from "antd-img-crop";
const { Option } = Select;

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

function CustomerEdit() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  // const [fileList2, setFileList2] = useState<UploadFile[]>([]);

  const [list_concerts, setConcert] = useState<ConcertInterface[]>([]);
  const [product, setProduct] = useState<ProductInterface>();


  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    // setFileList2(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  // รับข้อมูลจาก params
  let { id } = useParams();
  // อ้างอิง form กรอกข้อมูล
  const [form] = Form.useForm();

  const onFinish = async (values: ProductInterface) => {
    console.log("Form values: ", values);
    values.ID = product?.ID;
    let res = await UpdateProduct(values);
    if (res) {
      messageApi.open({
        type: "success",
        content: res.message,
      });
      // setTimeout(function () {
      //   navigate("/product/list_product");
      // }, 2000);
    } else {
      messageApi.open({
        type: "error",
        content: res.message,
      });
    }
  };

  const getConcert = async () => {
    let res = await GetConcert();
    if (res) {
      setConcert(res);
    }
  };

  const getProductById = async () => {
    let res = await GetProductById(Number(id));
    if (res) {
      setProduct(res);
      // set form ข้อมูลเริ่มของผู่้ใช้ที่เราแก้ไข
      form.setFieldsValue({
        product_name: res.product_name,
        Stock: res.stock,
        Price: res.price,
        Picture: res.picture,
        ConcertID: res.ConcertID,
      });
    }
  };

  useEffect(() => {
    getConcert();
    getProductById();
  }, []);

  return (
    <div>
      {contextHolder}
      <Card>
        <h2> แก้ไขข้อมูลสินค้า</h2>
        <Divider />
        <Form
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="ชื่อสินค้า"
                name="product_name"
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
                label="จำนวน"
                name="Stock"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอจำนวน !",
                  },
                ]}
              >
                <InputNumber min={1} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="ราคาต่อชิ้น"
                name="Price"
                rules={[
                  {
                    required: true,
                    message: "กรุณาระบุราคาต่อชิ้น !",
                  },
                ]}
              >
                <InputNumber min={0} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                name="ConcertID"
                label="ชื่อคอน"
                rules={[{ required: true, message: "กรุณากเลือกชื่อ !" }]}
              >
                <Select allowClear>
                  {list_concerts.map((item) => (
                    <Option value={item.ID} key={item.Name}>
                      {item.Name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item
                label="รูปสินค้าที่ระลึก"
                name="Picture"
              // valuePropName="fileList"
              >

                <Upload
                  fileList={fileList}
                  onChange={onChange}
                  onPreview={onPreview}
                  beforeUpload={(file) => {
                    setFileList([...fileList, file]);
                    return false;
                  }}
                  maxCount={1}
                  multiple={false}
                  listType="picture-card"
                >
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>อัพโหลด</div>
                  </div>
                </Upload>

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