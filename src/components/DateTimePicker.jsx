import React from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
// import { styled } from '@mui/material/styles'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

// dayjs の設定
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Tokyo')

const DateTimePickerComponent = ({ handleLimitChange, limit }) => {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<DemoContainer components={['DateTimePicker']} className='new-list-date-picker'>
				<DateTimePicker
					label={limit || '期限が設定されていません'}
					onChange={handleLimitChange}
					timezone='Asia/Tokyo'
				/>
			</DemoContainer>
		</LocalizationProvider>
	)
}

export default DateTimePickerComponent
