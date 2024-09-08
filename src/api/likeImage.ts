

export function likeImage(id: number) {
    return fetch(`/api/images/${id}/likes`, {
        method: 'POST',
    })
    .then((response) => {
        return response
    })
    .catch((error) => error);
}