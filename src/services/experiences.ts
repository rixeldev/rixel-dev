import { getI18N } from '@/languages/index'
import { type Experience } from '../interfaces/experience'

export const experiencesService = (currentLocale?: string): Experience[] => {
	const i18n = getI18N({ currentLocale })

	return [
		{
			title: i18n.EXPERIENCE_TITLE_3,
			date: i18n.EXPERIENCE_DATE_CURRENT,
			description: i18n.EXPERIENCE_DESC_3,
		},
		{
			title: i18n.EXPERIENCE_TITLE_4,
			date: i18n.EXPERIENCE_DATE_2024_08,
			description: i18n.EXPERIENCE_DESC_4,
		},
		{
			title: i18n.EXPERIENCE_TITLE_2,
			date: i18n.EXPERIENCE_DATE_2023_05,
			description: i18n.EXPERIENCE_DESC_2,
		},
		{
			title: i18n.EXPERIENCE_TITLE_1,
			date: i18n.EXPERIENCE_DATE_2019_02,
			description: i18n.EXPERIENCE_DESC_1,
		},
	]
}
