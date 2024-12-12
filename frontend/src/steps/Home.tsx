import React, { useState } from "react";
import { Toaster, toast } from "sonner";
import CsvLogo from "../assets/CsvLogo";
import Button from "../components/Button";
import CsvInput from "../components/CsvInput";
import { testData } from "../services/test";
import { uploadFile } from "../services/upload";
import { type Data, type Pagination } from "../types";
import { Search } from "./Search";

const APP_STATUS = {
  IDLE: "idle",
  ERROR: "error",
  READY_UPLOAD: "ready_upload",
  UPLOADIND: "uploading",
  READY_USAGE: "ready_usage",
} as const;

const BUTTON_TEXT = {
  [APP_STATUS.READY_UPLOAD]: "Upload file",
  [APP_STATUS.UPLOADIND]: "Uploading...",
} as const;

type AppStatusType = (typeof APP_STATUS)[keyof typeof APP_STATUS];

export const Home = () => {
  const [appStatus, setAppStatus] = useState<AppStatusType>(APP_STATUS.IDLE);
  const [data, setData] = useState<Data>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const [helloResponse, setHelloResponse] = useState<string | null>(null);

  const handleInputFetch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [file] = event.target.files ?? [];
    if (file) {
      setFile(file);
      setAppStatus(APP_STATUS.READY_UPLOAD);
    }
  };

  const resetToInitialState = () => {
    setAppStatus(APP_STATUS.IDLE);
    setData([]);
    setPagination(null);
    setFile(null);
    setHelloResponse(null);
  };

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (appStatus !== APP_STATUS.READY_UPLOAD || !file) {
      return;
    }
    setAppStatus(APP_STATUS.UPLOADIND);

    const [err, newData, newPagination] = await uploadFile(file);
    if (err) {
      setAppStatus(APP_STATUS.ERROR);
      toast.error(err.message);
      return;
    }

    setAppStatus(APP_STATUS.READY_USAGE);
    if (newData) {
      setData(newData);
      setPagination(newPagination || null);
      toast.success("File uploaded successfully");
    }
  };

  const handleHelloClick = async () => {
    try {
      const response = await testData();
      setHelloResponse(JSON.stringify(response, null, 2));
      toast.success("Hello endpoint called successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Error calling hello endpoint");
    }
  };

  const showButton =
    appStatus === APP_STATUS.READY_UPLOAD || appStatus === APP_STATUS.UPLOADIND;
  const showInput = appStatus !== APP_STATUS.READY_USAGE;

  return (
    <>
      <Toaster></Toaster>
      {showInput && (
        <>
          <CsvLogo width={150} height={150}></CsvLogo>
          <form onSubmit={handleSubmit}>
            <CsvInput
              appStatus={appStatus}
              handleInputFetch={handleInputFetch}
            ></CsvInput>

            {showButton && (
              <Button
                disabled={appStatus === APP_STATUS.UPLOADIND}
                variant="primary"
              >
                {BUTTON_TEXT[appStatus]}
              </Button>
            )}
          </form>
          <button onClick={handleHelloClick}>Call Hello Endpoint</button>

          {helloResponse && (
            <pre className="hello-response">{helloResponse}</pre>
          )}
        </>
      )}

      {appStatus === APP_STATUS.READY_USAGE && (
        <Search
          initialData={data}
          initialPagination={pagination}
          resetToInitialState={resetToInitialState}
        ></Search>
      )}
    </>
  );
};
