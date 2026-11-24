// Datos de los gráficos (1B: conflictos por el suelo · 2C: precios, ingresos y acceso).
// Podés cambiar valores, nombres y textos acá.
const CHARTS = [
  {
    "id": "conflicto1",
    "title": "Conflicto 1: agricultura vs. ganadería",
    "sub": "Cambio en el uso del suelo en la Pampa argentina, 1985–2022",
    "unit": "millones de ha",
    "labels": [
      "Agricultura",
      "Pasturas implantadas (ganadería)",
      "Silvicultura",
      "Uso agropecuario (neto)"
    ],
    "series": [
      {
        "name": "Cambio 1985–2022 (millones de ha)",
        "data": [
          5.8,
          -2.4,
          0.317,
          3.4
        ]
      }
    ],
    "txt": "<b>¿Por qué es un conflicto?</b> En la Pampa argentina la agricultura ganó 5,8 millones de hectáreas mientras las pasturas implantadas para la ganadería perdieron 2,4 millones: en neto, el uso agropecuario creció 3,4 millones de ha y la silvicultura sumó unas 317 mil. Cultivos y ganadería compiten por el mismo suelo, y los pastizales sostienen gran parte de la ganadería y de la biodiversidad de la región.",
    "src": "MapBiomas Pampa Trinacional (INTA, Universidad de Buenos Aires y Fundación Vida Silvestre Argentina), con datos de Diego Abelleyra (INTA).",
    "g": "1B"
  },
  {
    "id": "conflicto2",
    "title": "Conflicto 2: cultivos vs. pastizales y vegetación nativa",
    "sub": "Campos nativos perdidos entre 1985 y 2024 en la Pampa sudamericana",
    "unit": "millones de ha",
    "labels": [
      "Brasil",
      "Argentina",
      "Uruguay"
    ],
    "series": [
      {
        "name": "Campos nativos perdidos",
        "data": [
          3.9,
          3.7,
          2.9
        ]
      },
      {
        "name": "Vegetación nativa perdida (total)",
        "data": [
          null,
          4.8,
          null
        ]
      }
    ],
    "txt": "<b>¿Por qué es un conflicto?</b> La región pampeana perdió 11,3 millones de ha de vegetación nativa entre 1985 y 2024, sobre todo por el avance de la agricultura. Argentina tuvo la mayor pérdida absoluta (unos 4,8 millones de ha). En 1985 el 35 % de la región ya estaba transformado y en 2024 las áreas cultivadas llegaron al 46 %. <i>Nota: el total de vegetación nativa solo está disponible para Argentina; la superficie urbana del Gran Buenos Aires también creció más de 37 %.</i>",
    "src": "MapBiomas Pampa Trinacional (INTA, Universidad de Buenos Aires y Fundación Vida Silvestre Argentina); datos difundidos por medios que citan a MapBiomas.",
    "g": "1B"
  },
  {
    "id": "produccion",
    "title": "1. La Pampa produce a gran escala",
    "sub": "Superficie sembrada con soja por provincia pampeana, campaña 2024/25",
    "unit": "hectáreas",
    "labels": [
      "Buenos Aires",
      "Córdoba",
      "Santa Fe",
      "Entre Ríos"
    ],
    "series": [
      {
        "name": "Hectáreas de soja",
        "data": [
          5477098,
          4504864,
          3367950,
          1250450
        ]
      }
    ],
    "txt": "La campaña de soja 2024/2025 alcanzó 49,9 millones de toneladas (3,5 % más que la anterior) y las provincias pampeanas encabezan la superficie sembrada. Sin embargo, producir mucho no asegura que todos accedan a los alimentos: eso depende de los precios, los ingresos y la distribución.",
    "src": "Secretaría de Agricultura, Ganadería y Pesca de la Nación.",
    "g": "2C"
  },
  {
    "id": "precio_global",
    "title": "2. Precios: el costo de una dieta saludable sube",
    "sub": "Costo mundial de una dieta saludable",
    "unit": "USD PPA por persona/día",
    "labels": [
      "2017",
      "2021",
      "2025"
    ],
    "series": [
      {
        "name": "Costo promedio mundial",
        "data": [
          2.94,
          3.44,
          4.28
        ]
      }
    ],
    "txt": "La inflación de los alimentos empujó el costo hacia arriba. En 2025 el costo mundial fue alrededor de 40 % mayor que la línea internacional de pobreza extrema (3 USD PPA).",
    "src": "FAO, FIDA, UNICEF, PMA y OMS, El estado de la seguridad alimentaria y la nutrición en el mundo (SOFI) 2026.",
    "g": "2C"
  },
  {
    "id": "precio_region",
    "title": "3. Precios por región, 2025",
    "sub": "Costo de una dieta saludable",
    "unit": "USD PPA por persona/día",
    "labels": [
      "Latinoamérica y el Caribe",
      "África",
      "Asia",
      "Norteamérica y Europa"
    ],
    "series": [
      {
        "name": "Costo 2025",
        "data": [
          4.91,
          4.35,
          4.33,
          3.64
        ]
      }
    ],
    "txt": "Latinoamérica y el Caribe tiene el costo más alto. Allí las verduras son el grupo más caro y la FAO señala la logística y el transporte como los principales problemas a resolver.",
    "src": "FAO, FIDA, UNICEF, PMA y OMS, El estado de la seguridad alimentaria y la nutrición en el mundo (SOFI) 2026.",
    "g": "2C"
  },
  {
    "id": "ingresos",
    "title": "4. Ingresos: quiénes no pueden pagarla",
    "sub": "Población que no puede costear una dieta saludable, 2025",
    "unit": "%",
    "labels": [
      "África",
      "Asia",
      "Latinoamérica y el Caribe",
      "Mundo"
    ],
    "series": [
      {
        "name": "No puede costearla (%)",
        "data": [
          66.6,
          28.9,
          25.7,
          32.7
        ]
      }
    ],
    "txt": "El acceso depende de la relación entre el costo de la dieta y los ingresos: cuando los ingresos disponibles para alimentos crecen más que los precios, baja el porcentaje que no accede (Asia, Latinoamérica); cuando no, sube (África). <i>Las fuentes del TP no traen salarios argentinos, por eso los ingresos se analizan mediante este indicador.</i>",
    "src": "FAO, FIDA, UNICEF, PMA y OMS, El estado de la seguridad alimentaria y la nutrición en el mundo (SOFI) 2026.",
    "g": "2C"
  },
  {
    "id": "distribucion",
    "title": "5. Distribución comercial: cuánto del precio se forma después de la finca",
    "sub": "Parte de lo que paga el consumidor",
    "unit": "%",
    "labels": [
      "Después de la finca (transporte, procesamiento, mayoristas)",
      "En la finca (complemento)"
    ],
    "series": [
      {
        "name": "Mínimo",
        "data": [
          70,
          25
        ]
      },
      {
        "name": "Máximo",
        "data": [
          75,
          30
        ]
      }
    ],
    "txt": "Las actividades posteriores a la finca explican entre 70 % y 75 % de lo que paga el consumidor, y hasta 40 % de los costos de la cadena se acumula en la etapa intermedia (procesamiento, logística y venta mayorista). <i>El valor “en la finca” es el complemento (25–30 %) de ese dato.</i>",
    "src": "FAO, FIDA, UNICEF, PMA y OMS, El estado de la seguridad alimentaria y la nutrición en el mundo (SOFI) 2026.",
    "g": "2C"
  },
  {
    "id": "argentina",
    "title": "6. Argentina: se producen alimentos, pero el acceso empeora",
    "sub": "Inseguridad alimentaria en Argentina",
    "unit": "% de la población",
    "labels": [
      "2014-16",
      "2023-25"
    ],
    "series": [
      {
        "name": "Moderada o grave",
        "data": [
          19.2,
          31.7
        ]
      },
      {
        "name": "Grave",
        "data": [
          5.8,
          11.0
        ]
      }
    ],
    "txt": "Argentina produce grandes cantidades de alimentos, pero la inseguridad alimentaria moderada o grave pasó de 19,2 % a 31,7 % y la grave casi se duplicó. Producir no alcanza si los precios, los ingresos y la distribución limitan el acceso. <i>Dato nacional: las fuentes no desagregan la región pampeana.</i>",
    "src": "FAO, FIDA, UNICEF, PMA y OMS, El estado de la seguridad alimentaria y la nutrición en el mundo (SOFI) 2026 (tabla de países).",
    "g": "2C"
  }
];
