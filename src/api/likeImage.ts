/**
 * Sends a request to like an image with the specified ID.
 * @param id The ID of the image to like.
 * @returns A promise that resolves to the response from the server.
 */
export async function likeImage(id: number) {
  try {
    const response = await fetch(`/api/images/${id}/likes`, {
      method: 'POST',
    })
    return response
  } catch (error) {
    return error
  }
}
