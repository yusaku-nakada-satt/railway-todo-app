import { useState, useEffect } from 'react'

// 日付を
const useRemainingTime = (taskLimit) => {
	const [remainingTime, setRemainingTime] = useState('')

	useEffect(() => {
		const limitDate = new Date(taskLimit)
		const currentDate = new Date()

		const diffInMilliseconds = limitDate - currentDate
		if (diffInMilliseconds < 0) {
			setRemainingTime('タスクの期限が過ぎています。再設定してください。')
			return
		}

		const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60))
		const diffInHours = Math.floor(diffInMinutes / 60)
		const diffInDays = Math.floor(diffInHours / 24)

		let formatted = ''
		if (diffInDays > 0) formatted += `${diffInDays}日 `
		if (diffInHours % 24 > 0) formatted += `${diffInHours % 24}時間 `
		if (diffInMinutes % 60 > 0) formatted += `${diffInMinutes % 60}分`

		setRemainingTime(formatted)
	}, [taskLimit])

	return remainingTime
}

export default useRemainingTime
