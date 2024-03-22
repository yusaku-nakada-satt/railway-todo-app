import React, { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { url } from '../const'
import { useNavigate, useParams } from 'react-router-dom'
import './editTask.scss'

export const EditTask = () => {
	const history = useNavigate()
	const { listId, taskId } = useParams()
	const [cookies] = useCookies()
	const [title, setTitle] = useState('')
	const [limit, setLimit] = useState('')
	const [detail, setDetail] = useState('')
	const [isDone, setIsDone] = useState()
	const [errorMessage, setErrorMessage] = useState('')
	const handleTitleChange = (e) => setTitle(e.target.value)
	const handleDetailChange = (e) => setDetail(e.target.value)
	const handleLimitChange = (day) => {
    const formattedLimit = dayjs(day).format('YYYY-MM-DDTHH:mm:ss') + 'Z';
    setLimit(formattedLimit);};
	const handleIsDoneChange = (e) => setIsDone(e.target.value === 'done')
	const onUpdateTask = () => {
		console.log(isDone)
		const data = {
			title: title,
			detail: detail,
			done: isDone,
			limit: limit
		}

		axios
			.put(`${url}/lists/${listId}/tasks/${taskId}`, data, {
				headers: {
					authorization: `Bearer ${cookies.token}`,
				},
			})
			.then((res) => {
				console.log(res.data)
				history('/')
			})
			.catch((err) => {
				setErrorMessage(`更新に失敗しました。${err}`)
			})
	}

	const onDeleteTask = () => {
		axios
			.delete(`${url}/lists/${listId}/tasks/${taskId}`, {
				headers: {
					authorization: `Bearer ${cookies.token}`,
				},
			})
			.then(() => {
				history('/')
			})
			.catch((err) => {
				setErrorMessage(`削除に失敗しました。${err}`)
			})
	}

	useEffect(() => {
		axios
			.get(`${url}/lists/${listId}/tasks/${taskId}`, {
				headers: {
					authorization: `Bearer ${cookies.token}`,
				},
			})
			.then((res) => {
				const task = res.data
				setTitle(task.title)
				setDetail(task.detail)
				setLimit(task.limit)
				setIsDone(task.done)
			})
			.catch((err) => {
				setErrorMessage(`タスク情報の取得に失敗しました。${err}`)
			})
	}, [])

	return (
		<div>
			<Header />
			<main className='edit-task'>
				<h2>タスク編集</h2>
				<p className='error-message'>{errorMessage}</p>
				<form className='edit-task-form'>
					<label>タイトル</label>
					<br />
					<input type='text' onChange={handleTitleChange} className='edit-task-title' value={title} />
					<br />
					<label>期限</label>
					<br />
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DemoContainer components={['DateTimePicker']} className="new-list-date-picker">
							<DateTimePicker
								label={limit || "期限が設定されていません"}
								onChange={handleLimitChange}
								defaultDate={limit}
							/>
						</DemoContainer>
					</LocalizationProvider>
					<label>詳細</label>
					<br />
					<textarea type='text' onChange={handleDetailChange} className='edit-task-detail' value={detail} />
					<br />
					<div>
						<input
							type='radio'
							id='todo'
							name='status'
							value='todo'
							onChange={handleIsDoneChange}
							checked={isDone === false ? 'checked' : ''}
						/>
						未完了
						<input
							type='radio'
							id='done'
							name='status'
							value='done'
							onChange={handleIsDoneChange}
							checked={isDone === true ? 'checked' : ''}
						/>
						完了
					</div>
					<button type='button' className='delete-task-button' onClick={onDeleteTask}>
						削除
					</button>
					<button type='button' className='edit-task-button' onClick={onUpdateTask}>
						更新
					</button>
				</form>
			</main>
		</div>
	)
}
