// =====================================
// KATALOG MARTABAK MEDAN
// =====================================

// GANTI DENGAN NOMOR WHATSAPP PENJUAL
const WHATSAPP_NUMBER = "6281234567890";

// DATA PRODUK MARTABAK
const products = [
{
id:1,
name:"Martabak Cokelat",
category:"Martabak Manis",
price:25000,
stock:15,
desc:"Cokelat melimpah dan kulit lembut.",
image:"https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600"
},
{
id:2,
name:"Martabak Keju",
category:"Martabak Manis",
price:28000,
stock:12,
desc:"Keju gurih dengan susu manis.",
image:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600"
},
{
id:3,
name:"Martabak Cokelat Keju",
category:"Martabak Manis",
price:32000,
stock:10,
desc:"Perpaduan cokelat dan keju.",
image:"https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600"
},
{
id:4,
name:"Martabak Kacang",
category:"Martabak Manis",
price:27000,
stock:8,
desc:"Taburan kacang renyah.",
image:"https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600"
},
{
id:5,
name:"Martabak Oreo",
category:"Martabak Manis",
price:35000,
stock:9,
desc:"Topping Oreo yang lezat.",
image:"https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600"
},
{
id:6,
name:"Martabak Red Velvet",
category:"Martabak Manis",
price:38000,
stock:7,
desc:"Rasa red velvet spesial.",
image:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600"
},
{
id:7,
name:"Martabak Telur Ayam",
category:"Martabak Telur",
price:30000,
stock:11,
desc:"Telur ayam dan isian gurih.",
image:"https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=600"
},
{
id:8,
name:"Martabak Telur Spesial",
category:"Martabak Telur",
price:40000,
stock:6,
desc:"Martabak telur daging spesial.",
image:"https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600"
},
{
id:9,
name:"Martabak Pisang Cokelat",
category:"Martabak Manis",
price:30000,
stock:8,
desc:"Pisang manis dan cokelat.",
image:"https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=600"
},
{
id:10,
name:"Martabak Tiramisu",
category:"Martabak Manis",
price:38000,
stock:5,
desc:"Martabak dengan rasa tiramisu.",
image:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600"
}
];

// DATA LOKAL
let cart = JSON.parse(localStorage.getItem("martabakCart")) || [];
let savedStocks = JSON.parse(localStorage.getItem("martabakStocks")) || {};

products.forEach(p=>{
if(savedStocks[p.id]!==undefined)p.stock=savedStocks[p.id];
});

// FORMAT RUPIAH
function rupiah(n){
return "Rp"+Number(n).toLocaleString("id-ID");
}

// SIMPAN DATA
function saveData(){
localStorage.setItem("martabakCart",JSON.stringify(cart));
const stocks={};
products.forEach(p=>stocks[p.id]=p.stock);
localStorage.setItem("martabakStocks",JSON.stringify(stocks));
}

// TAMPILKAN PRODUK
function renderProducts(){
const container=document.getElementById("productList");

container.innerHTML=products.map(p=>{
let color=p.stock===0?"red":p.stock<5?"#d59b32":"#6a9a69";
let status=p.stock===0?"Stok Habis":p.stock<5?"Stok Menipis":"Stok Tersedia";

return `
<div class="col-6 col-md-4 col-lg-3">
<div class="card product-card">
<img src="${p.image}" class="product-img"
alt="${p.name}" loading="lazy"
onerror="this.onerror=null;this.src='https://placehold.co/600x400/f8dfdf/765345?text=Martabak';">
<div class="card-body">
<span class="badge badge-soft">${p.category}</span>
<h6 class="product-name mt-3">${p.name}</h6>
<p class="description">${p.desc}</p>
<div class="price">${rupiah(p.price)}</div>
<div class="small mb-3 mt-2" style="color:${color}">● ${status} (${p.stock})</div>
<button class="btn soft-btn w-100"
onclick="addToCart(${p.id})"
${p.stock===0?"disabled":""}>
${p.stock===0?"Stok Habis":"+ Tambah"}
</button>
</div>
</div>
</div>`;
}).join("");
}

