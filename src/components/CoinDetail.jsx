import React from "react";
import ReactHtmlParser from "react-html-parser";
import { Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    color: "white",
    padding: 8,
  },
  img: {
    margin: "0 auto",
    width: 200,
  },
}));

const CoinDetail = ({ coin }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <Stack
      className={classes.root}
      style={{ borderRight: window.innerWidth < 1536 ? "" : "1px solid white" }}
    >
      <img src={coin.image.large} alt={coin.name} className={classes.img} />
      <Typography component="h1" variant="h3" align="center" m={1}>
        {coin.name}
      </Typography>
      <Typography mt={1} mb={2}>
        {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
      </Typography>
      <h3>
        {`Giá hiện tại: ${coin.market_data.current_price.vnd.toLocaleString()} VNĐ`}
      </h3>
      <h3 style={{ margin: "20px 0" }}>
        {`Vốn hóa thị trường: ${coin.market_data.market_cap.vnd.toLocaleString()} VNĐ`}
      </h3>
      <h3>
        {coin.market_data.max_supply
          ? `Số lượng: ${coin.market_data.max_supply.toLocaleString()} đồng`
          : null}
      </h3>
      <button className="btn btn--back" onClick={() => navigate("/")}>
        Về trang chủ
      </button>
    </Stack>
  );
};

export default CoinDetail;
