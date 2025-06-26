# API Documentation - Newsletter

Dokumentasi untuk endpoint yang berhubungan dengan langganan newsletter.

## Subscribe to Newsletter

- **Endpoint**: `POST /api/newsletter/subscribe`
- **Method**: `POST`
- **Deskripsi**: Mendaftarkan email baru untuk berlangganan newsletter.

### Request Body

```json
{
  "email": "calon.subscriber@example.com"
}
```

### Response Body (200 OK)

```json
{
  "message": "Terima kasih telah berlangganan newsletter kami!"
}
```

### Error Responses

- **`400 Bad Request`**: Jika format email tidak valid.
- **`409 Conflict`**: Jika email tersebut sudah pernah terdaftar sebelumnya.
