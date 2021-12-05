import React, { useEffect, useState } from 'react';
import millify from 'millify';

import { useGetCryptosQuery } from '../services/cryptoApi';

import { Link } from 'react-router-dom';
import { Card, Col, Input, Row } from 'antd';
import Loader from './Loader';

const Cryptocurrencies = ({ simplified }) => {
	const count = simplified ? 10 : 100;
	const { data: cryptoList, isFetching } = useGetCryptosQuery(count);

	//state cryptos init by useEffect
	const [cryptos, setCryptos] = useState([]);
	const [searchValue, setSearchValue] = useState('');

	useEffect(() => {
		const filteredData = cryptoList?.data?.coins.filter(coin =>
			coin.name.toLowerCase().includes(searchValue),
		);
		setCryptos(filteredData);
	}, [cryptoList, searchValue]);

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

			<Row gutter={[32, 32]} className="crypto-card-container">
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
								title={`${currency.rank}. ${currency.name}`}
								extra={
									<img
										src={currency.iconUrl}
										className="crypto-image"
									/>
								}
								hoverable
							>
								<p>Price : {millify(currency.price)}</p>
								<p>Market Cap : {millify(currency.marketCap)}</p>
								<p>Daily Change : {millify(currency.change)}%</p>
							</Card>
						</Link>
					</Col>
				))}
			</Row>
		</>
	);
};

export default Cryptocurrencies;
