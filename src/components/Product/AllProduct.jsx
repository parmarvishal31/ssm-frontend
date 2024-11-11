import { Divider, Space, Switch, Table, Tag } from "antd";
import Search from "antd/es/transfer/search";
import { EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../api/product";
import { allProduct } from "../../redux/productSlice";
function AllProduct() {
  const [search, setSearch] = useState({ q: "" });
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "_id",
    },
    {
      key: "2",
      title: "NAME",
      dataIndex: "name",
      render: (name) => name.charAt(0).toUpperCase() + name.slice(1),
    },
    {
      key: "4",
      title: "STATUS",
      dataIndex: "status",
      render: (status) => {
        return (
          <>
            <Tag color={status ? "Green" : "Red"}>
              {status ? "Active" : "Deactive"}
            </Tag>
          </>
        );
      },
    },
    {
      key: "5",
      title: "ACTION",
      render: (record) => {
        return (
          <>
            <Link to={`/detail-product/${record._id}`}>
              <div className="cursor-pointer">
                <EditOutlined />
              </div>
            </Link>
          </>
        );
      },
    },
  ];

  async function fetchProduct() {
    try {
      const res = await getAllProducts(search);
      dispatch(allProduct(res.data));
    } catch (error) {
      console.log("error: ", error);
    }
  }
  useEffect(() => {
    fetchProduct();
  }, [search]);
  return (
    <>
      <header className="bg-slate-50 shadow-sm border-2 rounded-md p-5">
        <Space className="flex justify-between">
          <Search
            onChange={(e) => setSearch({ ...search, q: e.target.value })}
            placeholder="search shop"
          />
          <div>
            Is Active : <Switch onChange={(e) => console.log(e)} />
          </div>
        </Space>
      </header>
      <Divider />
      <Table
        columns={columns}
        loading={false}
        bordered
        pagination={{
          pageSize: 5,
          total: product.product.totalItems,
        }}
        dataSource={product.product.data}
      />
    </>
  );
}

export default AllProduct;
