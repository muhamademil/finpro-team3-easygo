# User API Specification (v1)

## Registrasi - Langkah 1: Inisiasi

- **Endpoint** : `POST /api/auth/register/initiate`
- **Deskripsi**: Langkah pertama registrasi. Menerima email dan peran (role) yang dipilih dari tab. Server akan membuat token registrasi yang unik dan mengirimkan email berisi link untuk melanjutkan ke langkah berikutnya.
- **Request Body**:
  ```json
  {
    "email": "calon.pengguna@example.com",
    "role": "TRAVELLER" // atau "TENANT"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "message": "Link untuk menyelesaikan pendaftaran telah dikirim ke email Anda. Silakan periksa kotak masuk Anda."
  }
  ```
- **Error Responses**:
  - `400 Bad Request`: Jika email tidak valid atau role tidak sesuai.
  - `409 Conflict`: Jika email tersebut sudah terdaftar di sistem.

## Registrasi - Langkah 2: Penyelesaian

- **Endpoint** : `POST /api/auth/register/complete`
- **Deskripsi**: Langkah kedua. Menerima token dari link email beserta data lengkap pengguna. Server akan memvalidasi token, membuat record User (dan Tenant jika perlu), lalu menandai akun sebagai terverifikasi.
- **Request Body**:
  ```json
  {
    "token": "token-unik-dari-link-email",
    "name": "Nama Lengkap Pengguna",
    "password": "passwordSuperAman123",
    "phone": "081234567890",
    "photo_url": "[https://url-foto-profil.com/image.png](https://url-foto-profil.com/image.png)",
    // Kolom di bawah ini hanya dikirim jika role-nya adalah TENANT
    "city": "Jakarta",
    "bank_account": "1234567890"
  }
  ```
- **Response (201 Created)**:
  ```json
  {
    "message": "Pendaftaran berhasil! Akun Anda telah dibuat dan diverifikasi. Silakan login.",
    "user": {
      "id": "uuid-pengguna-baru",
      "name": "Nama Lengkap Pengguna",
      "email": "calon.pengguna@example.com",
      "role": "TRAVELLER"
    }
  }
  ```
- **Error Responses**:
  - `400 Bad Request`: Jika token tidak valid, kedaluwarsa, atau data yang dikirim tidak lengkap/valid.

## Login

- **Endpoint** : `POST /api/auth/login`
- **Deskripsi**: Mengautentikasi pengguna dengan email dan password, lalu mengembalikan JWT.
- **Request Body**:
  ```json
  {
    "email": "pengguna.terdaftar@example.com",
    "password": "passwordSuperAman123"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "message": "Login berhasil.",
    "token": "jwt.token.panjang.akan.ada.di.sini"
  }
  ```
- **Error Responses**:
  - `401 Unauthorized`: Email tidak ditemukan atau password salah.

## Lupa Password - Langkah 1: Permintaan Token

- **Endpoint** : `POST /api/auth/forgot-password`
- **Deskripsi**: Memproses permintaan lupa password dan mengirimkan link reset ke email pengguna.
- **Request Body**:
  ```json
  {
    "email": "pengguna.terdaftar@example.com"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "message": "Jika email Anda terdaftar, link untuk reset password telah dikirimkan."
  }
  ```
- **Error Responses**:
  - `400 Bad Request`: Jika format email tidak valid.
  - `404 Not Found`: Jika email tidak ditemukan di sistem.

## Lupa Password - Langkah 2: Konfirmasi Reset

- **Endpoint** : `POST /api/auth/reset-password`
- **Deskripsi**: Menerima token reset dan password baru untuk memperbarui password pengguna.
- **Request Body**:
  ```json
  {
    "token": "token-reset-dari-url",
    "newPassword": "passwordSangatBaru456"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "message": "Password Anda telah berhasil direset. Silakan login."
  }
  ```
- **Error Responses**:
  - `400 Bad Request`: Token tidak valid, kedaluwarsa, atau password baru tidak memenuhi syarat.
