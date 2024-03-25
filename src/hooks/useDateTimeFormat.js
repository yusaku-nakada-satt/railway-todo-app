import { useState, useEffect } from 'react'

const useDateTimeFormat = (isoDateTime) => {
	const [formattedDateTime, setFormattedDateTime] = useState('')

	useEffect(() => {
		const date = new Date(isoDateTime)
		const year = date.getFullYear()
		const month = date.getMonth() + 1
		const day = date.getDate()
		const hours = date.getHours()
		const minutes = date.getMinutes()

		const formatted = `${year}年${month}月${day}日 ${hours}時${minutes}分`
		setFormattedDateTime(formatted)
	}, [isoDateTime])

	return formattedDateTime
}

export default useDateTimeFormat
