
const LOCALE = document.documentElement.lang || 'en';
const PRODUCTS = [{"id": "solar-charger", "price": 49.0, "images": ["img/solar.svg"], "name": {"en": "Solar Phone Charger", "ru": "\u0421\u043e\u043b\u043d\u0435\u0447\u043d\u043e\u0435 \u0437\u0430\u0440\u044f\u0434\u043d\u043e\u0435 \u0434\u043b\u044f \u0442\u0435\u043b\u0435\u0444\u043e\u043d\u0430", "et": "P\u00e4ikese laadija telefonile"}, "desc": {"en": "Portable solar charger for phones \u2014 compact, durable, eco-friendly.", "ru": "\u041f\u043e\u0440\u0442\u0430\u0442\u0438\u0432\u043d\u043e\u0435 \u0441\u043e\u043b\u043d\u0435\u0447\u043d\u043e\u0435 \u0437\u0430\u0440\u044f\u0434\u043d\u043e\u0435 \u2014 \u043a\u043e\u043c\u043f\u0430\u043a\u0442\u043d\u043e\u0435, \u043d\u0430\u0434\u0451\u0436\u043d\u043e\u0435, \u044d\u043a\u043e\u043b\u043e\u0433\u0438\u0447\u043d\u043e\u0435.", "et": "Kaasaskantav p\u00e4ikese laadija telefonile \u2014 kompaktne, vastupidav, keskkonnas\u00f5bralik."}}, {"id": "water-bottle", "price": 25.0, "images": ["img/bottle.svg"], "name": {"en": "Reusable Water Bottle", "ru": "\u041c\u043d\u043e\u0433\u043e\u0440\u0430\u0437\u043e\u0432\u0430\u044f \u0431\u0443\u0442\u044b\u043b\u043a\u0430", "et": "Taaskasutatav joogipudel"}, "desc": {"en": "Insulated stainless steel bottle \u2014 keeps drinks hot or cold.", "ru": "\u0422\u0435\u0440\u043c\u043e\u0431\u0443\u0442\u044b\u043b\u043a\u0430 \u0438\u0437 \u043d\u0435\u0440\u0436\u0430\u0432\u0435\u0439\u043a\u0438 \u2014 \u0434\u0435\u0440\u0436\u0438\u0442 \u0442\u0435\u043f\u043b\u043e \u0438 \u0445\u043e\u043b\u043e\u0434.", "et": "Roostevabast terasest termopudel \u2014 hoiab joogi kuumana v\u00f5i k\u00fclmana."}}, {"id": "desk-lamp", "price": 79.0, "images": ["img/lamp.svg"], "name": {"en": "Minimal Desk Lamp", "ru": "\u041c\u0438\u043d\u0438\u043c\u0430\u043b\u0438\u0441\u0442\u0438\u0447\u043d\u0430\u044f \u043d\u0430\u0441\u0442\u043e\u043b\u044c\u043d\u0430\u044f \u043b\u0430\u043c\u043f\u0430", "et": "Minimalistlik laualamp"}, "desc": {"en": "Adjustable LED lamp with warm light \u2014 ideal for focused work.", "ru": "\u0420\u0435\u0433\u0443\u043b\u0438\u0440\u0443\u0435\u043c\u0430\u044f \u0441\u0432\u0435\u0442\u043e\u0434\u0438\u043e\u0434\u043d\u0430\u044f \u043b\u0430\u043c\u043f\u0430 \u0441 \u0442\u0451\u043f\u043b\u044b\u043c \u0441\u0432\u0435\u0442\u043e\u043c \u2014 \u0438\u0434\u0435\u0430\u043b\u044c\u043d\u043e \u0434\u043b\u044f \u0440\u0430\u0431\u043e\u0442\u044b.", "et": "Reguleeritav LED-lamp sooja valgusega \u2014 ideaalne keskendunud t\u00f6\u00f6ks."}}];

function money(v){ return '€' + v.toFixed(2); }
function $q(s){return document.querySelector(s)}

function renderCatalog(){
  const grid = $q('#grid');
  grid.innerHTML='';
  PRODUCTS.forEach(p=>{
    const el = document.createElement('article'); el.className='card';
    const img = document.createElement('img'); img.src = '/assets/' + p.images[0].split('/').pop();
    const title = document.createElement('div'); title.className='title'; title.textContent = p.name[LOCALE]||p.name.en;
    const price = document.createElement('div'); price.className='price'; price.textContent = money(p.price);
    const a = document.createElement('a'); a.href = `/${LOCALE}/product-${p.id}.html`; a.className='btn'; a.textContent = (LOCALE==='ru'?'Подробнее':'Details');
    const add = document.createElement('button'); add.className='btn'; add.style.marginLeft='8px'; add.textContent = (LOCALE==='ru'?'Добавить':'Add');
    add.onclick = ()=>{ addToCart(p.id); };
    el.appendChild(img); el.appendChild(title); el.appendChild(price);
    const ctl = document.createElement('div'); ctl.style.marginTop='8px'; ctl.appendChild(a); ctl.appendChild(add);
    el.appendChild(ctl);
    grid.appendChild(el);
  });
}

function addToCart(id){
  const cart = JSON.parse(localStorage.getItem('cart')||'{}');
  cart[id] = (cart[id]||0)+1;
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Added to cart ✓');
}

function renderCartMini(){
  const c = JSON.parse(localStorage.getItem('cart')||'{}');
  const count = Object.values(c).reduce((s,v)=>s+v,0);
  $q('#cartCount').textContent = count;
}

document.addEventListener('DOMContentLoaded',()=>{
  renderCartMini();
  if($q('#grid')) renderCatalog();
  // product page: attach add handler
  if($q('#addToCart')){
    $q('#addToCart').addEventListener('click',()=>{
      const pid = $q('#addToCart').dataset.pid;
      addToCart(pid);
      renderCartMini();
    });
  }
  // checkout page: render summary
  if(window.location.pathname.indexOf('checkout')>-1){
    const cart = JSON.parse(localStorage.getItem('cart')||'{}');
    const rows = Object.entries(cart).map(([id,q])=>{
      const p = PRODUCTS.find(x=>x.id===id);
      return {p, q};
    });
    const list = $q('#orderList');
    let total=0;
    rows.forEach(r=>{
      const div = document.createElement('div');
      div.textContent = `${r.p.name[LOCALE]||r.p.name.en} — ${r.q} × ${money(r.p.price)} = ${money(r.p.price*r.q)}`;
      total += r.p.price * r.q;
      list.appendChild(div);
    });
    $q('#orderTotal').textContent = money(total);
    $q('#placeOrder').addEventListener('click',()=>{
      alert('Order placed (demo). Thank you!');
      localStorage.removeItem('cart');
      window.location.href = `/${LOCALE}/`;
    });
  }
});
