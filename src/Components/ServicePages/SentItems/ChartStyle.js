export const customStyles = {
    title: {
      style: {
        backgroundColor: "#662a2a",
        borderTop: "1px solid #AAAAAA",
        borderBottom: "1px solid #AAAAAA",
        minHeight: "56px",
        fontWeight: "700",
        fontSize: "16px",
        color: "#FFFFFF",
      },
    },
    headRow: {
      style: {
        borderTop: "1.5px solid #000000",
        borderBottom: "1.5px solid #000000",
      },
    },
    headCells: {
      style: {
        "&:not(:last-of-type)": {
          borderRight: "1px solid #000",
        },
      },
    },
    cells: {
      style: {
        "&:not(:last-of-type)": {
          borderRight: "1px solid #000",
        },
      },
    },
  };

  export const style1 = {
    "custom-table": {
      "borderCollapse": "collapse",
      "width": "100%"
    },
    "custom-table th": {
      "border": "1px solid #dddddd",
      "textAlign": "left",
      "padding": "8px",
      "backgroundColor": "#f2f2f2"
    },
    "custom-table td": {
      "border": "1px solid #dddddd",
      "textAlign": "left",
      "padding": "8px"
    }
  }