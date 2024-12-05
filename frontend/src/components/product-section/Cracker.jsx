import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Cracker.css";
import Footer from "../../components/footer/Footer";
import { getProducts } from "../../actions/productActions";
import Loader from "../Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MetaData from "../../Pages/Home/MetaData";
import Pagination from "react-js-pagination";
import Product from "../../Pages/products/Product";
import Search from "../search";

const Cracker = () => {
  const dispatch = useDispatch();
  const { products, loading, error, productsCount, resPerPage } = useSelector(
    (state) => state.productsState
  );
  const [currentPage, setCurrentPage] = useState(1);
  console.log(currentPage);
  const setCurrentPageNo = (pageNo) => {
    setCurrentPage(pageNo);
  };
  useEffect(() => {
    if (error) {
      return toast.error(error);
    } else {
      dispatch(getProducts(null,null,currentPage));
    }
  }, [error, dispatch, currentPage]);

  return (
    <div>
      <MetaData title={"Crackers"} />
      <div className="cracker-display" id="cracker-diplay">
        <h2>All Type Of Crackers</h2>
        <Search/>
                <Fragment>
          {loading ? (
            <Loader />
          ) : (
            <div className="cracker-display-list">
              {products &&
                products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
            </div>
          )}
        </Fragment>
        {/* <div className="view-all">
        <button onClick={()=>navigate('/products')}>View All Crackers</button>
        </div> */}
        {productsCount > 0 && productsCount > resPerPage ? (
          <div className="d-flex justify-content-center mt-5">
            <Pagination
              activePage={currentPage}
              onChange={(pageNo) => {
                setCurrentPageNo(pageNo); // Only set it once
              }}
              totalItemsCount={productsCount}
              itemsCountPerPage={resPerPage}
              nextPageText={"Next"}
              lastPageText={"Last"}
              firstPageText={"First"}
              itemClass={"page-item"}
              linkClass={"page-link"}
            />
          </div>
        ) : null}
      </div>

      <Footer />
    </div>
  );
};

export default Cracker;
