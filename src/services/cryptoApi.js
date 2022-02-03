import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoAPiHeaders = {
	'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
	'x-rapidapi-host': process.env.REACT_APP_CRYPTO_RAPIDAPI_HOST,
};

const baseUrl = process.env.REACT_APP_CRYPTO_API_URL;

const createRequest = url => ({
	method: 'GET',
	url,
	headers: cryptoAPiHeaders,
});

export const cryptoApi = createApi({
	reducerPath: 'cryptoApi',
	baseQuery: fetchBaseQuery({ baseUrl }),
	endpoints: builder => ({
		getCryptos: builder.query({
			query: count => createRequest(`/tickers?limit=${count}`),
		}),
		getCryptoDetails: builder.query({
			query: coinId => createRequest(`/coins/${coinId}`),
		}),
		getCryptoHistory: builder.query({
			query: ({ coinId, timePeriod, start, end }) =>
				createRequest(
					`/tickers/${coinId}/historical?start=${start}&end=${end}&interval=${timePeriod}`,
				),
		}),
		getCryptosExchanges: builder.query({
			query: () => createRequest(`/exchanges`),
		}),
		getGlobalInfo: builder.query({
			query: () => createRequest(`/global`),
		}),
		getCrypto: builder.query({
			query: coinId => createRequest(`/tickers/${coinId}`),
		}),
	}),
});

export const {
	useGetCryptosQuery,
	useGetCryptoDetailsQuery,
	useGetCryptoHistoryQuery,
	useGetCryptosExchangesQuery,
	useGetGlobalInfoQuery,
	useGetCryptoQuery,
} = cryptoApi;
