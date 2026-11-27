// Datos completos de los gráficos (1B: conflictos por el suelo · 2C: precios, ingresos, distribución y acceso).
// Basados exclusivamente en MapBiomas Argentina, Secretaría de Agricultura de la Nación y FAO (SOFI 2026).

const CHARTS = [
    {
        id: "conflicto1",
        title: "Conflicto 1: Agricultura vs. Ganadería",
        sub: "Cambio en el uso del suelo en la Pampa argentina, 1985–2022",
        unit: "millones de ha",
        labels: ["Agricultura", "Pasturas implantadas (ganadería)", "Silvicultura", "Uso agropecuario (neto)"],
        series: [
            {
                name: "Cambio 1985–2022 (millones de ha)",
                data: [5.8, -2.4, 0.317, 3.4],
            },
        ],
        txt: "<b>¿Por qué es un conflicto?</b> En la Pampa argentina la agricultura ganó 5,8 millones de hectáreas mientras las pasturas implantadas para la ganadería perdieron 2,4 millones. Cultivos y ganadería compiten por el mismo suelo fértil, desplazando la producción ganadera.",
        src: "MapBiomas Pampa Trinacional (INTA, UBA y Fundación Vida Silvestre Argentina), datos de Diego Abelleyra (INTA).",
        container: "g1B",
    },
    {
        id: "conflicto2",
        title: "Conflicto 2: Cultivos vs. Pastizales y Vegetación Nativa",
        sub: "Campos y vegetación nativa perdidos (1985–2024)",
        unit: "millones de ha",
        labels: ["Brasil", "Argentina", "Uruguay"],
        series: [
            {
                name: "Campos nativos perdidos",
                data: [3.9, 3.7, 2.9],
            },
            {
                name: "Vegetación nativa perdida (total)",
                data: [null, 4.8, null],
            },
        ],
        txt: "<b>¿Por qué es un conflicto?</b> La región pampeana sudamericana perdió 11,3 millones de ha de vegetación nativa entre 1985 y 2024 por el avance agrícola. Argentina registró la mayor pérdida absoluta (4,8 millones de ha) y las áreas cultivadas llegaron al 46 % del territorio.",
        src: "MapBiomas Pampa Trinacional (INTA, UBA y Fundación Vida Silvestre Argentina).",
        container: "g1B",
    },
    {
        id: "produccion",
        title: "1. La Pampa produce a gran escala",
        sub: "Superficie sembrada con soja por provincia pampeana (campaña 2024/25)",
        unit: "hectáreas",
        labels: ["Buenos Aires", "Córdoba", "Santa Fe", "Entre Ríos"],
        series: [
            {
                name: "Hectáreas de soja",
                data: [5477098, 4504864, 3367950, 1250450],
            },
        ],
        txt: "La campaña de soja 2024/2025 alcanzó 49,9 millones de toneladas (+3,5 % respecto a la anterior). Sin embargo, producir grandes volúmenes no garantiza que toda la población acceda a los alimentos.",
        src: "Secretaría de Agricultura, Ganadería y Pesca de la Nación.",
        container: "g2C_part1",
    },
    {
        id: "precio_global",
        title: "2. Precios: El costo de una dieta saludable sube",
        sub: "Costo promedio mundial de una dieta saludable",
        unit: "USD PPA por persona/día",
        labels: ["2017", "2021", "2025"],
        series: [
            {
                name: "Costo promedio mundial",
                data: [2.94, 3.44, 4.28],
            },
        ],
        txt: "La inflación alimentaria elevó el costo diario a 4,28 USD PPA por persona en 2025, un 40 % por encima de la línea internacional de pobreza extrema (3 USD PPA).",
        src: "FAO, FIDA, UNICEF, PMA y OMS — Informe SOFI 2026.",
        container: "g2C_part1",
    },
    {
        id: "precio_region",
        title: "3. Precios por región (2025)",
        sub: "Costo diario de una dieta saludable por región del mundo",
        unit: "USD PPA por persona/día",
        labels: ["Latinoamérica y el Caribe", "África", "Asia", "Norteamérica y Europa"],
        series: [
            {
                name: "Costo 2025",
                data: [4.91, 4.35, 4.33, 3.64],
            },
        ],
        txt: "Latinoamérica y el Caribe presenta el costo más alto del mundo (4,91 USD PPA/día). La FAO destaca el alto precio de las verduras y los problemas de logística y transporte.",
        src: "FAO, FIDA, UNICEF, PMA y OMS — Informe SOFI 2026.",
        container: "g2C_part1",
    },
    {
        id: "ingresos",
        title: "4. Salarios e Ingresos: Quiénes no pueden pagarla",
        sub: "Población que no puede costear una dieta saludable (2025)",
        unit: "% de la población",
        labels: ["África", "Asia", "Latinoamérica y el Caribe", "Mundo"],
        series: [
            {
                name: "No puede costearla (%)",
                data: [66.6, 28.9, 25.7, 32.7],
            },
        ],
        txt: "Cuando los salarios y los ingresos reales no acompañan la suba de los alimentos, millones de familias quedan excluidas de una dieta nutritiva (25,7 % en nuestra región).",
        src: "FAO, FIDA, UNICEF, PMA y OMS — Informe SOFI 2026.",
        container: "g2C_part2",
    },
    {
        id: "distribucion",
        title: "5. Distribución comercial: Dónde se forma el precio",
        sub: "Porcentaje del precio final pagado por el consumidor",
        unit: "% del precio final",
        labels: ["Después de la finca (transporte, industria, comercio)", "En la finca (producción primaria)"],
        series: [
            {
                name: "Mínimo (%)",
                data: [70, 25],
            },
            {
                name: "Máximo (%)",
                data: [75, 30],
            },
        ],
        txt: "Entre el 70 % y el 75 % de lo que paga el consumidor se genera después de salir del campo (procesamiento, logística, fletes y venta mayorista/minorista).",
        src: "FAO, FIDA, UNICEF, PMA y OMS — Informe SOFI 2026.",
        container: "g2C_part2",
    },
    {
        id: "argentina",
        title: "6. Argentina: Alta producción, pero peor acceso",
        sub: "Evolución de la inseguridad alimentaria en Argentina",
        unit: "% de la población",
        labels: ["2014–2016", "2023–2025"],
        series: [
            {
                name: "Moderada o grave (%)",
                data: [19.2, 31.7],
            },
            {
                name: "Grave (%)",
                data: [5.8, 11.0],
            },
        ],
        txt: "Pese a ser potencia agroalimentaria, la inseguridad alimentaria moderada o grave trepó al 31,7 % y la grave casi se duplicó (11,0 %), demostrando que producir no alcanza sin acceso económico.",
        src: "FAO, FIDA, UNICEF, PMA y OMS — Informe SOFI 2026.",
        container: "g2C_part2",
    },
];
