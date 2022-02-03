import React from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';
import Chart from 'chart.js/auto';
const { Title } = Typography;

const LineCharts = ({ coinHistory, currentPrice, coinName }) => {
	const coinPrice = [];
	const coinTimestamp = [];
	coinHistory?.forEach(el => {
		coinPrice.push(el.price);
		coinTimestamp.push(new Date(el.timestamp).toLocaleDateString());
	});

	const data = {
		labels: coinTimestamp,
		datasets: [
			{
				label: 'Price In USD',
				data: coinPrice,
				fill: false,
				backgroundColor: '#3133ce',
				borderColor: '#3133ce',
			},
		],
	};

	const options = {
		scales: {
			y: [
				{
					ticks: {
						beginAtZero: true,
					},
				},
			],
		},
	};

	return (
		<>
			<Row className="chart-header">
				<Title level={2} className="chart-title">
					{coinName} Price Chart
				</Title>
			</Row>
			<Line data={data} options={options} />
		</>
	);
};

export default LineCharts;
