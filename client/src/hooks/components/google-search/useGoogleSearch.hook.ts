import type { IGoogleSearchHook } from '@/shared/interfaces/hooks/google-search/google-search.interface'
import { useEffect, useState, type ChangeEvent } from 'react'

export const useGoogleSearch = ({
  allowedRegions,
  value,
  onChange,
}: IGoogleSearchHook) => {
  const [input, setInput] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])

  useEffect(() => {
    if (value) {
      setInput(value)
    }
  }, [value])

	const fetchSuggestions = async (query: string) => {
		if (!query.trim()) {
			setSuggestions([])
			return
		}

		const url = `https://geocode-maps.yandex.ru/1.x/?apikey=${process.env.YANDEX_TOKEN}&format=json&geocode=${encodeURIComponent(
			query
		)}&results=20&lang=ru_RU`

		try {
			const response = await fetch(url)
			const data = await response.json()

			const items = data?.response?.GeoObjectCollection?.featureMember ?? []

			const addresses = items
				.map((item: any) => {
					const geo = item.GeoObject
					const meta = geo?.metaDataProperty?.GeocoderMetaData
					const text = meta?.text
					const country = meta?.Address?.country_code

					if (country !== 'RU' || !text) return null

					const isAllowed = allowedRegions.some(region => text.includes(region.label))

					return isAllowed ? text : null
				})
				.filter(Boolean)

			setSuggestions(addresses as string[])
		} catch (err) {
			console.error('Ошибка Яндекс Геокодера:', err)
			setSuggestions([])
		}
	}

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInput(newValue)
    onChange('')
    fetchSuggestions(newValue)
  }

  const onSelect = (address: string) => {
    setInput(address)
    setSuggestions([])
    onChange(address)
  }

  return {
    input,
    suggestions,
    handleChange,
    onSelect,
  }
}
