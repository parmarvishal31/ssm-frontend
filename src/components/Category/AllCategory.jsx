import { Divider, Space, Switch, Table, Tag } from "antd";
import Search from "antd/es/transfer/search";
import { EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { getAllCategories } from "../../api/categories";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allCategory } from "../../redux/categorySlice";
function AllCategory() {
  const [search, setSearch] = useState({ q: "" });
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category.category);
  const token = localStorage.getItem("token");

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
      key: "3",
      title: "TOTAL",
      dataIndex: "total",
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
            <Link to={`/detail-category/${record._id}`}>
              <div className="cursor-pointer">
                <EditOutlined />
              </div>
            </Link>
          </>
        );
      },
    },
  ];

  async function fetchProductCategory() {
    try {
      const res = await getAllCategories(token, search);
      dispatch(allCategory(res.data));
    } catch (error) {
      console.log("error: ", error);
    }
  }

  useEffect(() => {
    fetchProductCategory();
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
          total: category.totalItems,
        }}
        dataSource={category.data}
      />
    </>
  );
}

export default AllCategory;
