import React from 'react';
import { Spin, Space } from 'antd';
const Loader = () => (
	<div className="loader">
		<Space size="middle">
			<Spin size="large" tip="Loading..." />
		</Space>
	</div>
);

export default Loader;
