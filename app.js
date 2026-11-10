
// ======================================
// DATA PRODUK SWEET CAKE
// ======================================

const products = [
    {
        id: 1,
        name: "Black Forest",
        price: 120000,
        category: "Kue Cokelat",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600",
        description: "Kue cokelat lembut dengan krim dan hiasan cokelat."
    },
    {
        id: 2,
        name: "Strawberry Cake",
        price: 135000,
        category: "Kue Strawberry",
        image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=600",
        description: "Kue dengan krim lembut dan buah strawberry."
    },
    {
        id: 3,
        name: "Vanilla Cake",
        price: 110000,
        category: "Kue Vanilla",
        image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600",
        description: "Kue vanilla dengan krim manis dan lembut."
    },
    {
        id: 4,
        name: "Pink Birthday Cake",
        price: 150000,
        category: "Kue Custom",
        image: "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=600",
        description: "Kue cantik dengan dekorasi warna pink."
    },
    {
        id: 5,
        name: "Chocolate Birthday",
        price: 125000,
        category: "Kue Cokelat",
        image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600",
        description: "Kue cokelat dengan lapisan krim cokelat."
    },
    {
        id: 6,
        name: "Cream Birthday",
        price: 140000,
        category: "Kue Cream",
        image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=600",
        description: "Kue ulang tahun dengan dekorasi krim."
    },
    {
        id: 7,
        name: "Mini Birthday Cake",
        price: 65000,
        category: "Mini Cake",
        image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=600",
        description: "Kue mini untuk perayaan sederhana."
    },
    {
        id: 8,
        name: "Special Birthday Cake",
        price: 160000,
        category: "Special Cake",
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600",
        description: "Kue spesial untuk hari ulang tahun."
    }
];

// ======================================
// PENGATURAN
// ======================================

const WHATSAPP_NUMBER = "6281234567890";

let cart = [];

// ======================================
// FORMAT RUPIAH
// ======================================

function rupiah(angka) {
    return "Rp" + angka.toLocaleString("id-ID");
}

// ======================================
// TAMPILKAN PRODUK
// ======================================

function renderProducts() {
    const productList = document.getElementById("productList");

    if (!productList) return;

    productList.innerHTML = products.map(product => `
        <div class="col-6 col-md-4 col-lg-3">
            <div class="card product-card">
                <img
                    class="product-img"
                    src="${product.image}"
                    alt="${product.name}"
                    onerror="this.src='https://placehold.co/600x400?text=Sweet+Cake'"
                >

                <div class="card-body">
                    <span class="badge badge-soft">
                        ${product.category}
                    </span>

                    <h6 class="product-name mt-3">
                        ${product.name}
                    </h6>

                    <p class="description">
                        ${product.description}
                    </p>

                    <div class="price">
                        ${rupiah(product.price)}
                    </div>

                    <button
                        class="btn soft-btn w-100 mt-2"
                        onclick="pesan(${product.id})">
                        + Tambah Keranjang
                    </button>
                </div>
            </div>
        </div>
    `).join("");
}

// ======================================
// TAMBAHKAN PRODUK KE KERANJANG
// ======================================

function pesan(id) {
    const product = products.find(p => p.id === id);

    if (!product) return;

    const item = cart.find(p => p.id === id);

    if (item) {
        item.qty++;
    } else {
        cart.push({
            id: product.id,
            nama: product.name,
            harga: product.price,
            qty: 1
        });
    }

    renderCart();

    alert(product.name + " berhasil ditambahkan!");
}

// ======================================
// TAMPILKAN KERANJANG
// ======================================

function renderCart() {
    const container = document.getElementById("cartItems");

    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = "Keranjang masih kosong.";
    } else {
        container.innerHTML = cart.map((item, index) => `
            <div class="cart-item d-flex justify-content-between gap-2">

                <div>
                    <b>${item.nama}</b>

                    <div>
                        ${rupiah(item.harga)} x ${item.qty}
                    </div>

                    <button
                        class="qty-btn mt-2"
                        onclick="ubah(${index}, -1)">
                        −
                    </button>

                    <span class="mx-2">${item.qty}</span>

                    <button
                        class="qty-btn mt-2"
                        onclick="ubah(${index}, 1)">
                        +
                    </button>
                </div>

                <div class="text-end">
                    <b>${rupiah(item.harga * item.qty)}</b>

                    <br>

                    <button
                        class="btn btn-sm btn-danger mt-2"
                        onclick="hapus(${index})">
                        Hapus
                    </button>
                </div>

            </div>
        `).join("");
    }

    hitungTotal();
}

// ======================================
// TAMBAH / KURANG JUMLAH
// ======================================

function ubah(index, jumlah) {
    if (!cart[index]) return;

    cart[index].qty += jumlah;

    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }

    renderCart();
}

// ======================================
// HAPUS PRODUK
// ======================================

function hapus(index) {
    cart.splice(index, 1);
    renderCart();
}

// ======================================
// HITUNG TOTAL PEMBAYARAN
// ======================================

function hitungTotal() {
    const total = cart.reduce(
        (sum, item) => sum + (item.harga * item.qty),
        0
    );

    document.getElementById("total").textContent = rupiah(total);

    return total;
}

// ======================================
// CHECKOUT WHATSAPP
// ======================================

function checkout() {
    if (cart.length === 0) {
        alert("Keranjang masih kosong!");
        return;
    }

    const nama = document.getElementById("nama").value.trim();
    const nomor = document.getElementById("nomor").value.trim();
    const alamat = document.getElementById("alamat").value.trim();

    if (!nama || !nomor || !alamat) {
        alert("Silakan lengkapi data pembeli!");
        return;
    }

    const total = hitungTotal();

    let pesanWA = `
HALO SWEET CAKE! 🎂

Saya ingin memesan kue ulang tahun.

Nama: ${nama}
Nomor HP: ${nomor}
Alamat: ${alamat}

DAFTAR PESANAN:
`;

    cart.forEach((item, index) => {
        pesanWA += `
${index + 1}. ${item.nama}
Jumlah: ${item.qty}
Harga: ${rupiah(item.harga * item.qty)}
`;
    });

    pesanWA += `
TOTAL PEMBAYARAN: ${rupiah(total)}

Terima kasih!
`;

    const url = "https://wa.me/" +
        WHATSAPP_NUMBER +
        "?text=" +
        encodeURIComponent(pesanWA);

    window.open(url, "_blank");
}

// ======================================
// JALANKAN WEBSITE
// ======================================

document.addEventListener("DOMContentLoaded", function() {
    renderProducts();
    renderCart();
});
