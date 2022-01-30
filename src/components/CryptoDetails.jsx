import React, { useState } from 'react';
import HTMLReactParsers from 'html-react-parser';
import millify from 'millify';

import {
	useGetCryptoDetailsQuery,
	useGetCryptoHistoryQuery,
} from '../services/cryptoApi';
import {
	MoneyCollectOutlined,
	DollarCircleOutlined,
	FundOutlined,
	ExclamationCircleOutlined,
	StopOutlined,
	TrophyOutlined,
	CheckOutlined,
	NumberOutlined,
	ThunderboltOutlined,
} from '@ant-design/icons';
import { Col, Row, Typography, Select } from 'antd';

import { useParams } from 'react-router';
import LineCharts from './LineCharts';
import Loader from './Loader';

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
	const [timePeriod, setTimePeriod] = useState('7d');
	const { coinId } = useParams();
	const { data: cryptoDetails, isFetching } = useGetCryptoDetailsQuery(coinId);

	// const { data: coinHistory } = useGetCryptoHistoryQuery({
	// 	coinId,
	// 	timePeriod,
	// });

	// const cryptoDetails = data?.data?.coin;

	console.log(cryptoDetails);

	if (isFetching) return <Loader />;

	const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

	const stats = [
		{
			title: 'Price to USD',
			value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`,
			icon: <DollarCircleOutlined />,
		},
		{ title: 'Rank', value: cryptoDetails.rank, icon: <NumberOutlined /> },
		{
			title: 'Type of Proof ',
			value: `${cryptoDetails.proof_type}`,
			icon: <ThunderboltOutlined />,
		},
		{
			title: 'Developement Status',
			value: cryptoDetails.development_status,
			icon: <DollarCircleOutlined />,
		},
		{
			title: 'Organisation Structure',
			value: cryptoDetails.org_structure,
			icon: <TrophyOutlined />,
		},
		{
			title: 'Start Date',
			value: cryptoDetails.started_at,
			icon: <TrophyOutlined />,
		},
	];

	// const genericStats = [
	// 	{
	// 		title: 'Number Of Markets',
	// 		value: cryptoDetails.numberOfMarkets,
	// 		icon: <FundOutlined />,
	// 	},
	// 	{
	// 		title: 'Number Of Exchanges',
	// 		value: cryptoDetails.numberOfExchanges,
	// 		icon: <MoneyCollectOutlined />,
	// 	},
	// 	{
	// 		title: 'Aprroved Supply',
	// 		value: cryptoDetails.approvedSupply ? (
	// 			<CheckOutlined />
	// 		) : (
	// 			<StopOutlined />
	// 		),
	// 		icon: <ExclamationCircleOutlined />,
	// 	},
	// 	{
	// 		title: 'Total Supply',
	// 		value: `$ ${millify(cryptoDetails.totalSupply)}`,
	// 		icon: <ExclamationCircleOutlined />,
	// 	},
	// 	{
	// 		title: 'Circulating Supply',
	// 		value: `$ ${
	// 			cryptoDetails.circulatingSupply
	// 				? millify(cryptoDetails.circulatingSupply)
	// 				: ''
	// 		}`,
	// 		icon: <ExclamationCircleOutlined />,
	// 	},
	// ];

	return (
		<Col className="coin-detail-container">
			<Col className="coin-heading-container">
				<Title level={2} className="coin-name">
					{cryptoDetails.name} ({cryptoDetails.symbol})
				</Title>
				<p>{cryptoDetails.name} View globale informations.</p>
				{/* 	<Select
					defaultValue="7d"
					className="select-timeperiod"
					placeholder="Select Time Period"
					onChange={value => setTimePeriod(value)}
				>
					{time.map(date => (
						<Option key={date}>{date}</Option>
					))}
				</Select>

				<LineCharts
					coinHistory={coinHistory}
					currentPrice={millify(cryptoDetails.price)}
					coinNAme={cryptoDetails.name}
				/>
*/}
				<Col className="stats-container">
					<Col className="coin-value-statistics">
						<Col className="coin-value=statistics-heading">
							<Title level={3} className="coin-details-heading">
								{cryptoDetails.name} Global Informations
							</Title>
							<p>
								An overview showing the story of {cryptoDetails.name}
							</p>
						</Col>
						{stats.map(({ icon, title, value }) => (
							<Col className="coin-stats">
								<Col className="coin-stats-name">
									<Text>{icon}</Text>
									<Text>{title}</Text>
								</Col>
								<Text className="stats">{value}</Text>
							</Col>
						))}
					</Col>
					<Col className="other-stats-info">
						<Col className="coin-value=statistics-heading">
							<Title level={3} className="coin-details-heading">
								Other Stats
							</Title>
							<p>
								An overview showing the stats of all cryptocurrencies
							</p>
						</Col>
						{/* {genericStats.map(({ icon, title, value }) => (
							<Col className="coin-stats">
								<Col className="coin-stats-name">
									<Text>{icon}</Text>
									<Text>{title}</Text>
								</Col>
								<Text className="stats">{value}</Text>
							</Col>
						))} */}
					</Col>
				</Col>
			</Col>
			<Col className="coin-desc-link">
				<Row className="coin-desc">
					<Title level={3} className="coin-details-heading">
						What is {cryptoDetails.name}
					</Title>
					<Typography>
						{HTMLReactParsers(cryptoDetails.description)}
					</Typography>
				</Row>
				<Row>
					<Title level={3} className="coin-details-heading">
						White Paper {cryptoDetails.name}
					</Title>

					<a
						href={cryptoDetails.whitepaper.link}
						target="_blank"
						rel="noreferrer"
					>
						<img
							src={cryptoDetails.whitepaper.thumbnail}
							alt="white paper"
						/>
					</a>
				</Row>
				<Row>
					<Title level={3} className="coin-details-heading">
						Team {cryptoDetails.name}
					</Title>
					<div>
						{cryptoDetails.team.map(person => (
							<div key={person.id}>
								<p>
									Name : {person.name} - {person.position}
								</p>
							</div>
						))}
					</div>
				</Row>
				<Col className="coin-links">
					<Title level={3} className="coin-details-heading">
						{cryptoDetails.name} Links
						{cryptoDetails.links.explorer.map(link => (
							<Row className="coin-link" key={link}>
								<a href={link} target="_blank" rel="noreferrer">
									<Title level={5} className="link-name">
										{link}
									</Title>
								</a>
							</Row>
						))}
					</Title>
				</Col>
			</Col>
		</Col>
	);
};

export default CryptoDetails;
