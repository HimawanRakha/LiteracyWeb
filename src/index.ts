// Mendefinisikan struktur objek untuk sebuah buku

export interface Book {
  id: string; // ID unik untuk setiap buku, bisa menggunakan crypto.randomUUID()
  title: string; // Judul buku
  author: string; // Nama penulis
  genre: string; // Genre buku
  pages: number; // Jumlah halaman
  coverImage: string; // URL gambar sampul (dalam kasus ini, base64 string dari upload)
}
