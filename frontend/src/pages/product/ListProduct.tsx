// import React, { useState, useEffect } from "react";
// import { Space, Table, Button, Col, Row, Divider, Modal, message } from "antd";
// import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
// import type { ColumnsType } from "antd/es/table";
// import { Link, useNavigate } from "react-router-dom";
// import dayjs from "dayjs";
// import { ProductInterface } from "../../interfaces/IProduct";
// import { DeleteProductByID, GetProduct } from "../../services/https";

// function ListProduct() {
//   const columns: ColumnsType<ProductInterface> = [
//     {
//       title: "ลำดับ",
//       dataIndex: "ID",
//       key: "id",
//     },
//     {
//       title: "รูปสินค้า",
//       dataIndex: "Picture",
//       key: "picture",
//       width: "15%",
//       render: (text, record, index) => (
//         <img src={record.Picture} className="w3-left w3-circle w3-margin-right" width="100%" />
//       )
//     },
//     {
//       title: "ชื่อสินค้า",
//       dataIndex: "ProductName",
//       key: "productName",
//     },
//     {
//       title: "จำนวนวนสินค้า",
//       dataIndex: "Stock",
//       key: "stock",
//     },
//     // {
//     //   title: "เพศ",
//     //   dataIndex: "Gender",
//     //   key: "gender",
//     //   render: (item) => Object.values(item.Name),
//     // },
//     {
//       title: "ราคาต่อชิ้น",
//       dataIndex: "Price",
//       key: "price",
//     },
//     // {
//     //   title: "วันเกิด",
//     //   dataIndex: "BirthDay",
//     //   key: "birthday",
//     //   render: (record) => <p>{dayjs(record).format("dddd DD MMM YYYY")}</p>,
//     // },
//     {
//       title: "จัดการ",
//       dataIndex: "Manage",
//       key: "manage",
//       render: (text, record, index) => (
//         <>
//           <Button
//             onClick={() => navigate(`/customer/edit/${record.ID}`)}
//             shape="circle"
//             icon={<EditOutlined />}
//             size={"large"}
//           />
//           <Button
//             onClick={() => showModal(record)}
//             style={{ marginLeft: 10 }}
//             shape="circle"
//             icon={<DeleteOutlined />}
//             size={"large"}
//             danger
//           />
//         </>
//       ),
//     },
//   ];

//   const navigate = useNavigate();

  

//   const [messageApi, contextHolder] = message.useMessage();

//   // Model
//   const [open, setOpen] = useState(false);
//   const [confirmLoading, setConfirmLoading] = useState(false);
//   const [modalText, setModalText] = useState<String>();
//   const [deleteId, setDeleteId] = useState<Number>();

//   const [product, setProducts] = useState<ProductInterface[]>([]);

  

//   const getProducts = async () => {
//     let res = await GetProduct();
//     if (res) {
//       setProducts(res);
//     }
//   };

//   const showModal = (val: ProductInterface) => {
//     setModalText(
//       `คุณต้องการลบข้อมูล "${val.ProductName} " หรือไม่ ?`
//     );
//     setDeleteId(val.ID);
//     setOpen(true);
//   };

//   const handleOk = async () => {
//     setConfirmLoading(true);
//     let res = await DeleteProductByID(deleteId);
//     if (res) {
//       setOpen(false);
//       messageApi.open({
//         type: "success",
//         content: "ลบข้อมูลสำเร็จ",
//       });
//       getProducts();
//     } else {
//       setOpen(false);
//       messageApi.open({
//         type: "error",
//         content: "เกิดข้อผิดพลาด !",
//       });
//     }
//     setConfirmLoading(false);
//   };

//   const handleCancel = () => {
//     setOpen(false);
//   };

//   useEffect(() => {
//     getProducts();
//   }, []);

