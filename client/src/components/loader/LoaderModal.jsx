import React from "react";
//import Loader from "react-loader";
import HashLoader from "react-spinners/HashLoader";
import { usePromiseTracker } from "react-promise-tracker";

import "./loader.css";

const LoaderModal = () => {
  const { promiseInProgress } = usePromiseTracker();

  return (
    promiseInProgress && (
      <div className="loader">
        <section className="loader-main">
          <HashLoader size={100} color={"#4A90E2"} loading={true} />
        </section>
      </div>
    )
  );
};
export default LoaderModal;
