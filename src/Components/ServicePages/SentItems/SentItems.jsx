import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { GetLogs } from "../../Utils/axios";
import DataTable from "react-data-table-component";
import ExpandedComponent from "./RowsComponent";
import { customStyles, style1 } from "./ChartStyle";

function SentItems() {
  const [sendData, setSendData] = useState([]);

  // console.log(sendData)

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  useEffect(() => {
    // Fetch data on component mount
    GetLogs().then((res) => {
      // console.log('sent items', res);
      const sortData = res.data.mails.sort((a, b) => new Date(b.time) - new Date(a.time))
      setSendData(sortData);
    });
  }, []);

  // Function to convert array of objects to CSV format
  function convertArrayOfObjectsToCSV(array) {
    let result;
    const columnDelimiter = ",";
    const lineDelimiter = "\n";
    const keys = Object.keys(array[0]);

    result = keys.join(columnDelimiter) + lineDelimiter;
    console.log(result);

    array.forEach((item) => {
      keys.forEach((key) => {
        if (item[key] instanceof Array) {
          result += item[key].length + columnDelimiter;
        } else {
          result += item[key] + columnDelimiter;
        }
      });
      result += lineDelimiter;
    });

    return result;
  }

  // Function to trigger CSV download
  function downloadCSV(array) {
    const csv = convertArrayOfObjectsToCSV(array);
    const filename = "export.csv";
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    if (navigator.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(blob, filename);
    } else {
      const link = document.createElement("a");
      if (link.download !== undefined) {
        // Browsers that support HTML5 download attribute
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }

  // Export button component
  const Export = () => (
    <Button onClick={() => downloadCSV(sendData)}>Export</Button>
  );

  // Define columns for the data table
  const columns = [
    {
      name: "From",
      selector: (row) => row.from,
      sortable: true,
      width: "300px",
      style: {
        fontSize: "16px",
      },
    },
    {
      name: "Recipients Count",
      selector: (row) => row.recipients.length,
      sortable: true,
      maxWidth: "150px",
      center: true,
      style: {
        fontSize: "16px",
        // border: ".5px solid #000"
      },
    },
    {
      name: "Subject",
      selector: (row) => row.subject,
      sortable: true,
      width: "250px",
      style: {
        fontSize: "16px",
      },
    },
    {
      name: "Accepted",
      selector: (row) => row.accepted.length,
      sortable: true,
      center: true,
      maxWidth: "150px",
      style: {
        fontSize: "16px",
      },
    },
    {
      name: "Rejected",
      selector: (row) => row.rejected.length,
      sortable: true,
      center: true,
      maxWidth: "150px",
      style: {
        fontSize: "16px",
      },
    },
    {
      name: "Date",
      selector: (row) =>
        new Date(row.time).toLocaleDateString(undefined, options),
      sortable: true,
      center: true,
      maxWidth: "150px",
      style: {
        fontSize: "16px",
      },
    },
    {
      name: "Time",
      selector: (row) => new Date(row.time).toLocaleTimeString(),
      sortable: true,
      center: true,
      maxWidth: "150px",

      style: {
        fontSize: "16px",
      },
    },
  ];

  return (
    <Container>
      <Row>
        <Col>
          <h3>Sent Items</h3>
          <div className="d-flex justify-content-lg-end mb-3">
            <Export />
          </div>
          <DataTable className="custom-table"
            columns={columns}
            data={sendData}
            fixedHeader
            pagination
            highlightOnHover
            pointerOnHover
            expandableRows
            expandableRowsComponent={ExpandedComponent}
            expandOnRowClicked
            expandableRowsHideExpander
            customStyles={customStyles}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default SentItems;