//   return (
//     <>
//       {contextHolder}
//       <Row>
//         <Col span={10}>
//           <h2>จัดการข้อมูลสมาชิก</h2>
//         </Col>
//         <Col span={12} style={{ textAlign: "end", alignSelf: "center" }}>
//           <Space>
//             <Link to="/product/create_product">
//               <Button type="primary" icon={<PlusOutlined />}>
//                 สร้างข้อมูล
//               </Button>
//             </Link>
//           </Space>
//         </Col>
//       </Row>
//       <Divider />
//       <div style={{ marginTop: 20 }}>
//         <Table rowKey="ID" columns={columns} dataSource={product} />
//         <Table rowKey="ID" columns={columns}  />
//       </div>
//       <Modal
//         title="ลบข้อมูล ?"
//         open={open}
//         onOk={handleOk}
//         confirmLoading={confirmLoading}
//         onCancel={handleCancel}
//       >
//         <p>{modalText}</p>
//       </Modal>
//     </>
//   );
// }

// export default ListProduct;
import { useState, useEffect } from "react";
import { Space, Table, Button, Col, Row, Divider, Modal, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { Link, useNavigate } from "react-router-dom";
import { ProductInterface } from "../../interfaces/IProduct";
import { DeleteProductByID, GetProduct } from "../../services/https";

function ListProduct() {
  const columns: ColumnsType<ProductInterface> = [
    {
      title: "ลำดับ",
      dataIndex: "ID",
      key: "id",
    },
    {
      title: "รูปสินค้า",
      dataIndex: "picture",
      key: "picture",
      width: "15%",
      render: (text, record) => (
        <img src={record.Picture} alt={record.ProductName} className="w3-left w3-circle w3-margin-right" width="100%" />
      ),
    },
    {
      title: "ชื่อสินค้า",
      dataIndex: "product_name",
      key: "product_name",
    },
    {
      title: "จำนวนสินค้า",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "ราคาต่อชิ้น",
      dataIndex: "price",
      key: "price",
      render: (text) => <span>{text} บาท</span>,  // ปรับรูปแบบการแสดงผลราคา
    },
    {
      title: "คอน",
      dataIndex: "Name",
      key: "name",
    },
    {
      title: "จัดการ",
      dataIndex: "Manage",
      key: "manage",
      render: (text, record) => (
        <>
          <Button
            onClick={() => navigate(`/product/edit_product/${record.ID}`)}
            shape="circle"
            icon={<EditOutlined />}
            size={"large"}
          />
          <Button
            onClick={() => showModal(record)}
            style={{ marginLeft: 10 }}
            shape="circle"
            icon={<DeleteOutlined />}
            size={"large"}
            danger
          />
        </>
      ),
    },
  ];

  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  // Modal State
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState<string>();
  const [deleteId, setDeleteId] = useState<number>();
  const [product, setProducts] = useState<ProductInterface[]>([]);

  const getProducts = async () => {
    const res = await GetProduct();
    if (res) {
      setProducts(res);
    }
  };

  const showModal = (val: ProductInterface) => {
    setModalText(`คุณต้องการลบข้อมูล หรือไม่ ?`);
    setDeleteId(val.ID);
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    const res = await DeleteProductByID(deleteId);
    if (res) {
      setOpen(false);
      messageApi.open({
        type: "success",
        content: "ลบข้อมูลสำเร็จ",
      });
      getProducts();
    } else {
      setOpen(false);
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาด !",
      });
    }
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      {contextHolder}
      <Row>
        <Col span={10}>
          <h2>จัดการข้อมูลสินค้า</h2>
        </Col>
        <Col span={12} style={{ textAlign: "end", alignSelf: "center" }}>
          <Space>
            <Link to="/product/create_product">
              <Button type="primary" icon={<PlusOutlined />}>
                สร้างข้อมูล
              </Button>
            </Link>
          </Space>
        </Col>
      </Row>
      <Divider />
      <div style={{ marginTop: 20 }}>
        <Table rowKey="ID" columns={columns} dataSource={product} />
      </div>
      <Modal
        title="ลบข้อมูล ?"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </>
  );
}

export default ListProduct;
