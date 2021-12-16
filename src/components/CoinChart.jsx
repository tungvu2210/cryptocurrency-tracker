import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Box } from "@mui/system";
import axios from "axios";
import moment from "moment";
import SelectButton from "./SelectButton";
import Progress from "./Progress";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Biểu đồ biến động",
    },
  },
  elements: {
    point: {
      radius: 1,
    },
  },
  scales: {
    y: {
      ticks: {
        callback: function (value, index, values) {
          return `${value.toLocaleString()} VNĐ`;
        },
      },
    },
  },
};

const CoinChart = ({ coin }) => {
  const [data, setData] = useState({});
  const [days, setDays] = useState(1);

  useEffect(() => {
    const getData = async (days) => {
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=vnd&days=${days}`
      );

      const newData = {
        labels: data.prices.map((label) =>
          moment(label[0]).format(days > 1 ? "L" : "LT")
        ),
        datasets: [
          {
            label: `Giá tiền trong ${days} gần đây`,
            data: data.prices.map((item) => item[1]),
            borderColor: "#ffcf00",
          },
        ],
      };

      setData(newData);
    };

    getData(days);
  }, [days, coin.id]);

  if (Object.keys(data).length === 0) return <Progress />;

  return (
    <Box p={2}>
      <Line options={options} data={data} />
      <SelectButton days={days} onDaysChange={setDays} />
    </Box>
  );
};

export default CoinChart;
