/**
 * This code exports an interface called CardContent, which defines the structure of card data.
 * It also exports a function called getImages, which fetches images from the '/api/images' endpoint,
 * paginates the data based on the provided page and limit parameters, and returns the paginated data as an array of CardContent objects.
 */
export interface CardContent {
  type: string
  id: number
  title: string
  author: string
  created_at: string
  main_attachment: {
    big: string
    small: string
  }
  likes_count: number
  liked: boolean
  links: {
    rel: string
    uri: string
    methods: string
  }[]
}

export async function getImages(page: number, limit: number) {
  const response = await fetch('/api/images')
  const data = await response.json()
  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  const paginatedData = data.slice(startIndex, endIndex)
  return paginatedData as CardContent[]
}
