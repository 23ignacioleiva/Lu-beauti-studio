/* =========================================================
   LU BEAUTI STUDIO — DATOS DEL ESTUDIO
   Este es el ÚNICO archivo que necesitás tocar para
   actualizar servicios, galería, horarios y contacto.
   Todo lo que está entre [CORCHETES] falta completar.
   ========================================================= */
window.LU_CONFIG = {

  // WhatsApp: solo números, con código de país (54) y 9.
  whatsapp: "5491141877876",
  whatsappVisible: "+54 9 11 4187-7876",

  // Instagram: escribí el usuario sin @  (ej: "lubeauti.studio")
  instagram: "",

  // Dirección del estudio. Si la dejás vacía, se muestra "[Dirección a completar]".
  direccion: "",
  // Link de Google Maps (abrí el lugar en Maps > Compartir > Copiar enlace)
  mapsLink: "",

  // Horarios de atención, como querés que se lean en la página.
  // Ej: { dias: "Lunes a viernes", horas: "10 a 19 h" }
  horarios: [
    // { dias: "[Días]", horas: "[Horario]" }
  ],

  // Horarios que se pueden elegir al pedir turno.
  // Si lo dejás vacío, la clienta elige "Mañana / Tarde" y vos le confirmás la hora.
  // Ej: ["10:00", "11:00", "12:00", "15:00", "16:00"]
  horasTurno: ["09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00"],

  // Días cerrados para turnos: 0 = domingo, 1 = lunes ... 6 = sábado. Ej: [0]
  diasCerrados: [],

  /* ---------- SERVICIOS ----------
     foto: poné la foto en la carpeta img/servicios/ y escribí el nombre.
     precio: dejalo vacío ("") si no querés mostrarlo. */
  servicios: [
    { nombre: "Lifting de pestañas",   foto: "", descripcion: "Realzá tus pestañas naturales con una curva perfecta, mayor definición y una mirada más expresiva. ♡", precio: "" },
    { nombre: "Lifting de cejas",      foto: "", descripcion: "Cejas más ordenadas, definidas y con efecto de mayor volumen para realzar tu mirada. ♡", precio: "" },
    { nombre: "Tratamientos faciales", foto: "", descripcion: "Dedicá un momento a tu piel. Tratamientos personalizados para limpiar, hidratar y renovar tu rostro, resaltando su belleza natural. ♡", precio: "" }
  ],

  /* ---------- GALERÍA ----------
     1) Copiá las fotos a la carpeta img/galeria/
     2) Agregá una línea por foto acá abajo.
     Ej: { foto: "img/galeria/pestanas-1.jpg", texto: "Lifting de pestañas" }, */
  galeria: [
  ],

};
