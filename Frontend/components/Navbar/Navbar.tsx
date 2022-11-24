import { useAuth } from "../../context/auth"
import styles from "./Navbar.module.scss"

export default function Navbar() {
	const { signed, Logout } = useAuth()

	return (
		<header className={styles.container}>
			<img src="./logo.svg" className={styles.logo} />

			{signed && (
				<button className={styles.logout} onClick={() => Logout()}>
					Logout
				</button>
			)}
		</header>
	)
}
