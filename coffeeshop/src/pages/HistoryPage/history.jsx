import React, { useState, useEffect } from "react";
import DashBoard from "../../components/dashBoard/dashBoard";
import { Box, Tabs, Tab, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import BillRow from "../../components/BillRow/billRow";
import ArrowDropUpOutlinedIcon from "@mui/icons-material/ArrowDropUpOutlined";
import Table from "@mui/material/Table";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import TableBody from "@mui/material/TableBody";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import SearchIcon from "@mui/icons-material/Search";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { saveAs } from "file-saver";
import TableHead from "@mui/material/TableHead";
import { Typography } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./history.css";

const History = () => {
  const token = useSelector((state) => state.auths.token);
  const { Position } = useSelector((state) => state.auths.user);
  const [value, setValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [originalBillData, setOriginalBillData] = useState([]);
  const [billData, setBillData] = useState([]);
  const [billCount, setBillCount] = useState(0);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortField, setSortField] = useState(null);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (!searchTerm) {
      setBillData(originalBillData);
      setBillCount(originalBillData.length);
    } else {
      const lowercasedFilter = searchTerm.toLowerCase();
      const filteredData = originalBillData.filter((bill) =>
        bill.Staff.Name.toLowerCase().includes(lowercasedFilter)
      );
      setBillData(filteredData);
      setBillCount(filteredData.length);
    }
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#EFF0F6",
      color: "black",
      fontSize: "14.5px",
      fontWeight: "bold",
      fontFamily: "Montserrat",
      padding: "10px",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: "14px",
      fontWeight: "normal",
      fontFamily: "Montserrat",
    },
  }));
  
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3005/history/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      setBillData((prevBillData) =>
        prevBillData.filter((bill) => bill._id !== id)
      );
      setBillCount((prevCount) => prevCount - 1);
    } catch (error) {
      console.error("Failed to fetch bill data:", error);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setSearchTerm("");
    if (newValue === 0) {
      handleTodayTabClick();
    } else if (newValue === 1) {
      handleYesterdayTabClick();
    } else if (newValue === 2) {
      handleMonthTabClick();
    }
  };
  const handleDownload = () => {
    const csvData = convertBillsToCSV(billData);

    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });

    // Save the CSV file
    saveAs(blob, "bills.csv");
  };

  const convertBillsToCSV = (bills) => {
    const headers = [
      "Order ID",
      "Number of Drinks",
      "Table Number",
      "Staff Name",
      "Total Price",
      "Payment Method",
      "Order Date",
      "Order Items",
    ];

    const csvRows = [];
    csvRows.push(headers.join(","));
    console.log("bill la : ", bills);
    bills.forEach((bill) => {
      const {
        _id,
        items,
        TableNo,
        Staff,
        totalAmount,
        PaymentMethod,
        createdAt,
      } = bill;
      const orderItems = items
        .map((item) => `${item.drink.Name} (${item.quantity})`)
        .join(", ");
      const row = [
        _id,
        items.length,
        TableNo.tableNumber,
        Staff.Name,
        `$${totalAmount.toFixed(2)}`,
        PaymentMethod,
        new Date(createdAt).toLocaleString(),
        orderItems,
      ];
      csvRows.push(row.join(","));
    });

    return csvRows.join("\n");
  };
  
  const fetchBillData = async (startDate, endDate) => {
    try {
      const query =
        startDate && endDate
          ? `?startDate=${startDate}&endDate=${endDate}`
          : "";
      const response = await fetch(`http://localhost:3005/history/${query}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const bills = await response.json();
      setBillCount(bills.length);

      const billsWithDetailsPromises = bills.map(async (bill) => {
        const detailsResponse = await fetch(
          `http://localhost:3005/history/${bill._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        return detailsResponse.json();
      });
      const billsWithDetails = await Promise.all(billsWithDetailsPromises);
      setOriginalBillData(billsWithDetails);
      setBillData(billsWithDetails);
      console.log("Bill Details" + billData);
    } catch (error) {
      console.error("Failed to fetch bill data:", error);
    }
  };

  const handleTodayTabClick = () => {
    const today = new Date();
    const startDate = new Date(today.setHours(0, 0, 0, 0)).toISOString();
    const endDate = new Date(today.setHours(23, 59, 59, 999)).toISOString();
    fetchBillData(startDate, endDate);
    setSearchTerm("");
  };
  
  const handleYesterdayTabClick = () => {
    const today = new Date();
    const yesterday = new Date(today.setDate(today.getDate() - 1));
    const startDate = new Date(yesterday.setHours(0, 0, 0, 0)).toISOString();
    const endDate = new Date(yesterday.setHours(23, 59, 59, 999)).toISOString();
    fetchBillData(startDate, endDate);
    setSearchTerm("");
  };
  
  const handleMonthTabClick = () => {
    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth(), 1).toISOString();
    const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999).toISOString();
    fetchBillData(startDate, endDate);
    setSearchTerm("");
  };

  const handleSortAccordingToTotalPrice = async () => {
    const sortedData = [...billData].sort((a, b) => {
      return sortOrder === "asc"
        ? a.totalAmount - b.totalAmount
        : b.totalAmount - a.totalAmount;
    });

    setBillData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setSortField("totalAmount");
  };
  useEffect(() => {
  if (value === 0) {
    handleTodayTabClick();
  } else if (value === 1) {
    handleYesterdayTabClick();
  } else if (value === 2) {
    handleMonthTabClick();
  }
}, [value]);
  
