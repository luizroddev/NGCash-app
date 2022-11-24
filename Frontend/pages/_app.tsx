import "../styles/globals.scss"
import type { AppProps } from "next/app"
import { AuthProvider } from "../context/auth"
import { UserDataProvider } from "../context/user"

export default function App({ Component, pageProps }: AppProps) {
	return (
		<UserDataProvider>
			<AuthProvider>
				<Component {...pageProps} />
			</AuthProvider>
		</UserDataProvider>
	)
}
