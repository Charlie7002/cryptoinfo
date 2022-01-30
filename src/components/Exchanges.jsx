import React, { useEffect, useState } from 'react';

import millify from 'millify';
import HTMLReactParsers from 'html-react-parser';

import { useGetCryptosExchangesQuery } from '../services/cryptoApi';

import { Col, Row, Collapse, Avatar, Typography } from 'antd';
import Loader from './Loader';
const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
	const { data, isFetching } = useGetCryptosExchangesQuery();
	const [ex, setEx] = useState(data);

	let filterData = data?.filter(item => item.adjusted_rank != null);
	filterData?.sort(function (a, b) {
		return a.adjusted_rank - b.adjusted_rank;
	});
	useEffect(() => {
		setEx(filterData);
	}, []);

	console.log(filterData);

	if (isFetching) return <Loader />;

	return (
		<>
			<Row>
				<Col span={6}>Exchanges </Col>
				<Col span={6}>24h Trade Volume </Col>
				<Col span={6}>Markets </Col>
				<Col span={6}>Currencies </Col>
			</Row>

			<Row>
				{filterData?.map(exchange => {
					return (
						<Col span={24} key={exchange.name}>
							<Collapse accordion>
								<Panel
									showArrow={false}
									header={
										<Row style={{ width: '100%' }} key={exchange.id}>
											<Col span={6}>
												<Text>
													<strong>
														{exchange.adjusted_rank}.{' '}
													</strong>
												</Text>
												{/* <Avatar
												className="exchange-image"
												src={`https://cryptoicon-api.vercel.app/api/icon/${currency.symbol.toLowerCase()}`}
											/> */}
												<Text>
													<strong>{exchange.name}</strong>
												</Text>
											</Col>
											<Col span={6}>
												{millify(
													exchange.quotes.USD.reported_volume_24h,
												)}
											</Col>
											<Col span={6}>{millify(exchange.markets)}</Col>
											<Col span={6}>
												{millify(exchange.currencies)}
											</Col>
										</Row>
									}
								>
									<Text>
										<p>
											{HTMLReactParsers(exchange.description || '')}
										</p>
										<a
											href={exchange.links.website[0]}
											target="_blank"
											rel="noreferrer"
										>
											{exchange.links.website[0]}
										</a>
									</Text>
								</Panel>
							</Collapse>
						</Col>
					);
				})}
			</Row>
		</>
	);
};

export default Exchanges;
