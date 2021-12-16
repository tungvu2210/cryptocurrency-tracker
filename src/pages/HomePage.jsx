import React, { useState, useEffect } from "react";
import SearchForm from "../components/SearchForm";
import CoinTable from "../components/CoinTable";
import Container from "@mui/material/Container";
import axios from "axios";
import { Stack } from "@mui/material";

const HomePage = () => {
  const [rows, setRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { data } = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=vnd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    );
    setRows(data);
  };

  return (
    <Container>
      <Stack alignItems="center">
        <h1 className="title">Cập nhật thông tin về tiền điện tử</h1>
        <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <CoinTable rows={rows} searchTerm={searchTerm.toLowerCase()} />
      </Stack>
    </Container>
  );
};

export default HomePage;