// }, [value]);
  return (
    <Box sx={{ display: "flex" }}>
      <DashBoard />
      <div
        style={{
          marginLeft:"2.64%",
          marginRight: "2.64%",
          textAlign: "left", 
          width: "100%",
          marginTop: "2.15%" 
        }}
      >
        <div style={{display: "flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between", marginBottom:"2%"}} >
          <label className="medium_text">
            Transaction History
          </label>
          <div style={{ position: "relative" }}>
            <div className="search-bar-staff">
              <SearchIcon className="fa fa-search" />
              <input
                style={{ height: "80%", fontSize: "12px" }}
                placeholder="Search by staff name"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
        <Box
          sx={{ 
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            className="time_tabs"
            sx={{
              width: "contain",
              display: "flex",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="transparent"
              centered
            >
              <Tab
                label="Today"
                sx={{ textTransform: "none", fontSize: "14px" }}
              />
              <Tab
                label="Yesterday"
                sx={{ textTransform: "none", fontSize: "14px" }}
              />
              <Tab
                label="Month"
                sx={{ textTransform: "none", fontSize: "14px" }}
              />
            </Tabs>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            sx={{
              display: "flex",
              width: "20%",
              p: 2,
              marginBottom: "0.5%",
              borderRadius: "4px",
            }}
          >
            <Typography
              marginLeft="3%"
              color="#9398A9"
              fontSize="1.2em"
              fontWeight="bold"
              fontFamily={"Montserrat"}
            >
              Details
            </Typography>
            <Typography
              marginLeft="3%"
              color="black"
              fontSize="1.2em"
              fontWeight="bold"
              fontFamily={"Montserrat"}
            >
              {billCount} bills
            </Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography
              marginLeft="3%"
              color="#9398A9"
              alignContent={"center"}
              fontSize="1.2em"
              fontWeight="bold"
            >
              Downloads
            </Typography>
            <IconButton onClick={handleDownload}>
              <FileDownloadOutlinedIcon />
            </IconButton>
          </Box>
        </Box>

        <TableContainer component={Paper}>
          <Table style={{ width: "100%", alignSelf:"center" }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell
                  style={{
                    borderRight: "1px solid rgba(224, 224, 224, 1)",
                  }}
                  align="center"
                >
                  Order Id
                </StyledTableCell>
                <StyledTableCell
                  style={{
                    borderRight: "1px solid rgba(224, 224, 224, 1)",
                  }}
                  align="center"
                >
                  No Of Drinks
                </StyledTableCell>
                <StyledTableCell
                  style={{
                    borderRight: "1px solid rgba(224, 224, 224, 1)",
                  }}
                  align="center"
                >
                  Table Number
                </StyledTableCell>
                <StyledTableCell
                  style={{
                    borderRight: "1px solid rgba(224, 224, 224, 1)",
                  }}
                  align="center"
                >
                  Staff Name
                </StyledTableCell>
                <StyledTableCell
                  style={{
                    borderRight: "1px solid rgba(224, 224, 224, 1)",
                  }}
                  align="center"
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Total Price
                    <IconButton onClick={handleSortAccordingToTotalPrice}>
                      {sortField === "totalAmount" && sortOrder === "asc" ? (
                        <ArrowDropUpOutlinedIcon />
                      ) : (
                        <ArrowDropDownOutlinedIcon />
                      )}
                    </IconButton>
                  </Box>
                </StyledTableCell>
                <StyledTableCell
                  style={{
                    borderRight: "1px solid rgba(224, 224, 224, 1)",
                  }}
                  align="center"
                >
                  Payment Method
                </StyledTableCell>
                <StyledTableCell
                  style={{
                    borderRight: "1px solid rgba(224, 224, 224, 1)",
                  }}
                  align="center"
                >
                  Order Date
                </StyledTableCell>
                {Position === 'admin' && ( <StyledTableCell align="center">Option</StyledTableCell>)}
              </TableRow>
            </TableHead>
            <TableBody
              style={{
                width: "100%",
              }}
            >
              {billData.length > 0 ? (
                billData.map((bill) => (
                  <BillRow
                    key={bill._id}
                    data={bill}
                    handleDelete={handleDelete}
                  />
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    <Typography
                      marginLeft="3%"
                      color="#412D26"
                      fontSize="1.2em"
                      fontWeight="bold"
                      fontFamily={"Montserrat"}
                    >
                      No data available for this period
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Box>
  );
};

export default History;
