import axios from 'axios'

const BASE_URL = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange'

export const fetchCurrencies = async (date = null, searchTerm = '') => {
  try {
    const formattedDate = date
      ? `date=${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`
      : ''
    const formattedSearchTerm = searchTerm ? `&valcode=${searchTerm}` : ''
    const response = await axios.get(`${BASE_URL}?${formattedDate}${formattedSearchTerm}&json`)

    return response.data
  } catch (error) {
    console.error('Error fetching currencies:', error)
    throw error
  }
}