// TAMBAH PRODUK
function addToCart(id){
const p=products.find(x=>x.id===id);
if(!p||p.stock<=0){
alert("Stok martabak habis!");
return;
}
const item=cart.find(x=>x.id===id);
if(item){
if(item.qty>=p.stock){
alert("Stok tidak mencukupi!");
return;
}
item.qty++;
}else{
cart.push({id:p.id,name:p.name,price:p.price,qty:1});
}
saveData();
renderAll();
}

// UBAH JUMLAH
function changeQty(id,amount){
const item=cart.find(x=>x.id===id);
const p=products.find(x=>x.id===id);
if(!item||!p)return;
if(item.qty+amount<=0){
removeItem(id);
return;
}
if(item.qty+amount>p.stock){
alert("Jumlah melebihi stok!");
return;
}
item.qty+=amount;
saveData();
renderAll();
}

// HAPUS PRODUK
function removeItem(id){
if(!confirm("Hapus martabak ini dari keranjang?"))return;
cart=cart.filter(x=>x.id!==id);
saveData();
renderAll();
}

// TOTAL
function getTotal(){
return cart.reduce((sum,x)=>sum+x.price*x.qty,0);
}
function getCount(){
return cart.reduce((sum,x)=>sum+x.qty,0);
}

// KERANJANG
function renderCart(){
const container=document.getElementById("cartItems");
document.getElementById("cartCount").textContent=getCount();
document.getElementById("totalItems").textContent=getCount();
document.getElementById("grandTotal").textContent=rupiah(getTotal());

if(cart.length===0){
container.innerHTML='<div class="text-center text-secondary py-4">🛍️<br>Keranjang masih kosong.</div>';
updateCash();
return;
}

container.innerHTML=cart.map(x=>`
<div class="cart-item d-flex justify-content-between gap-2">
<div>
<b>${x.name}</b>
<div class="small text-secondary">${rupiah(x.price)} x ${x.qty}</div>
<div class="d-flex gap-2 align-items-center mt-2">
<button class="qty-btn" onclick="changeQty(${x.id},-1)">−</button>
<b>${x.qty}</b>
<button class="qty-btn" onclick="changeQty(${x.id},1)">+</button>
</div>
</div>
<div class="text-end">
<b>${rupiah(x.price*x.qty)}</b><br>
<button class="remove-btn mt-2" onclick="removeItem(${x.id})">🗑 Hapus</button>
</div>
</div>
`).join("");
updateCash();
}

// METODE PEMBAYARAN
function getPayment(){
return document.querySelector('input[name="payment"]:checked').value;
}

function updatePayment(){
const payment=getPayment();
document.getElementById("cashSection").hidden=payment!=="Tunai";
document.getElementById("transferSection").hidden=payment==="Tunai";

const info=document.getElementById("paymentInfo");
if(payment==="QRIS"){
info.textContent="Minta kode QRIS resmi dari penjual untuk menyelesaikan pembayaran.";
}
if(payment==="Transfer Bank"){
info.textContent="Hubungi penjual untuk mendapatkan nomor rekening dan informasi transfer.";
}
updateCash();
}

// KALKULATOR KEMBALIAN
function updateCash(){
const cash=Number(document.getElementById("cashAmount").value)||0;
const total=getTotal();
const msg=document.getElementById("cashMessage");
const change=document.getElementById("changeAmount");

if(getPayment()!=="Tunai"){
msg.textContent="Pembayaran non-tunai.";
change.textContent=rupiah(0);
return;
}

if(total===0){
msg.textContent="Belum ada pembelian.";
change.textContent=rupiah(0);
}else if(cash>=total){
msg.textContent="✓ Pembayaran mencukupi.";
msg.style.color="green";
change.textContent=rupiah(cash-total);
}else{
msg.textContent="✗ Uang kurang "+rupiah(total-cash);
msg.style.color="red";
change.textContent=rupiah(0);
}
}

