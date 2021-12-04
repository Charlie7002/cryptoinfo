import React from 'react';

import millify from 'millify';
import HTMLReactParsers from 'html-react-parser';

import { useGetCryptosExchangesQuery } from '../services/cryptoApi';

import { Col, Row, Collapse, Avatar, Typography } from 'antd';
import Loader from './Loader';
const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
	const { data, isFetching } = useGetCryptosExchangesQuery();

	const exchanges = data?.data?.exchanges;

	if (isFetching) return <Loader />;

	return (
		<>
			<Row>
				<Col span={6}>Exchanges </Col>
				<Col span={6}>24h Trade Volume </Col>
				<Col span={6}>Markets </Col>
				<Col span={6}>Change </Col>
			</Row>

			<Row>
				{exchanges?.map(exchange => (
					<Col span={24} key={exchange.name}>
						<Collapse accordion>
							<Panel
								showArrow={false}
								header={
									<Row style={{ width: '100%' }} key={exchange.id}>
										<Col span={6}>
											<Text>
												<strong>{exchange.rank}.</strong>
											</Text>
											<Avatar
												className="exchange-image"
												src={exchange.iconUrl}
											/>
											<Text>
												<strong>{exchange.name}</strong>
											</Text>
										</Col>
										<Col span={6}>$ {millify(exchange.volume)}</Col>
										<Col span={6}>
											{millify(exchange.numberOfMarkets)}
										</Col>
										<Col span={6}>
											{millify(exchange.marketShare)}%
										</Col>
									</Row>
								}
							>
								<Text>
									{HTMLReactParsers(exchange.description || '')}
								</Text>
							</Panel>
						</Collapse>
					</Col>
				))}
			</Row>
		</>
	);
};

export default Exchanges;
