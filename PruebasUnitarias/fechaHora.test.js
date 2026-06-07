import assert from "node:assert/strict";
import test from "node:test";

import {
    formatearFechaCalendario,
    obtenerFechaHoraNegocioSQL
} from "../utils/fechaHora.js";

test("mantiene una fecha calendario sin desplazarla al dia anterior", () => {
    assert.match(formatearFechaCalendario("2026-06-07", {weekday: "long"}), /7 de junio de 2026/);
});

test("convierte un instante UTC a horario de invierno de Santiago", () => {
    assert.equal(obtenerFechaHoraNegocioSQL(new Date("2026-06-07T13:30:00.000Z")), "2026-06-07 09:30:00");
});

test("convierte un instante UTC a horario de verano de Santiago", () => {
    assert.equal(obtenerFechaHoraNegocioSQL(new Date("2026-01-07T13:30:00.000Z")), "2026-01-07 10:30:00");
});
