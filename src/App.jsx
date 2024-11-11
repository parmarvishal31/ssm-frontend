import { useEffect } from "react";
import { getAllCategories } from "./api/categories";
import { allCategory } from "./redux/categorySlice";
import Layout from "./routes";
import { useDispatch } from "react-redux";
function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  async function fetchProductCategory() {
    try {
      const res = await getAllCategories(token);
      dispatch(allCategory(res.data));
    } catch (error) {
      console.log("error: ", error);
    }
  }

  useEffect(() => {
    fetchProductCategory();
  }, []);
  return (
    <>
      <Layout />
    </>
  );
}

export default App;
