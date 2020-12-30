import React, { lazy, Suspense } from "react";
import { Loading } from "../control";

const UploadLoader = lazy(() =>
  import(/* webpackChunkName: "upload" */ "./Upload"),
);

export const Upload = (props) => {
  return (
    <Suspense fallback={<Loading />}>
      <UploadLoader {...props} />
    </Suspense>
  );
};

export * from "./HttpRequest";
export * from "./isMobile";
export * from "./Item";
export * from "./Loading";
export * from "./LoadingError";
