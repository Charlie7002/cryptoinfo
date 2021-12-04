import React from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';
import Chart from 'chart.js/auto';
const { Title } = Typography;

const LineCharts = ({ coinHistory, currentPrice, coinName }) => {
	const coinPrice = [];
	const coinTimestamp = [];
	coinHistory?.data?.history?.forEach(el => {
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
				backgroundColor: '#0071bd',
				borderColor: '#0071bd',
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
				<Col className="price-container">
					<Title level={5} className="price-change">
						{coinHistory?.data?.change}%
					</Title>
					<Title level={5} className="currentPrice">
						Current {coinName} Price : $ {currentPrice}
					</Title>
				</Col>
			</Row>
			<Line data={data} options={options} />
		</>
	);
};

export default LineCharts;
