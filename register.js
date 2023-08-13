//Author : Muh Islaturrahman
//Source : Boostrap, Javacript
//version 1.0
//descripsion : program menambahkan data peserta beasiswa

//menangkap tombol submit
const btnSubmit = document.getElementById('submit');

//menangkap element input pada form index html berdasarkan ID
const nama = document.getElementById('nama');
const email = document.getElementById('email');
const semester = document.getElementById('semester');
const ipk = document.getElementById('ipk');
const beasiswa = document.getElementById('jenis-beasiswa');
const file = document.getElementById('file');
const table = document.getElementById('table-view');
let no = 0;

//inisialisasi array untuk menyimpan data user yang diinput
const user = []

//handle button submit
btnSubmit.addEventListener('click', () => {
    //management Error menggunakan Try catch
    try {
        //parse ipk ke tipe float
        var ipkUp = parseFloat(ipk.value);
        tambahDataUser(ipkUp);
    } catch (e) {
        errorHandle(`Maaf Terjadi Kesalahan saat menambahkan data : [` + e + `]`)
    } finally {
        clearForm()
        updateForm()
    }
})

//ceck performance
function checkPerformance(star, end) {
    const score = end - star
    return score
}

//add data to Objek
function tambahDataUser(ipk) {
    const start = performance.now();
    //kondisi cek dengan memanggil fungsi checkIpk() jika true maka tambahkan data pendaftar false tidak tampilkan peringatan tdk memenuhi syarat
    if (checkIpk(ipk)) {
        //menambahkan data ke array user dengan beberapa nilai berbentuk objek
        user.push({
            no: no += 1,
            nama: nama.value, //objek nama
            email: email.value,//objek email
            semester: semester.value,//objek semester
            ipk: ipk,// objek ipk
            beasiswa: beasiswa.value,//objek beasiswa
            file: file.value//objek value
        })
        //panggil fungsi tambahkan data register
        viewUser(user)
        console.log(user)

        //performance akhir
        const end = performance.now();
        console.log("Performa Eksekusi ", checkPerformance(start, end), " ms")
    } else {
        //tampilkan 
        errorHandle("Maaf IPK anda belum memenuhi Syarat untuk Daftar Beasiswa")
    }
}

//data display user
function viewUser(user) {
    //hapus konten table sebelumnya
    table.innerHTML = ""
    //buat perulangan dari jumlah data user
    for (const entry of user) {
        //buat baris baru
        const newRow = document.createElement('tr');
        //buat perulangan tangkap data objek user
        for (const property in entry) {
            //buat colum baru
            const data = document.createElement('td');
            //masukkan konten data user ke kolom baru
            data.textContent = entry[property];
            //masukkan colom baru ke dalam baris baru
            newRow.appendChild(data);
        }
        //tambahkan baris baru ke tabel
        table.appendChild(newRow);
    }
}

function updateForm(dt) {
    //update IPK dari funngis Math Random
    const updateIPK = parseFloat(Math.random() * (4 - 2) + 2).toFixed(2)
    ipk.value = updateIPK
    updateIPK > 3.4 ? nama.focus() : ipk.focus()
}

//bersihkan form saat data telah ditambahkan
function clearForm() {
    nama.value = ""
    email.value = ""
    semester.value = ""
    beasiswa.value = ""
    file.value = ""
}

//fungsi cek ipk jika ipk < 3.4 atau ipk > 4 bernilai false (tidak memenuhi) selain dr itu bernilai true maka bisa mendaftar
function checkIpk(ipk) {
    return (ipk < 3.4) ? false : (ipk > 4) ? false : true
}

function errorHandle(message) {
    alert(message)
}
