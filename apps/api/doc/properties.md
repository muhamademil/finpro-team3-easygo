# API Documentation - Properties

Dokumentasi untuk semua endpoint yang berhubungan dengan data properti.

## Get All Properties

Endpoint untuk mengambil daftar properti dengan berbagai filter dan urutan.

- **Endpoint**: `GET /api/properties`
- **Method**: `GET`
- **Deskripsi**: Mengembalikan daftar properti berdasarkan parameter query yang diberikan. Mendukung filter, sorting, dan pagination.

### Query Parameters (Opsional)

Bisa digunakan untuk mengkombinasikan parameter-parameter ini sesuai kebutuhan.

| Parameter  | Tipe   | Deskripsi                                                      | Contoh Nilai |
| :--------- | :----- | :------------------------------------------------------------- | :----------- |
| `limit`    | number | Membatasi jumlah data yang ditampilkan. Default: 10.           | `10`         |
| `page`     | number | Halaman yang ingin ditampilkan (untuk pagination). Default: 1. | `2`          |
| `city`     | string | Menyaring properti berdasarkan kota.                           | `Bandung`    |
| `category` | enum   | Menyaring berdasarkan kategori.                                | `VILLA`      |
| `sortBy`   | enum   | Mengurutkan hasil. Pilihan: `price`, `popularity`.             | `price`      |
| `orderBy`  | enum   | Arah pengurutan. Pilihan: `asc`, `desc`. Default: `asc`.       | `desc`       |
| `type`     | enum   | Untuk query khusus. Pilihan: `random`.                         | `random`     |

### Contoh Pemanggilan

- **Rekomendasi (Acak):** `/api/properties?type=random&limit=5`
- **Hits di Bandung:** `/api/properties?city=Bandung&sortBy=popularity&limit=5`
- **Harga Murah:** `/api/properties?sortBy=price&orderBy=asc&limit=5`

### Response Body (200 OK)

```json
{
  "message": "Properties fetched successfully",
  "data": [
    {
      "id": "uuid-properti-1",
      "name": "Villa Asri di Lembang",
      "city": "Bandung",
      "lowest_price": 500000,
      "is_recommended": true,
      "is_flash_sale": false,
      "images": [
        {
          "image_url": "[https://url-gambar.com/1.jpg](https://url-gambar.com/1.jpg)"
        }
      ]
      // ... field lain sesuai schema ...
    },
    {
      "id": "uuid-properti-2",
      "name": "Apartemen Tengah Kota"
      // ...
    }
  ]
}
```
