import React, { useEffect, useState } from 'react';
import millify from 'millify';

import { useGetCryptosQuery } from '../services/cryptoApi';

import { Link } from 'react-router-dom';
import { Card, Col, Input, Row } from 'antd';
import Loader from './Loader';

const Cryptocurrencies = ({ simplified }) => {
	const count = simplified ? 10 : 100;
	const { data, isFetching } = useGetCryptosQuery(count);

	//state cryptos init by useEffect
	const [cryptos, setCryptos] = useState(data);
	const [searchValue, setSearchValue] = useState('');

	useEffect(() => {
		const filteredData = data?.filter(coin =>
			coin.name.toLowerCase().includes(searchValue),
		);
		setCryptos(filteredData);
	}, [data, searchValue]);

	if (isFetching) return <Loader />;

	return (
		<>
			{!simplified && (
				<div className="search-crypto">
					<Input
						placeholder="Search Cryptocurrency"
						onChange={e => setSearchValue(e.target.value)}
						value={searchValue}
					/>
				</div>
			)}

			<Row
				gutter={[32, 32]}
				className="crypto-card-container"
				justify="center"
			>
				{cryptos?.map(currency => (
					<Col
						xs={24}
						sm={12}
						lg={6}
						className="crypto-card"
						key={currency.id}
					>
						<Link to={`/crypto/${currency.id}`}>
							<Card
								style={{
									borderRadius: '15px',
									color: ' #20229b',
								}}
								title={`${currency.rank}. ${currency.name}`}
								extra={
									<img
										src={`https://cryptoicon-api.vercel.app/api/icon/${currency.symbol.toLowerCase()}`}
										className="crypto-image"
									/>
								}
								hoverable
							>
								<p>Price : $ {millify(currency.quotes.USD.price)}</p>
								<p>
									Market Cap : $
									{millify(currency.quotes.USD.market_cap)}
								</p>
								<p>
									Daily Change :{''}
									{millify(currency.quotes.USD.percent_change_24h)}%
								</p>
							</Card>
						</Link>
					</Col>
				))}
			</Row>
		</>
	);
};

export default Cryptocurrencies;
