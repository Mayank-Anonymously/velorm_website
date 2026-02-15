import type { AppProps } from 'next/app';
import '@/styles/globals.css'; // Tailwind imported here

import { Provider } from 'react-redux';
import { store } from '@/store/store';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	);
}
