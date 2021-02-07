import React from "react";

import { Button } from "reactstrap";

function MateriPage() {
  return (
    <>
      <div className="bungkus">
        <div class="konten">
          <nav class="baratas navbar-expand-lg navbar-light bg-light">
            {/* <button type="button" id="sidebarCollapse" class="btn btn-info">
              <i class="fa fa-align-justify"></i> <span>Menu</span>
            </button> */}
            <h3>Materi 1</h3>

            <button
              class="navbar-toggler float-right mt-2"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav ml-auto">
                <li class="nav-item active">
                  <a class="nav-link" href="/bab">
                    <i class="now-ui-icons files_single-copy-04"></i>{" "}
                    <span>Bab Materi</span>
                  </a>
                </li>
                <li class="nav-item active">
                  <a class="nav-link" href="/profil-page">
                    <i class="now-ui-icons users_single-02"></i>{" "}
                    <span>Profil</span>
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <div class="konten-bungkus">
            <h2>Pengenalan</h2>

            <p class="text-konten">
              Bismillah… Segala puji hanyalah milik Allah. Shalawat serta salam
              semoga senantiasa tercurah kepada Rasulullah, beserta keluarga dan
              para shahabat beliau, serta orang-orang yang mengikuti jalan
              beragama mereka dengan baik. Wa ba’du : Allah Ta’ala berfirman,
              إِنَّا أَنْزَلْنَاهُ قُرْآنًا عَرَبِيًّا لَعَلَّكُمْ تَعْقِلُونَ
              “Sesungguhnya Kami menurunkannya berupa Al Quran yang berbahasa
              Arab, agar kamu memahaminya” (QS.Yusuf : 2) Bahasa arab adalah
              bahasa Al Qur’an. Bahasa yang dipilih oleh Allah Ta’ala sebagai
              bahasa pengantar untuk menyampaikan agama-Nya kepada umat manusia.
              Allah Ta’ala juga memilih Rasul pilihan-Nya sebagai penutup para
              rasul dari bangsa arab. Beliau sampaikan sunnah-sunnah beliau
              dengan bahasa arab. Sehingga seluruh sumber hukum syari’at, yakni
              Al Qur’an dan As Sunnah, berbahasa arab. Sehingga mempelajari
              bahasa arab menjadi suatu kebutuhan yang tak terelakkan. Oleh
              sebab itu, para salaf dahulu memberi wejangan agar kita mau
              belajar bahasa arab. ‘Umar bin Khaththab radhiyallahu ‘anhu
              menulis surat kepada Abu Musa Al Asy’ariy radhiyallahu ‘anhuma
              yang berisi, “Amma ba’du, (Wahai Abu Musa) Pahamilah sunnah Nabi,
              dan dalamilah bahasa arab!” (dinukil dari Al Atsar Al ‘Arabiyyah
              li Diraasatil Lughah Al ‘Arabiyyah, hal. 9, Maktabah Syamilah)
            </p>

            <div class="line mb-2"></div>
            <h2>Apa itu Ilmu Nahwu?</h2>

            <p className="text-konten">
              Dari deskripsi di atas, sedikit tergambar apa itu ilmu nahwu. Ilmu
              nahwu adalah ilmu tentang kaidah-kaidah mengetahui
              kedudukan/jabatan suatu kata dalam kalimat, mengetahui
              bentuk/harakat huruf akhirnya, dan perubahannya. Maka yang dibahas
              di ilmu nahwu adalah bagian akhir suatu kata saja, apakah berubah
              ataukah tidak akan berubah. Jika harus berubah, bagaimana
              perubahannya? Contoh : Muhammadun (مُحَمَّدٌ) Kapan dibaca
              “Muhammadun”? Kapan “Muhammadan”? Kapan “Muhammadin”? Itu dibahas
              di nahwu. Sedangkan kenapa depannya dibaca “Muhammad”? Tidak
              “Mahimmud” misalnya? Itu dibahas di ilmu sharaf.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <div class="line"></div>
            <div className="text-right  d-flex justify-content-between">
              <Button color="info">
                <i class="now-ui-icons arrows-1_minimal-left"></i> Materi
                Sebelumnya
              </Button>
              <Button color="info">
                Lanjut Materi{" "}
                <i class="now-ui-icons arrows-1_minimal-right"></i>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MateriPage;
