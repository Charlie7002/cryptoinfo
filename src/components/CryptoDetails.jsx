import React, { useState } from 'react';
import HTMLReactParsers from 'html-react-parser';
import millify from 'millify';

import {
	useGetCryptoDetailsQuery,
	useGetCryptoHistoryQuery,
	useGetCryptoQuery,
} from '../services/cryptoApi';
import {
	MoneyCollectOutlined,
	DollarCircleOutlined,
	FundOutlined,
	TrophyOutlined,
	NumberOutlined,
	ThunderboltOutlined,
	PieChartOutlined,
	SlidersOutlined,
	AreaChartOutlined,
	SisternodeOutlined,
	ApartmentOutlined,
} from '@ant-design/icons';
import { Col, Row, Typography, Select } from 'antd';

import { useParams } from 'react-router';
import LineCharts from './LineCharts';
import Loader from './Loader';

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
	const [timePeriod, setTimePeriod] = useState('7d');
	let now = new Date().toLocaleDateString('fr-CA');
	let oneYearFromNow = new Date();
	oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() - 1);
	let oneYearBack = oneYearFromNow.toLocaleDateString('fr-CA');

	const { coinId } = useParams();
	const { data: cryptoDetails, isFetching } = useGetCryptoDetailsQuery(coinId);
	const { data: coinHistory } = useGetCryptoHistoryQuery({
		coinId,
		timePeriod,
		start: oneYearBack,
		end: now,
	});
	const { data: crypto } = useGetCryptoQuery(coinId);

	const time = ['1h', '4h', '1d', '7d', '14d', '30d', '90d', '360d'];

	const stats = [
		{ title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
		{
			title: 'Type of Proof ',
			value: `${cryptoDetails?.proof_type}` || '',
			icon: <ThunderboltOutlined />,
		},
		{
			title: 'Developement Status',
			value: cryptoDetails?.development_status || '',
			icon: <SisternodeOutlined />,
		},
		{
			title: 'Organisation Structure',
			value: cryptoDetails?.org_structure || '',
			icon: <ApartmentOutlined />,
		},
		{
			title: 'Start Date',
			value: cryptoDetails?.started_at?.slice(0, 10) || '',

			icon: <TrophyOutlined />,
		},
		{
			title: 'Price to USD',
			value:
				`$ ${
					crypto?.quotes?.USD?.price && millify(crypto?.quotes?.USD?.price)
				}` || '',
			icon: <DollarCircleOutlined />,
		},
	];

	const genericStats = [
		{
			title: 'Circulating supply',
			value: `$ ${
				(crypto?.circulating_supply &&
					millify(crypto?.circulating_supply)) ||
				''
			}`,
			icon: <FundOutlined />,
		},
		{
			title: 'Total supply',
			value:
				`$ ${crypto?.total_supply && millify(crypto?.total_supply)}` || '',
			icon: <MoneyCollectOutlined />,
		},
		{
			title: 'Market Cap',
			value: `$ ${
				crypto?.quotes?.USD?.market_cap &&
				millify(crypto?.quotes?.USD?.market_cap)
			}`,
			icon: <AreaChartOutlined />,
		},
		{
			title: 'ATH price',
			value:
				(crypto?.quotes?.USD?.ath_price &&
					millify(crypto?.quotes?.USD?.ath_price)) ||
				'',
			icon: <SlidersOutlined />,
		},

		{
			title: 'Percent from price ATH',
			value:
				`% ${
					crypto?.quotes?.USD?.percent_from_price_ath &&
					millify(crypto?.quotes?.USD?.percent_from_price_ath)
				}` || '',
			icon: <PieChartOutlined />,
		},
	];
	console.log(cryptoDetails);
	console.log(crypto);

	if (isFetching) return <Loader />;

	return (
		<Col className="coin-detail-container">
			<Col className="coin-heading-container">
				<Title level={2} className="coin-name">
					{cryptoDetails?.name} ({cryptoDetails?.symbol})
				</Title>
				<p>{cryptoDetails?.name} View globale informations</p>
				<Col className="coin-value-statistics">
					<Col className="coin-value=statistics-heading">
						<Title level={3} className="coin-details-heading">
							{cryptoDetails?.name} Global Informations
						</Title>
						<p>An overview showing the story of {cryptoDetails?.name}</p>
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
				<Row style={{ height: '50px' }}></Row>
				<Select
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
					coinNAme={cryptoDetails?.name}
				/>

				<Col className="stats-container">
					<Col className="other-stats-info">
						<Col className="coin-value=statistics-heading">
							<Title level={3} className="coin-details-heading">
								Other Stats
							</Title>
							<p>
								An overview showing the stats of all cryptocurrencies
							</p>
						</Col>
						{genericStats.map(({ icon, title, value }) => (
							<Col className="coin-stats">
								<Col className="coin-stats-name">
									<Text>{icon}</Text>
									<Text>{title}</Text>
								</Col>
								<Text className="stats">{value}</Text>
							</Col>
						))}
					</Col>
				</Col>
			</Col>

			<Row className="coin-desc" gutter={100}>
				<Col span={12}>
					<Title level={3} className="coin-details-heading">
						What is {cryptoDetails?.name}
					</Title>
					<Typography>
						{HTMLReactParsers(cryptoDetails?.description)}
					</Typography>
				</Col>
				<Col span={12}>
					<Title level={3} className="coin-details-heading">
						White Paper {cryptoDetails?.name}
					</Title>

					<a
						href={cryptoDetails?.whitepaper.link}
						target="_blank"
						rel="noreferrer"
					>
						<img
							src={cryptoDetails?.whitepaper.thumbnail}
							alt="whitepaper"
						/>
					</a>
				</Col>
			</Row>
			<Row>
				<Col span={24}>
					<Title level={3} className="coin-details-heading">
						Team : {cryptoDetails?.name}
					</Title>
				</Col>
				<Col span={24}>
					{cryptoDetails?.team.map(person => (
						<div key={person.id}>
							<p>
								{person.name} - {person.position}
							</p>
						</div>
					))}
				</Col>
			</Row>
			<Col span={24} className="coin-desc-link">
				<Col className="coin-links">
					<Title level={3} className="coin-details-heading">
						Links {cryptoDetails?.name}
						{cryptoDetails?.links?.explorer?.map(link => (
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
