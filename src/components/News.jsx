import React, { useState } from 'react';
import moment from 'moment';

import { useGetNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';

import { Avatar, Card, Col, Row, Typography, Select } from 'antd';
import Loader from './Loader';

const { Option } = Select;
const { Title, Text } = Typography;

const demoImg =
	'http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg';

const News = ({ simplified }) => {
	const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
	const { data: cryptonews } = useGetNewsQuery({
		newsCategory,
		count: simplified ? 6 : 16,
	});

	const { data } = useGetCryptosQuery(100);

	if (!cryptonews?.value) return <Loader />;

	return (
		<>
			<Row gutter={[24, 24]}>
				{!simplified && (
					<Col span={24}>
						<Select
							showSearch
							className="select-news"
							placeholder="Select a crypto"
							optionFilterProp="children"
							onChange={value => setNewsCategory(value)}
							filterOption={(input, option) =>
								option.children
									.toLowerCase()
									.indexOf(input.toLowerCase()) >= 0
							}
						>
							<Option value="Cryptocurrency"></Option>
							{data?.data?.coins.map((coin, i) => (
								<Option key={i + coin.name} value={coin.name}>
									{coin.name}
								</Option>
							))}
						</Select>
					</Col>
				)}
				{cryptonews.value.map((news, i) => (
					<Col xs={24} sm={12} lg={6} key={i}>
						<Card hoverable className="news-card">
							<a href={news.url} target="_blank" rel="noreferrer">
								<div className="news-image-container">
									<Title className="news-title" level={4}>
										{news.name}
									</Title>
									<img
										style={{ maxHeight: '100px', maxWidth: '100px' }}
										src={
											news?.image?.thumbnail?.contentUrl || demoImg
										}
										atl="news"
									/>
								</div>
								<p>
									{news.description.length > 100
										? `${news.description.substring(0, 100)}....`
										: news.descriptions}
								</p>
								<div className="provider-container">
									<div>
										<Avatar
											src={
												news.provider[0]?.image?.thumbnail
													?.contentUrl || demoImg
											}
										/>
										<Text className="provider-name">
											{news.provider[0].name}
										</Text>
									</div>
									<Text>
										{moment(news.datePublished)
											.startOf('ss')
											.fromNow()}
									</Text>
								</div>
							</a>
						</Card>
					</Col>
				))}
			</Row>
		</>
	);
};

export default News;
