import { Button, Divider, Form, Input, Space, Spin, Switch, Tabs } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useFormik } from "formik";
import { useState } from "react";
import { categorySchema } from "../../Schema/categorySchema";
import toast from "react-hot-toast";
import { createCategory } from "../../api/categories";
import { useNavigate } from "react-router-dom";
function AddCategory() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
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
      console.log("values: ", values);
      try {
        setIsLoading(true);
        const res = await createCategory(values);
        if (res?.data?.success) {
          toast.success(res.data.message);
          navigate("/all-category");
        } else {
          console.log("run");
        }
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setIsLoading(false);
      }
    },
  });
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
              ADD
            </Button>
            <Button type="default">CANCLE</Button>
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
