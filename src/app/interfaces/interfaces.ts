export interface ComponenteMenu{
    icon: string;
    nombre: string;
    pagina: string
}

export interface Login{
    "nombre": string;
    "clave": string;
}

export interface Usuario {
    id_user:    number;
    nombre:     string;
    clave:      string;
    img_user:   string;
    fecha_naci: string;
    id_rol:     number;
    direccion:  string;
    telefono:   string;
}

export interface Sitio {
    id_sitio: number,
    nombre_sitio: string,
    telefeno: string,
    ubicacion: string,
    longitud: number,
    latitud: number,
    sitio_img: string
}

export interface Cerveza {
    id_cer:        string;
    cer_nombre:    string;
    cer_img:       string;
    grado_alcohol: string;
    cer_tipo:      string;
    cer_pais:      string;
}

export interface SitiosRecomendados {
  id_sitio:     string;
  nombre_sitio: string;
  longitud:     string;
  latitud:      string;
  valoracion:   string;
}

export interface Valoracion{
    id_val:   number,
    id_user:  number;
    id_sitio: number;
    puntos:   number;
    estado:   string;
}

export interface Cocteles {
    id_coctel:    number;
    nombre:       string;
    img_coctel:   string;
    ingredientes: string;
    preparacion:  string;
    id_user:      string;
    usuario:      string;
    img_user:     number;
    cant:         number;
}

export interface Comentarios {
    id_user:   number;
    id_coctel: number;
    nombre:    string;
    img_user:  string;
    detalle:   string;
}
