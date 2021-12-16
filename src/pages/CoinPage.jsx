import React, { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import CoinChart from "../components/CoinChart";
import CoinDetail from "../components/CoinDetail";
import Progress from "../components/Progress";
import axios from "axios";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState({});

  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then((res) => setCoin(res.data));
  }, [id]);

  if (Object.keys(coin).length === 0) return <Progress />;

  return (
    <Container maxWidth="xl">
      <Grid container spacing={1} pt={1}>
        <Grid item xs={12} sm={12} md={12} xl={3}>
          <CoinDetail coin={coin} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} xl>
          <CoinChart coin={coin} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default CoinPage;