// PESAN WHATSAPP
function checkoutWhatsApp(){
if(cart.length===0){
alert("Keranjang masih kosong!");
return;
}

const name=document.getElementById("customerName").value.trim();
const phone=document.getElementById("customerPhone").value.trim();
const address=document.getElementById("customerAddress").value.trim();

if(!name||!phone||!address){
alert("Lengkapi nama, nomor WhatsApp, dan alamat!");
return;
}

if(phone.replace(/\D/g,"").length<9){
alert("Nomor WhatsApp tidak valid!");
return;
}

const total=getTotal();
const payment=getPayment();

if(payment==="Tunai"){
const cash=Number(document.getElementById("cashAmount").value)||0;
if(cash<total){
alert("Uang pembayaran belum cukup!");
return;
}
}

let message="HALO MARTABAK MEDAN! 🥞\n";
message+="Saya ingin memesan:\n\n";
message+="Nama: "+name+"\n";
message+="Nomor HP: "+phone+"\n";
message+="Alamat: "+address+"\n\n";
message+="DAFTAR MARTABAK:\n";

cart.forEach((x,i)=>{
message+=(i+1)+". "+x.name+"\n";
message+=x.qty+" x "+rupiah(x.price)+" = "+rupiah(x.qty*x.price)+"\n";
});

message+="\nTOTAL: "+rupiah(total)+"\n";
message+="Pembayaran: "+payment+"\n";

if(payment==="Tunai"){
const cash=Number(document.getElementById("cashAmount").value);
message+="Uang: "+rupiah(cash)+"\n";
message+="Kembalian: "+rupiah(cash-total)+"\n";
}else{
message+="Status: Menunggu konfirmasi pembayaran.\n";
}

message+="\nMohon konfirmasi pesanan saya. Terima kasih! ❤️";

const url="https://wa.me/"+WHATSAPP_NUMBER+"?text="+encodeURIComponent(message);
window.open(url,"_blank");
}

// CETAK NOTA
function printReceipt(){
if(cart.length===0){
alert("Keranjang kosong!");
return;
}
const name=document.getElementById("customerName").value.trim();
if(!name){
alert("Masukkan nama pembeli!");
return;
}
const total=getTotal();
const payment=getPayment();
if(payment==="Tunai"){
const cash=Number(document.getElementById("cashAmount").value)||0;
if(cash<total){
alert("Pembayaran belum cukup!");
return;
}
}

let html="<p>Nama: "+name+"</p>";
html+="<p>Tanggal: "+new Date().toLocaleString("id-ID")+"</p>";
html+="<p>Metode: "+payment+"</p><hr>";

cart.forEach(x=>{
html+=`<p>${x.name} (${x.qty}x) - ${rupiah(x.price*x.qty)}</p>`;
});

html+="<hr><h3>Total: "+rupiah(total)+"</h3>";

if(payment==="Tunai"){
const cash=Number(document.getElementById("cashAmount").value);
html+="<p>Uang: "+rupiah(cash)+"</p>";
html+="<p>Kembalian: "+rupiah(cash-total)+"</p>";
}

document.getElementById("receiptContent").innerHTML=html;
const receipt=document.getElementById("receipt");
receipt.style.display="block";
window.print();
receipt.style.display="none";
}

// JALANKAN APLIKASI
function renderAll(){
renderProducts();
renderCart();
}

document.addEventListener("DOMContentLoaded",()=>{
renderAll();

document.querySelectorAll('input[name="payment"]').forEach(input=>{
input.addEventListener("change",updatePayment);
});

document.getElementById("cashAmount").addEventListener("input",updateCash);
updatePayment();
});