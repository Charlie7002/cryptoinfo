import React from 'react';
import millify from 'millify';
import { Col, Row, Statistic, Typography } from 'antd';

import {
	useGetCryptosQuery,
	useGetGlobalInfoQuery,
} from '../services/cryptoApi';
import { Link } from 'react-router-dom';
import { Cryptocurrencies, News } from './';
import Loader from './Loader';

const { Title } = Typography;

const Homepage = () => {
	const { data, isFetching } = useGetGlobalInfoQuery();
	console.log(data);

	if (isFetching) return <Loader />;
	return (
		<>
			<Title level={2} className="heading">
				Global Crypto Stats
			</Title>
			<Row>
				<Col span={12}>
					<Statistic
						title="Total Cryptocurrencies"
						value={data?.cryptocurrencies_number}
					/>
				</Col>

				<Col span={12}>
					<Statistic
						title="Volume 24h"
						value={'$' + millify(data?.volume_24h_usd)}
					/>
				</Col>
				<Col span={12}>
					<Statistic
						title="Market Cap ATH Value"
						value={'$' + millify(data?.market_cap_ath_value)}
					/>
				</Col>
				<Col span={12}>
					<Statistic
						title="Volume 24h ATH"
						value={'$' + millify(parseInt(data?.volume_24h_ath_value))}
					/>
				</Col>
				<Col span={12}>
					<Statistic
						title="Market Cap"
						value={'$' + millify(+data?.market_cap_usd)}
					/>
				</Col>
			</Row>
			<div className="home-heading-container">
				<Title level={2} className="home-title">
					Top 10 Cryptocurrencies in the world
				</Title>
				<Title level={3} className="show-more">
					<Link to="/cryptocurrencies">Show more</Link>
				</Title>
			</div>
			<Cryptocurrencies simplified />
			<div className="home-heading-container">
				<Title level={2} className="home-title">
					Latest Crypto News
				</Title>
				<Title level={3} className="show-more">
					<Link to="/news">Show more</Link>
				</Title>
			</div>
			<News simplified />
		</>
	);
};

export default Homepage;
