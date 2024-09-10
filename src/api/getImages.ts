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

export function getImages(page: number, limit: number) {
  return fetch('/api/images')
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      const startIndex = (page - 1) * limit
      const endIndex = page * limit

      const paginatedData = data.slice(startIndex, endIndex)
      return paginatedData as CardContent[]
    })
}
