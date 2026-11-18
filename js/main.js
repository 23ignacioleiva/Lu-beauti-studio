(function () {
  "use strict";
  document.documentElement.classList.remove("no-js");
  var C = window.LU_CONFIG || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  function esc(t) {
    return String(t == null ? "" : t).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function waUrl(msg) {
    return "https://wa.me/" + (C.whatsapp || "") + "?text=" + encodeURIComponent(msg || "");
  }
  /* ---------- WhatsApp e Instagram ---------- */
  $$(".js-wa").forEach(function (a) { a.href = waUrl(a.getAttribute("data-msg")); });
  var waTxt = $("#waVisible"); if (waTxt) waTxt.textContent = C.whatsappVisible || C.whatsapp;
  var ig = (C.instagram || "").replace(/^@/, "");
  $$(".js-instagram").forEach(function (a) {
    if (ig) { a.href = "https://instagram.com/" + ig; }
    else { a.removeAttribute("href"); a.removeAttribute("target"); a.setAttribute("aria-disabled", "true"); a.title = "Instagram a completar"; }
  });
  var igTxt = $("#igVisible"); if (igTxt) { igTxt.textContent = ig ? "@" + ig : "[@usuario a completar]"; if (!ig) igTxt.classList.add("pendiente"); }

  /* ---------- Ubicación y horarios ---------- */
  var dir = $("#dirVisible");
  if (dir) { dir.textContent = C.direccion || "[Dirección a completar]"; if (!C.direccion) dir.classList.add("pendiente"); }
  var maps = $("#mapsLink");
  if (maps && C.mapsLink) { maps.href = C.mapsLink; maps.hidden = false; }
  var hor = $("#horariosVisible");
  if (hor) {
    if (C.horarios && C.horarios.length) {
      hor.innerHTML = C.horarios.map(function (h) { return '<p class="horario"><span>' + esc(h.dias) + "</span><span>" + esc(h.horas) + "</span></p>"; }).join("");
    } else { hor.innerHTML = '<p class="pendiente">[Horarios a completar]</p>'; }
  }

  /* ---------- Foto de Lucila ---------- */
  if (C.fotoLucila) {
    var fr = $(".about__frame");
    if (fr) fr.innerHTML = '<img src="' + esc(C.fotoLucila) + '" alt="Lucila, de Lu Beauti Studio" loading="lazy">';
  }

  /* ---------- Servicios ---------- */
  var servicios = C.servicios || [];
  var grid = $("#servicesGrid");
  if (grid) {
    grid.innerHTML = servicios.map(function (s, i) {
      var media = s.foto
        ? '<img src="' + esc(s.foto) + '" alt="' + esc(s.nombre) + ' en Lu Beauti Studio" loading="lazy" width="600" height="450">'
        : '<div class="service__ph"><img src="img/logo-leopardo.png" alt="" loading="lazy"></div>';
      return '<article class="service reveal">' +
        '<div class="service__media">' + media + '<h3 class="service__name">' + esc(s.nombre) + "</h3></div>" +
        '<div class="service__body"><p class="service__desc">' + esc(s.descripcion) + "</p>" +
        (s.precio ? '<p class="service__price">' + esc(s.precio) + "</p>" : "") +
        '<div class="service__actions">' +
        '<a class="btn btn--outline" target="_blank" rel="noopener" href="' + waUrl("Hola Lu Beauti Studio! Quería consultar por el servicio de " + s.nombre + ".") + '">Consultar</a>' +
        '<a class="btn btn--gold js-reservar" href="#turnos" data-servicio="' + i + '">Reservar</a>' +
        "</div></div></article>";
    }).join("");
  }

  /* ---------- Galería ---------- */
  var gal = $("#gallery"), fotos = C.galeria || [];
  if (gal) {
    if (fotos.length) {
      gal.innerHTML = fotos.map(function (f, i) {
        return '<button class="gallery__item reveal" type="button" data-i="' + i + '" aria-label="Ver foto' + (f.texto ? ": " + esc(f.texto) : "") + '">' +
          '<img src="' + esc(f.foto) + '" alt="' + esc(f.texto || "Trabajo de Lu Beauti Studio") + '" loading="lazy">' +
          (f.texto ? "<span>" + esc(f.texto) + "</span>" : "") + "</button>";
      }).join("");
    } else {
      var ph = "";
      for (var k = 0; k < 4; k++) ph += '<div class="gallery__ph" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-8 8"/></svg></div>';
      gal.innerHTML = '<div class="gallery__empty reveal">' + ph + '</div><p class="gallery__note">Muy pronto vas a ver acá los resultados reales del estudio.</p>';
    }
  }
  var lb = $("#lightbox");
  if (gal && lb && typeof lb.showModal === "function") {
    gal.addEventListener("click", function (e) {
      var b = e.target.closest(".gallery__item"); if (!b) return;
      var f = fotos[+b.getAttribute("data-i")];
      $("#lbImg").src = f.foto; $("#lbImg").alt = f.texto || "Trabajo de Lu Beauti Studio";
      $("#lbText").textContent = f.texto || "";
      lb.showModal();
    });
    $("#lbClose").addEventListener("click", function () { lb.close(); });
    lb.addEventListener("click", function (e) { if (e.target === lb) lb.close(); });
  }

  /* ---------- Formulario de turnos ---------- */
  var selServ = $("#bkServicio"), selHora = $("#bkHora"), inFecha = $("#bkFecha");
  if (selServ) {
    servicios.forEach(function (s, i) { var o = document.createElement("option"); o.value = i; o.textContent = s.nombre; selServ.appendChild(o); });
  }
  if (selHora) {
    var horas = (C.horasTurno && C.horasTurno.length) ? C.horasTurno : ["Mañana", "Mediodía", "Tarde"];
    selHora.innerHTML = '<option value="">' + ((C.horasTurno && C.horasTurno.length) ? "Elegí un horario" : "Elegí una franja") + "</option>" +
      horas.map(function (h) { return '<option value="' + esc(h) + '">' + esc(h) + "</option>"; }).join("");
  }
  function hoyISO() { var d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().slice(0, 10); }
  if (inFecha) inFecha.min = hoyISO();

  document.addEventListener("click", function (e) {
    var r = e.target.closest(".js-reservar"); if (!r || !selServ) return;
    selServ.value = r.getAttribute("data-servicio");
    setError(selServ, "");
  });

  function setError(el, msg) {
    var f = el.closest(".field"), p = $("#err-" + el.id);
    if (f) f.classList.toggle("has-error", !!msg);
    if (p) p.textContent = msg;
    el.setAttribute("aria-invalid", msg ? "true" : "false");
    if (p) el.setAttribute("aria-describedby", p.id);
  }
  function fechaLarga(iso) {
    var p = iso.split("-"), d = new Date(+p[0], +p[1] - 1, +p[2]);
    var dias = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
    return dias[d.getDay()] + " " + p[2] + "/" + p[1] + "/" + p[0];
  }

  var bk = $("#bookingForm"), bkSend = $("#bkSend");
  function bookingUrl(show) {
    var ok = true, first = null;
    function check(el, cond, msg) { if (!cond) { if (show) setError(el, msg); ok = false; first = first || el; } else if (show) setError(el, ""); }
    var nombre = $("#bkNombre");
    check(selServ, selServ.value !== "", "Elegí un servicio.");
    var f = inFecha.value, cerrado = false, pasado = false;
    if (f) {
      var p = f.split("-"), d = new Date(+p[0], +p[1] - 1, +p[2]);
      cerrado = (C.diasCerrados || []).indexOf(d.getDay()) > -1;
      pasado = f < hoyISO();
    }
    check(inFecha, f && !cerrado && !pasado, !f ? "Elegí una fecha." : pasado ? "Elegí una fecha desde hoy en adelante." : "Ese día el estudio está cerrado. Elegí otro día.");
    check(selHora, selHora.value !== "", "Elegí un horario.");
    check(nombre, nombre.value.trim().length > 1, "Escribí tu nombre.");
    if (!ok) { if (show && first) first.focus(); return null; }
    var s = servicios[+selServ.value];
    var nota = $("#bkNota").value.trim();
    return waUrl("Hola Lu Beauti Studio! Quiero pedir un turno ✨\n\n" +
      "• Servicio: " + s.nombre + "\n" +
      "• Fecha: " + fechaLarga(f) + "\n" +
      "• Horario: " + selHora.value + " h\n" +
      "• Nombre: " + nombre.value.trim() +
      (nota ? "\n• Comentario: " + nota : ""));
  }
  function contactUrl(show) {
    var n = $("#ctNombre"), m = $("#ctMensaje"), ok = true;
    var okN = n.value.trim().length > 1, okM = m.value.trim().length > 2;
    if (show) { setError(n, okN ? "" : "Escribí tu nombre."); setError(m, okM ? "" : "Escribí tu mensaje."); if (!okN) n.focus(); else if (!okM) m.focus(); }
    if (!okN || !okM) return null;
    return waUrl("Hola Lu Beauti Studio! Soy " + n.value.trim() + ".\n\n" + m.value.trim());
  }
  /* El botón es un enlace real a WhatsApp: se actualiza mientras se completa
     el formulario y, si falta algo, no abre y marca qué completar. */
  function wireLink(form, link, build) {
    if (!form || !link) return;
    function refresh() { link.href = build(false) || "#"; }
    form.addEventListener("input", refresh);
    form.addEventListener("change", refresh);
    link.addEventListener("click", function (e) {
      var url = build(true);
      if (!url) { e.preventDefault(); return; }
      link.href = url;
    });
    form.addEventListener("submit", function (e) { e.preventDefault(); link.click(); });
    refresh();
  }
  wireLink(bk, bkSend, bookingUrl);
  wireLink($("#contactForm"), $("#ctSend"), contactUrl);
  document.addEventListener("click", function (e) { if (e.target.closest(".js-reservar") && bkSend) bkSend.href = bookingUrl(false) || "#"; });
  $$("#bookingForm input, #bookingForm select, #contactForm input, #contactForm textarea").forEach(function (el) {
    el.addEventListener("change", function () { if (el.getAttribute("aria-invalid") === "true") setError(el, ""); });
  });

  /* ---------- Menú celular ---------- */
  var btn = $("#menuBtn"), nav = $("#nav");
  function closeMenu() { nav.classList.remove("is-open"); btn.setAttribute("aria-expanded", "false"); btn.setAttribute("aria-label", "Abrir menú"); }
  if (btn && nav) {
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    });
    $$("a", nav).forEach(function (a) { a.addEventListener("click", closeMenu); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && nav.classList.contains("is-open")) { closeMenu(); btn.focus(); } });
  }

  /* ---------- Encabezado al hacer scroll + sección activa ---------- */
  var header = $("#header");
  function onScroll() { header.classList.toggle("is-scrolled", window.scrollY > 30); }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  var links = $$(".nav a[href^='#']").filter(function (a) { return a.getAttribute("href").length > 1; });
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (a) { a.classList.toggle("is-active", a.getAttribute("href") === "#" + en.target.id); });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    links.forEach(function (a) { var s = $(a.getAttribute("href")); if (s) spy.observe(s); });

    var rev = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-visible"); rev.unobserve(en.target); } });
    }, { threshold: 0.12 });
    $$(".reveal").forEach(function (el) { rev.observe(el); });
  } else {
    $$(".reveal").forEach(function (el) { el.classList.add("is-visible"); });
  }

  var y = $("#year"); if (y) y.textContent = new Date().getFullYear();
})();
