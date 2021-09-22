// Packages
import { intervalToDuration } from 'date-fns'

// Styles
import './reset.css'
import './style.css'

const day = document.querySelector<HTMLDivElement>('[data-time="day"]')!
const hour = document.querySelector<HTMLDivElement>('[data-time="hour"]')!
const minute = document.querySelector<HTMLDivElement>('[data-time="minute"]')!
const second = document.querySelector<HTMLDivElement>('[data-time="second"]')!

function timeCountdown() {
	const { days, hours, minutes, seconds } = intervalToDuration({
		start: new Date(),
		end: new Date(2021, 9, 1, 19, 0),
	})

	const splitDays = digitSplitter(days)
	const splitHours = digitSplitter(hours)
	const splitMinutes = digitSplitter(minutes)
	const splitSeconds = digitSplitter(seconds)

	day.innerHTML = `<span class='digit'>${splitDays[0]}</span><span class='digit'>${splitDays[1]}</span>`
	hour.innerHTML = `<span class='digit'>${splitHours[0]}</span><span class='digit'>${splitHours[1]}</span>`
	minute.innerHTML = `<span class='digit'>${splitMinutes[0]}</span><span class='digit'>${splitMinutes[1]}</span>`
	second.innerHTML = `<span class='digit'>${splitSeconds[0]}</span><span class='digit'>${splitSeconds[1]}</span>`
}

function digitSplitter(num: number = 0): string[] {
	return num
		.toLocaleString('en-US', {
			minimumIntegerDigits: 2,
			useGrouping: false,
		})
		.split('')
}

setInterval(timeCountdown, 1000)
