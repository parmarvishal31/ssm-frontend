import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Radio,
  Row,
  Space,
  Spin,
  Switch,
  Tabs,
} from "antd";
import {
  InfoCircleOutlined,
  ShoppingOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { productSchema } from "../../Schema/productSchema";
import {
  createProduct,
  deleteProduct,
  getProductById,
  updateProduct,
} from "../../api/product";
import TextArea from "antd/es/input/TextArea";
import { useSelector } from "react-redux";

function AddProduct() {
  const category = useSelector((state) => state.category.category.data);
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { id } = useParams();

  const onChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSwitch = (e) => {
    formik.setFieldValue("status", e);
  };

  function getImage(event) {
    event.preventDefault();

    const uploadedImage = event.target.files[0];

    if (uploadedImage) {
      setImageFile(uploadedImage);
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setPreviewImage(this.result);
      });
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      category_id: "",
      img: "",
      status: false,
    },
    validationSchema: productSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("status", values.status);

      if (imageFile) {
        formData.append("img", imageFile);
      }
      if (selectedCategory) {
        formData.append("category_id", selectedCategory);
      }

      if (id) {
        try {
          const res = await updateProduct(formData, id, token);
          if (res?.data?.success) {
            toast.success(res.data.message);
            navigate("/all-product");
          }
        } catch (error) {
          toast.error(error.response.data.message);
        }
      } else {
        try {
          setIsLoading(true);
          const res = await createProduct(formData, token);
          if (res?.data?.success) {
            toast.success(res.data.message);
            navigate("/all-product");
          }
        } catch (error) {
          toast.error(error.response.data.message);
        } finally {
          setIsLoading(false);
        }
      }
    },
  });

  const getSingleProduct = async (id) => {
    try {
      const res = await getProductById(id, token);
      if (res?.data?.success) {
        formik.setValues({ ...res?.data?.product });
        setSelectedCategory(res?.data?.product.category);
      }
    } catch (error) {
      toast.error("product not found.");
    }
  };

  const delProduct = async () => {
    try {
      setIsLoading(true);
      const res = await deleteProduct(id, token);
      if (res?.data?.success) {
        toast.success(res.data.message || "Deleted.");
        navigate("/all-product");
      }
    } catch (error) {
      toast.error("product not delete.");
      navigate("/all-product");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/all-product");
  };

  useEffect(() => {
    if (id) {
      getSingleProduct(id);
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
            <Button onClick={() => handleCancel()} type="default">
              CANCEL
            </Button>
            {id && (
              <Button onClick={() => delProduct()} type="primary" danger ghost>
                Delete
              </Button>
            )}
          </Space>
        </header>
        <main>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane
              tab={
                <>
                  <InfoCircleOutlined /> Basic
                </>
              }
              className="mt-4"
              key="1"
            >
              <div className="flex flex-col gap-2">
                <Space className="flex gap-8">
                  <Form.Item label="Name">
                    <Input
                      name="name"
                      id="name"
                      placeholder="Enter product name"
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
                  <Form.Item label="description">
                    <TextArea
                      name="Description"
                      id="description"
                      placeholder="Enter product description"
                      className="h-7 w-72"
                      onChange={formik.handleChange}
                      value={formik.values.description}
                    />
                  </Form.Item>
                </Space>
                <Space className="flex gap-8">
                  <label htmlFor="">Status</label>
                  <Switch
                    name="status"
                    defaultChecked={formik.values.status}
                    checked={formik.values.status}
                    onChange={handleSwitch}
                  />
                </Space>
              </div>
              <Divider />
            </Tabs.TabPane>
            (
            <Tabs.TabPane
              disabled={!id}
              tab={
                <>
                  <ShoppingOutlined /> Category
                </>
              }
              key="2"
            >
              <Radio.Group onChange={onChange} value={selectedCategory}>
                <Row gutter={[16, 16]}>
                  {category?.map((item, idx) => (
                    <Col span={24} key={idx}>
                      <Radio value={item._id}>
                        {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                      </Radio>
                    </Col>
                  ))}
                </Row>
              </Radio.Group>
            </Tabs.TabPane>
            )
            <Tabs.TabPane
              tab={
                <>
                  <UploadOutlined /> Assets
                </>
              }
              key="3"
            >
              <div className="flex flex-col justify-start items-start gap-4">
                <label htmlFor="image_uploads" className="cursor-pointer">
                  {previewImage ? (
                    <div className="border-black border-2 rounded-md p-4">
                      <img
                        className="w-64 h-64 m-auto"
                        src={previewImage}
                        alt="previewImage"
                      />
                    </div>
                  ) : (
                    <div className="border-black border-2 rounded-md p-4">
                      {!id ? (
                        <div className="w-64 h-64 bg-gray-300 flex items-center justify-center text-black text-xl font-semibold">
                          Image
                        </div>
                      ) : (
                        <img src={formik.values.img.secure_url} alt="" />
                      )}
                    </div>
                  )}
                </label>
                <input
                  type="file"
                  className="hidden"
                  id="image_uploads"
                  name="image_uploads"
                  accept=".jpg, .jpeg, .png, .svg"
                  onChange={getImage}
                />
              </div>
            </Tabs.TabPane>
          </Tabs>
        </main>
      </Form>
    </>
  );
}

export default AddProduct;
