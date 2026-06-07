export const ZONA_HORARIA_NEGOCIO = "America/Santiago";

function extraerPartesFechaHora(fecha, timeZone = ZONA_HORARIA_NEGOCIO) {
    const partes = new Intl.DateTimeFormat("en-CA", {
        timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hourCycle: "h23"
    }).formatToParts(fecha);

    return Object.fromEntries(
        partes
            .filter(({type}) => type !== "literal")
            .map(({type, value}) => [type, value])
    );
}

export function obtenerFechaHoraNegocioSQL(fecha = new Date()) {
    const {year, month, day, hour, minute, second} = extraerPartesFechaHora(fecha);
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

export function formatearFechaCalendario(valor, opciones = {}) {
    const coincidencia = String(valor ?? "").match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!coincidencia) return String(valor ?? "");

    const [, year, month, day] = coincidencia;
    const fecha = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));

    return new Intl.DateTimeFormat("es-CL", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
        ...opciones
    }).format(fecha);
}

export function formatearFechaHoraNegocio(fecha = new Date()) {
    return new Intl.DateTimeFormat("es-CL", {
        dateStyle: "short",
        timeStyle: "medium",
        timeZone: ZONA_HORARIA_NEGOCIO
    }).format(fecha);
}
