const useRemainingTime = () => {
	const getRemainingTime = (taskLimit) => {
		const limitDate = new Date(taskLimit)
		const currentDate = new Date()

		const diffInMilliseconds = limitDate - currentDate
		if (diffInMilliseconds < 0) {
			return 'タスクの期限が過ぎています。再設定してください。'
		}

		const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60))
		const diffInHours = Math.floor(diffInMinutes / 60)
		const diffInDays = Math.floor(diffInHours / 24)

		let remainingTime = ''
		if (diffInDays > 0) remainingTime += `${diffInDays}日 `
		if (diffInHours % 24 > 0) remainingTime += `${diffInHours % 24}時間 `
		if (diffInMinutes % 60 > 0) remainingTime += `${diffInMinutes % 60}分`

		return remainingTime
	}
	return { getRemainingTime }
}

export default useRemainingTime
