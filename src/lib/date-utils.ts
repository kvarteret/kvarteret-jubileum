import { pipe } from 'remeda'

export const monthNames = [
	'Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni',
	'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'
] as const;

type MonthMap = Record<string, number>;

export const NORWEGIAN_MONTHS: MonthMap = {
	'jan': 0, 'januar': 0,
	'feb': 1, 'februar': 1,
	'mar': 2, 'mars': 2,
	'apr': 3, 'april': 3,
	'mai': 4,
	'jun': 5, 'juni': 5,
	'jul': 6, 'juli': 6,
	'aug': 7, 'august': 7,
	'sep': 8, 'september': 8,
	'okt': 9, 'oktober': 9,
	'nov': 10, 'november': 10,
	'des': 11, 'desember': 11
} as const;

const normalizeString = (str: string): string => 
	str?.toLowerCase().trim() ?? '';

const parseDate = (str: string): Date => {
	if (NORWEGIAN_MONTHS[str] !== undefined) {
		return new Date(2024, NORWEGIAN_MONTHS[str], 1)
	}
	
	const [day, monthPart] = str.split('.')
	const month = monthPart?.trim()
	
	return month && month in NORWEGIAN_MONTHS
		? new Date(2024, NORWEGIAN_MONTHS[month], parseInt(day))
		: new Date(0)
}

const createDateInfo = (date: Date, originalStr: string) => ({
	day: date.getDate(),
	month: monthNames[date.getMonth()],
	originalStr
})

const formatDate = ({ day, month, originalStr }: { day: number; month: string; originalStr: string }): string =>
	day === 1 && !/\d/.test(originalStr)
		? month
		: `${day}. ${month}`

export const parseNorwegianDate = (dateStr: string): Date => 
	pipe(dateStr, normalizeString, parseDate)

export const formatNorwegianDate = (dateStr: string): string =>
	dateStr === 'Udatert' 
		? dateStr
		: pipe(
			dateStr,
			parseNorwegianDate,
			(date: Date) => createDateInfo(date, dateStr),
			formatDate
		)
