const useDateTimeFormat = () => {
	const formatDateTime = (isoDateTime) => {
		const date = new Date(isoDateTime)
		const year = date.getFullYear()
		const month = date.getMonth() + 1
		const day = date.getDate()
		const hours = date.getHours()
		const minutes = date.getMinutes()

		return `${year}年${month}月${day}日 ${hours}時${minutes}分`
	}

	return { formatDateTime }
}

export default useDateTimeFormat
