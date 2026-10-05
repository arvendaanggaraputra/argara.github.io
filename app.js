(function () {
  const el = (t, c, h) => { const e = document.createElement(t); if (c) e.className = c; if (h != null) e.innerHTML = h; return e; };
  const ov = el("div", "gui", '<button class="gx">← Kembali ke Halaman Utama</button><div class="gv" id="gv"></div>');  document.body.appendChild(ov);
  const gv = ov.querySelector("#gv"), $ = i => gv.querySelector("#" + i);
  const close = () => { location.href = "index.html"; };  ov.querySelector(".gx").onclick = close;
  document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
  const show = h => { gv.innerHTML = h; ov.scrollTop = 0; };
  const theme = (bg, fg, mu, ac, pn, bt) => { const s = ov.style; [["bg", bg], ["fg", fg], ["mu", mu], ["ac", ac], ["pn", pn], ["bt", bt]].forEach(([k, v]) => s.setProperty("--" + k, v)); };
  const open = fn => { fn(); ov.classList.add("open"); document.body.style.overflow = "hidden"; };
  const LOGO = '<img src="UPI-Logo-white.png" alt="[ LOGO UPI ]" style="max-width:380px;width:80%;height:auto">';
  const ID = "Arvenda Anggara Putra (2504332)";

  /* ===== KALKULATOR ILMIAH ===== */
  function evalExpr(s) {
    s = s.replace(/π/g, "PI").replace(/\^/g, "**").replace(/(\d+(?:\.\d+)?)%/g, "($1/100)");
    const ok = ["sin", "cos", "tan", "sqrt", "PI", "e"];
    if ((s.match(/[A-Za-z]+/g) || []).some(i => !ok.includes(i)) || /[^0-9A-Za-z+\-*/().\s]/.test(s)) throw 0;
    const d = Math.PI / 180;
    const r = Function("sin", "cos", "tan", "sqrt", "PI", "e", '"use strict";return (' + s + ")")(x => Math.sin(x * d), x => Math.cos(x * d), x => Math.tan(x * d), Math.sqrt, Math.PI, Math.E);
    if (!isFinite(r)) throw 0;
    return String(parseFloat(r.toPrecision(12)));
  }
  function calcApp() {
    theme("#212529", "#f8f9fa", "#868e96", "#5c7cfa", "#343a40", "#fff");
    show(LOGO + '<div><h1>SCIENTIFIC CALCULATOR</h1><p style="color:var(--ac)">Physics Study Program Edition</p></div><button class="gbtn" id="go">MULAI APLIKASI</button><p style="color:#ced4da">' + ID + '<br>Program Studi Fisika UPI</p>');
    $("go").onclick = () => {
      show('<div class="cw"><small style="color:var(--ac)">Mode: DEG</small><input id="cd" class="cdisp" placeholder="0"><div class="cgrid" id="cg"></div><small style="color:var(--mu);text-align:center">' + ID + '</small></div>');
      const d = $("cd"), run = () => { try { d.value = evalExpr(d.value); } catch { d.value = "Error"; } };
      ["sin","cos","tan","C","7","8","9","/","4","5","6","*","1","2","3","-","0",".","(","+","sqrt","^","π","e","DEL","%",")","="].forEach(k => {
        const b = el("button", "sin cos tan sqrt ^ π e ( ) %".split(" ").includes(k) ? "s" : "/*-+".includes(k) ? "o" : k === "C" ? "c" : k === "=" ? "e" : k === "DEL" ? "o" : "", k);
        b.onclick = () => { if (k === "C") d.value = ""; else if (k === "DEL") d.value = d.value.slice(0, -1); else if (k === "=") run(); else d.value += ["sin", "cos", "tan", "sqrt"].includes(k) ? k + "(" : k; };
        $("cg").appendChild(b);
      });
      d.addEventListener("keydown", e => { if (e.key === "Enter") run(); });
    };
  }

  /* ===== KALKULATOR BMI ===== */
  function bmiApp() {
    theme("#0F172A", "#F1F5F9", "#94A3B8", "#06B6D4", "#1E293B", "#fff");
    show(LOGO + '<h1>Aplikasi Kalkulator Kesehatan<br>Body Mass Index (BMI)</h1><button class="gbtn" id="go">KLIK UNTUK MELANJUTKAN</button><p>' + ID + ' | Fisika UPI</p>');
    $("go").onclick = () => {
      const rows = [["KURUS", "< 18.5", "#FACC15"], ["NORMAL", "18.5 - 24.9", "#4ADE80"], ["GEMUK", "25.0 - 29.9", "#FB923C"], ["OBESITAS", "≥ 30.0", "#F87171"]]
        .map(r => '<div class="krow"><span style="color:' + r[2] + '">●</span><b>' + r[0] + '</b><span>' + r[1] + '</span></div>').join("");
      show('<div class="bw"><div><h2 style="color:var(--ac)">Kalkulator BMI</h2><br><div class="gp"><label>Berat Badan (kg)</label><input id="w" type="number" min="1"><label>Tinggi Badan (cm)</label><input id="h" type="number" min="1"><button class="gbtn" id="ok">ANALISIS DATA</button></div><div class="bbig" id="bn">--.--</div><div id="bt" style="text-align:center;color:var(--mu)">Menunggu Input...</div></div><div><h2 style="color:var(--ac)">Standar Kategori</h2><br><div class="gp"><u>Klasifikasi Nilai BMI:</u>' + rows + '<br><u>Tips Kesehatan:</u><span style="color:var(--mu)">1. Minum air minimal 8 gelas sehari.<br>2. Tidur cukup (7-8 jam).<br>3. Olahraga rutin 30 menit/hari.</span></div></div></div><button class="gbtn l" id="bk">&lt; KEMBALI</button>');
      $("bk").onclick = bmiApp;
      $("ok").onclick = () => {
        const w = parseFloat($("w").value), h = parseFloat($("h").value) / 100;
        if (!(w > 0 && h > 0)) { alert("Masukkan angka valid!"); return; }
        const b = w / (h * h), [t, c] = b < 18.5 ? ["KEKURANGAN BERAT BADAN", "#FACC15"] : b < 25 ? ["BERAT BADAN NORMAL", "#4ADE80"] : b < 30 ? ["KELEBIHAN BERAT BADAN", "#FB923C"] : ["OBESITAS", "#F87171"];
        $("bn").textContent = b.toFixed(1); $("bn").style.color = c; $("bt").textContent = t; $("bt").style.color = c;
      };
    };
  }

  /* ===== ANALISIS GEMPA ===== */
  const KOTA = { Bandung: [-6.9175, 107.6191], Jakarta: [-6.2088, 106.8456], Serang: [-6.1158, 106.1558], Sukabumi: [-6.9224, 106.9295], Cianjur: [-6.8203, 107.1402], "Pelabuhan Ratu": [-7.0125, 106.5512], "Ujung Kulon": [-6.7583, 105.6708], Bogor: [-6.595, 106.8061], Tasikmalaya: [-7.3279, 108.2269], Garut: [-7.2167, 107.9] };
  const INT = [["1995-2005", "query (6).csv"], ["2005-2015", "query (9).csv"], ["2015-2025", "query (8).csv"]];
  const kat = m => m < 4.5 ? "Ringan" : m < 6 ? "Sedang" : "Kuat";
  const cache = {};
  function parseCSV(txt) {
    const L = txt.trim().split(/\r?\n/), H = L[0].split(",").map(s => s.replace(/"/g, "").trim());
    const a = H.indexOf("latitude"), o = H.indexOf("longitude"), p = H.indexOf("depth"), m = H.indexOf("mag");
    if ([a, o, p, m].includes(-1)) throw new Error("Kolom latitude, longitude, depth, mag tidak ditemukan");
    const sp = /,(?=(?:[^"]*"[^"]*")*[^"]*$)/;
    return L.slice(1).map(r => { const c = r.split(sp); return [+c[a], +c[o], +c[p], +c[m]]; }).filter(r => r.every(isFinite));
  }
  async function getRows(f) { if (cache[f]) return cache[f]; const r = await fetch(encodeURI(f)); if (!r.ok) throw 0; return (cache[f] = parseCSV(await r.text())); }
  const mm = a => [a.reduce((p, v) => Math.min(p, v), Infinity), a.reduce((p, v) => Math.max(p, v), -Infinity)];
  function draw(cv, type, rows, title) {
    const c = cv.getContext("2d"), W = cv.width, H = cv.height, P = 55, cs = getComputedStyle(ov), FG = cs.getPropertyValue("--fg"), AC = cs.getPropertyValue("--ac");
    c.clearRect(0, 0, W, H); c.fillStyle = FG; c.strokeStyle = FG; c.font = "14px Consolas"; c.textAlign = "center"; c.fillText(title, W / 2, 24);
    c.beginPath(); c.moveTo(P, 40); c.lineTo(P, H - P); c.lineTo(W - 20, H - P); c.stroke();
    if (type === "sebaran") {
      const [x0, x1] = mm(rows.map(r => r[1])), [y0, y1] = mm(rows.map(r => r[0])); c.fillStyle = AC; c.globalAlpha = .5;
      rows.forEach(r => { c.beginPath(); c.arc(P + (r[1] - x0) / (x1 - x0 || 1) * (W - P - 30), H - P - (r[0] - y0) / (y1 - y0 || 1) * (H - P - 50), Math.max(2, r[3]), 0, 7); c.fill(); });
      c.globalAlpha = 1; c.fillStyle = FG; c.fillText("Longitude " + x0.toFixed(1) + " → " + x1.toFixed(1), W / 2, H - 15); c.save(); c.translate(15, H / 2); c.rotate(-Math.PI / 2); c.fillText("Latitude " + y0.toFixed(1) + " → " + y1.toFixed(1), 0, 0); c.restore(); return;
    }
    let vals, labs;
    if (type === "hist") { const [a, b] = mm(rows.map(r => r[3])), w = (b - a) / 10 || 1; vals = Array(10).fill(0); rows.forEach(r => vals[Math.min(9, Math.floor((r[3] - a) / w))]++); labs = vals.map((_, i) => (a + i * w).toFixed(1)); }
    else { const k = ["Ringan", "Sedang", "Kuat"]; vals = k.map(x => rows.filter(r => kat(r[3]) === x).length); labs = k; }
    const mx = Math.max(...vals) || 1, bw = (W - P - 30) / vals.length;
    vals.forEach((v, i) => { const h = v / mx * (H - P - 60); c.fillStyle = AC; c.fillRect(P + i * bw + 4, H - P - h, bw - 8, h); c.fillStyle = FG; c.fillText(v, P + i * bw + bw / 2, H - P - h - 5); c.fillText(labs[i], P + i * bw + bw / 2, H - P + 18); });
    c.fillText(type === "hist" ? "Magnitudo" : "Kategori Magnitudo", W / 2, H - 12);
  }
  const upload = (msg, cb, multi) => '<p style="color:var(--mu)">' + msg + '</p><input type="file" id="up" accept=".csv"' + (multi ? " multiple" : "") + ">";
  function gempaApp() {
    theme("#263238", "#ECEFF1", "#B0BEC5", "#FFA000", "#37474F", "#000");
    const welcome = () => {
      show(LOGO + '<h1>Data Sebaran Gempa Provinsi Banten,<br>DKI Jakarta, dan Jawa Barat</h1><button class="gbtn" id="go">Klik Untuk Melanjutkan</button><p>Arvenda Anggara Putra (2504332) | Kayla Najjah Hakim (2501362)<br>Muhammad Nabil Z.N (2502367) | Suryani (2503470)</p>');
      $("go").onclick = info;
    };
    const info = () => {
      show('<h1 style="color:var(--ac)">Mengapa Banten, DKI Jakarta, dan<br>Jawa Barat Rawan Gempa?</h1><div class="ew"><pre>Indonesia, khususnya Provinsi Banten, DKI Jakarta dan Jawa Barat, adalah wilayah yang sangat rawan gempa karena posisi geografisnya yang unik.\n\n1. Ring of Fire (Cincin Api Pasifik)\n   Indonesia terletak di jalur Ring of Fire, zona dengan aktivitas seismik dan gunung api yang sangat tinggi.\n\n2. Pertemuan Tiga Lempeng\n   Lempeng Eurasia, Indo-Australia, dan Pasifik bertemu di wilayah ini.\n\n3. Zona Subduksi Jawa Barat\n   Di selatan Jawa Barat, Lempeng Indo-Australia menyusup ke bawah Lempeng Eurasia dan secara periodik melepaskan energi sebagai gempa megathrust.\n\n4. Sesar Aktif di Daratan\n   Sesar seperti Lembang dan Cimandiri bersifat dangkal dan dapat sangat merusak walau magnitudonya tidak sebesar gempa subduksi.</pre><img src="ring of fire.webp" alt="[ ring of fire.webp ]" style="width:100%;max-width:460px"></div><div><button class="gbtn l" id="b">Kembali</button><button class="gbtn l" id="n">Selanjutnya</button></div>');
      $("b").onclick = welcome; $("n").onclick = menu;
    };
    const menu = () => {
      show('<h2>Pilih Interval Tahun Data Gempa</h2><div class="gmenu">' + INT.map((x, i) => '<button class="gbtn" data-i="' + i + '">' + x[0] + '</button>').join("") + '<button class="gbtn" id="pr">Model Prediksi Gempa</button></div><button class="gbtn l" id="b">Kembali</button>');
      gv.querySelectorAll("[data-i]").forEach(b => b.onclick = () => interval(INT[b.dataset.i]));
      $("pr").onclick = predict; $("b").onclick = info;
    };
    const interval = ([th, file]) => {
      show('<h2>Sebaran Data Gempa Jawa Barat (' + th + ')</h2><div class="tabs"><button data-t="hist" class="on">Histogram</button><button data-t="sebaran">Sebaran</button><button data-t="bar">Bar Chart</button></div><div id="area">Memuat data…</div><button class="gbtn l" id="b">Kembali</button>');
      $("b").onclick = menu; let rows = null, tab = "hist";
      const titles = { hist: "Distribusi Magnitudo Gempa (" + th + ")", sebaran: "Sebaran Lokasi Gempa (" + th + ")", bar: "Jumlah Gempa per Kategori (" + th + ")" };
      const render = () => { $("area").innerHTML = '<canvas id="cv" width="760" height="420"></canvas>'; draw($("cv"), tab, rows, titles[tab]); };
      gv.querySelectorAll("[data-t]").forEach(b => b.onclick = () => { gv.querySelectorAll("[data-t]").forEach(x => x.classList.remove("on")); b.classList.add("on"); tab = b.dataset.t; if (rows) render(); });
      getRows(file).then(r => { rows = r; render(); }).catch(() => {
        $("area").innerHTML = upload("File " + file + " tidak ditemukan di folder website. Unggah manual:");
        $("up").onchange = async e => { try { cache[file] = rows = parseCSV(await e.target.files[0].text()); render(); } catch (x) { alert(x.message); } };
      });
    };
    const predict = () => {
      show('<h2>Perkiraan Kategori Gempa (Model K-Nearest Neighbors)</h2><div class="gp" style="max-width:560px"><div id="st" style="color:var(--mu)">Memuat data…</div><label>Pilih Kota (opsional)</label><select id="gk"><option value="">— isi manual —</option>' + Object.keys(KOTA).map(k => "<option>" + k + "</option>").join("") + '</select><label>Latitude</label><input id="la" value="-7.5"><label>Longitude</label><input id="lo" value="107.0"><label>Kedalaman (km)</label><input id="de" value="10"><button class="gbtn" id="go">PREDIKSI KEKUATAN</button><h2 id="hs" style="text-align:center">Hasil Prediksi: -</h2></div><button class="gbtn l" id="b">Kembali</button>');
      $("b").onclick = menu; let train = [];
      const knn = (la, lo, de) => { const v = {}; train.map(r => ({ d: (r[0] - la) ** 2 + (r[1] - lo) ** 2 + (r[2] - de) ** 2, k: kat(r[3]) })).sort((a, b) => a.d - b.d).slice(0, 5).forEach(n => v[n.k] = (v[n.k] || 0) + 1); return Object.keys(v).sort((a, b) => v[b] - v[a])[0]; };
      const fit = rows => { rows = rows.slice().sort(() => Math.random() - .5); const cut = Math.floor(rows.length * .75), test = rows.slice(cut); train = rows.slice(0, cut); const hit = test.filter(r => knn(r[0], r[1], r[2]) === kat(r[3])).length; $("st").textContent = "Model KNN (k=5) dilatih dari " + rows.length + " data gempa. Akurasi uji: " + (test.length ? Math.round(hit / test.length * 100) + "%" : "-"); };
      Promise.all(INT.map(x => getRows(x[1]))).then(a => fit([].concat(...a))).catch(() => {
        $("st").innerHTML = upload("CSV tidak ditemukan di folder website. Unggah ketiga file CSV:", 0, 1);
        $("up").onchange = async e => { try { let r = []; for (const f of e.target.files) r = r.concat(parseCSV(await f.text())); fit(r); } catch (x) { alert(x.message); } };
      });
      $("gk").onchange = () => { const c = KOTA[$("gk").value]; if (c) { $("la").value = c[0]; $("lo").value = c[1]; $("de").value = 10; } };
      $("go").onclick = () => { if (!train.length) { $("hs").textContent = "Data belum dimuat"; return; } const a = +$("la").value, o = +$("lo").value, d = +$("de").value; $("hs").textContent = isFinite(a + o + d) ? "Perkiraan Kategori: " + knn(a, o, d).toUpperCase() : "Masukkan angka valid"; };
    };
    welcome();
  }

  const map = { calc: calcApp, bmi: bmiApp, gempa: gempaApp };
  open(map[window.APP] || calcApp);
})();