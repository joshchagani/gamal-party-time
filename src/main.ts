// Packages
import { intervalToDuration, isPast } from 'date-fns'

// Styles
import './reset.css'
import './style.css'

const PARTY_DATE = new Date(2021, 9, 1, 19, 0)
const FLASHING_TIMEOUT = 800
const ONE_SECOND = 1000

const day = document.querySelector<HTMLDivElement>('[data-time="day"]')!
const hour = document.querySelector<HTMLDivElement>('[data-time="hour"]')!
const minute = document.querySelector<HTMLDivElement>('[data-time="minute"]')!
const second = document.querySelector<HTMLDivElement>('[data-time="second"]')!

async function isItTimeToParty() {
	if (isPast(PARTY_DATE)) return setInterval(timeCountdown, ONE_SECOND)
	const clock = document.querySelector<HTMLDivElement>('#clock')!
	const party = document.querySelector<HTMLDivElement>('.party')!
	const { emojisplosions } = await import('emojisplosion')

	const explosionConfig = {
		emojis: ['🎉', '🎊', '💥'],
		physics: {
			fontSize: 90,
		},
	}
	party.innerHTML = `Gamal, it\'s <span role="img" aria-label="Party">🎉</span> time!`
	clock.remove()
	emojisplosions(explosionConfig)
	return setInterval(discoInferno, FLASHING_TIMEOUT)
}

function timeCountdown() {
	const { days, hours, minutes, seconds } = intervalToDuration({
		start: new Date(),
		end: PARTY_DATE,
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

function discoInferno() {
	const r = Math.floor(Math.random() * 255)
	const g = Math.floor(Math.random() * 255)
	const b = Math.floor(Math.random() * 255)
	document.documentElement.style.setProperty('--bg-color', `${r}, ${g}, ${b}`)
}

isItTimeToParty()
