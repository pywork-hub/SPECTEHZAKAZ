export const getCoordinates = async (address: string) => {
  const response = await fetch(
    `https://geocode-maps.yandex.ru/1.x/?apikey=${process.env.YANDEX_TOKEN}&format=json&geocode=${encodeURIComponent(address)}`
  )
  const data = await response.json()
  const pos = data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
  const [lon, lat] = pos.split(' ')

  return { lon, lat }
}