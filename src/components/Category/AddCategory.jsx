import { Button, Divider, Form, Input, Space, Spin, Switch, Tabs } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { categorySchema } from "../../Schema/categorySchema";
import toast from "react-hot-toast";
import { createCategory, getCategorieById } from "../../api/categories";
import { useNavigate, useParams } from "react-router-dom";

function AddCategory() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const handleSwitch = (e) => {
    formik.values.status = e;
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      tag: "",
      max: "",
      status: false,
    },
    validationSchema: categorySchema,
    onSubmit: async (values) => {
      if (id) {
        console.log(values);
      } else {
        try {
          setIsLoading(true);
          const res = await createCategory(values, token);
          if (res?.data?.success) {
            toast.success(res.data.message);
            navigate("/all-category");
          }
        } catch (error) {
          toast.error(error.response.data.message);
        } finally {
          setIsLoading(false);
        }
      }
    },
  });

  const getSingleCategory = async () => {
    try {
      const res = await getCategorieById(id, token);
      if (res?.data?.success) {
        console.log("res: ", res);
        console.log(res?.data?.category);
        formik.setValues({ ...res?.data?.category });
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const deleteCategory = () => {};

  useEffect(() => {
    if (id) {
      getSingleCategory();
    }
  }, [id]);
  return (
    <>
      {isLoading && (
        <div className="spinner-overlay">
          <Spin size="large" />
        </div>
      )}
      <Form onFinish={formik.handleSubmit} layout="vertical">
        <header className="flex justify-end">
          <Space>
            <Button htmlType="submit" type="primary">
              {id ? "UPDATE" : "ADD"}
            </Button>
            <Button type="default">CANCLE</Button>
            <Button
              onChange={() => deleteCategory()}
              type="primary"
              danger
              ghost
            >
              Delete
            </Button>
          </Space>
        </header>
        <main>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane
              tab={
                <>
                  <span>
                    <InfoCircleOutlined /> Basic
                  </span>
                </>
              }
              className="mt-4"
              key={1}
            >
              <div className="flex flex-col gap-2">
                <Space className="flex gap-8">
                  <Form.Item label="Name">
                    <Input
                      name="name"
                      id="name"
                      placeholder="Enter category name"
                      className="h-7 w-72"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                    />
                    {formik.touched.name && formik.errors.name ? (
                      <p className="mt-2 text-sm text-red-600">
                        {formik.errors.name}
                      </p>
                    ) : null}
                  </Form.Item>
                </Space>
                <Space className="flex gap-8">
                  <Form.Item label="Tag">
                    <Input
                      name="tag"
                      id="tag"
                      placeholder="Enter category tag"
                      className="h-7 w-72"
                      onChange={formik.handleChange}
                      value={formik.values.tag}
                    />
                  </Form.Item>
                </Space>
                <Space className="flex gap-8">
                  <Form.Item label="Max Products">
                    <Input
                      name="max"
                      id="max"
                      type="number"
                      placeholder="Max products number"
                      className="h-7 w-72"
                      onChange={formik.handleChange}
                      value={formik.values.max}
                    />
                  </Form.Item>
                </Space>
                <Space className="flex gap-8">
                  <label htmlFor="">Status</label>
                  <Switch
                    name="status"
                    defaultChecked={false}
                    // checked={formik.values.status}
                    onChange={handleSwitch}
                  />
                </Space>
              </div>
              <Divider />
            </Tabs.TabPane>
          </Tabs>
        </main>
      </Form>
    </>
  );
}

export default AddCategory;
