import ChangeListIcon from "@rsuite/icons/ChangeList";
import FileDownloadIcon from "@rsuite/icons/FileDownload";
import PlusRoundIcon from "@rsuite/icons/PlusRound";
import React, { useState } from "react";
import ReactDOMServer from "react-dom/server";
import { useRecoilState } from "recoil";
import { Button, IconButton, Loader, Modal } from "rsuite";
import Divider from "rsuite/Divider";
import { exportAddAtom } from "../../../Atoms/exportAdd.atom";
import { surveyStateAtom } from "../../../Atoms/surveyState.atom";
import ExportExcel from "./excelExport";

export default function ExportAdd({
  title,
  button,
  AddComponent,
  excelData,
  nameExcel,
  noExport,
  noimportExcel,
  save,
  noAdd,
  ActionOnClose,
  size,
  noServey,
  surveyButton,
  AddsurveyComponent,
  saveSurvey,
  uploadExcel,
  pdfDownload,
  pdfComponent,
}) {
  const [surveyState, setsurveyState] = useRecoilState(surveyStateAtom);

  const handleOpen = () =>
    setstate((prev) => {
      return { ...prev, open: true };
    });
  const handleSurveyOpen = () =>
    setsurveyState((prev) => {
      return { ...prev, open: true };
    });
  const [state, setstate] = useRecoilState(exportAddAtom);
  const handleClose = () =>
    setstate((prev) => {
      return { ...prev, open: false };
    });
  const handleSurveyClose = () =>
    setsurveyState((prev) => {
      return { ...prev, open: false };
    });
  const exportExcel = () => {
    document.querySelector("#hidden-btn-export").click();
  };

  /////////////////////////////////////////////////////////

  const pdfGenerator = () => {
    // const content = document.getElementById("div");
    const content = ReactDOMServer.renderToStaticMarkup(pdfComponent);

    const documentContent = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Notes</title>
        <style>
          body { font-family: Arial, sans-serif; -webkit-print-color-adjust: exact; 
      print-color-adjust: exact;  
       }
       @media print {
          @page {
            size: A4;        
            }
         
            }

      
        </style>
      </head>
      <body>
        ${content}
      </body>
    </html>
  `;

    // Create a hidden iframe to inject and download as a file
    const iframe = document.createElement("iframe");
    iframe.style.position = "absolute";
    iframe.style.width = "0px";
    iframe.style.height = "0px";
    iframe.style.border = "none";
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow.document;
    doc.open();

    doc.write(documentContent);
    doc.close();

    // Wait until the iframe content is loaded before triggering print
    iframe.onload = () => {
      // You could do any final checks here if needed, like checking if images are fully loaded inside iframe
      iframe.contentWindow.print();
      // Remove the iframe after printing
      iframe.remove();
    };
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "15px 0",
        zIndex: "1",
        maxWidth: "100vw",
      }}
    >
      {pdfDownload && (
        <div>
          <IconButton
            appearance="primary"
            color="red"
            icon={<FileDownloadIcon />}
            onClick={pdfGenerator}
          >
            Dowload Pdf
          </IconButton>
        </div>
      )}

      {!noimportExcel && (
        <IconButton appearance="primary" color="green" icon={<PlusRoundIcon />}>
          Ajouter Excel
          <div
            style={{
              position: "absolute",
              top: "0%",
              right: "0%",
              opacity: 0,
              height: "100%",
              width: "100%",
            }}
          >
            <input
              type="file"
              onChange={(v) => {
                uploadExcel(v.target.files[0]);
              }}
            />
          </div>
        </IconButton>
      )}
      {!noExport && (
        <Button color="green" onClick={exportExcel} appearance="primary">
          <ChangeListIcon /> Export
        </Button>
      )}
      <Divider vertical />
      {!noAdd && (
        <>
          {button && (
            <IconButton
              onClick={handleOpen}
              appearance="primary"
              icon={<PlusRoundIcon />}
            >
              Ajout
            </IconButton>
          )}

          <Modal
            size={size ? size : "calc(100% - 120px)"}
            overflow={false}
            style={{
              maxHeight: "calc(100vh - 50px)",
              overflow: "auto",
              maxWidth: "100vw",
            }}
            open={state.open}
            onClose={() => {
              handleClose();
              if (ActionOnClose) ActionOnClose();
            }}
          >
            <Modal.Header style={{}}>
              <Modal.Title
                style={{
                  display: "flex",
                  padding: 4,
                  justifyContent: "right",
                  fontSize: 20,
                }}
              >
                {!title ? "معلومات شخصية" : title}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div
                style={{
                  maxHeight: "calc(100vh - 240px)",
                  overflow: "auto",
                  maxWidth: "100vw",
                }}
              >
                {AddComponent}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={save} appearance="primary">
                {state.loading ? <Loader size="sm" /> : "Enregistrer"}
              </Button>
              <Button
                onClick={() => {
                  handleClose();
                  if (ActionOnClose) ActionOnClose();
                }}
                appearance="subtle"
              >
                Annuler
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
      <Divider vertical />
      {!noServey && (
        <>
          {surveyButton && (
            <IconButton
              onClick={handleSurveyOpen}
              appearance="primary"
              icon={<PlusRoundIcon />}
            >
              Ajout Survey
            </IconButton>
          )}

          <Modal
            size={size ? size : "calc(100% - 120px)"}
            // overflow={false}
            style={{
              // maxHeight: "calc(100vh - 50px)",
              overflow: "auto",
              maxWidth: "100vw",
            }}
            open={surveyState.open}
            onClose={() => {
              handleSurveyClose();
              if (ActionOnClose) ActionOnClose();
            }}
          >
            <Modal.Header>
              <Modal.Title
                style={{
                  display: "flex",
                  padding: 4,
                  justifyContent: "right",
                  fontSize: 25,
                }}
              >
                آراء المعتمرين
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div
                style={{
                  // maxHeight: "calc(100vh - 240px)",
                  overflow: "auto",
                  maxWidth: "100vw",
                }}
              >
                {AddsurveyComponent}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={saveSurvey} appearance="primary">
                {surveyState.loading ? <Loader size="sm" /> : "Enregistrer"}
              </Button>
              <Button
                onClick={() => {
                  handleSurveyClose();
                  if (ActionOnClose) ActionOnClose();
                }}
                appearance="subtle"
              >
                Annuler
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
      <ExportExcel data={excelData} name={nameExcel} />
    </div>
  );
}
