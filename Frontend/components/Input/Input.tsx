import { InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string
	label?: string
}

import styles from "./Input.module.scss"

export default function Input({ name, label, ...inputProps }: InputProps) {
	return (
		<div className={styles.container}>
			{label && <label htmlFor={name}>{label}</label>}
			<input name={name} {...inputProps}></input>
		</div>
	)
}
