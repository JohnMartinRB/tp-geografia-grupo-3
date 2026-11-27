window.FX = !matchMedia("(prefers-reduced-motion: reduce)").matches;
document.body.classList.toggle("fx", FX);

// Inicializar iconos de Lucide
if (window.lucide) {
    lucide.createIcons();
}

const COL = ["#c8962b", "#6f8a2f", "#8a5a2b", "#4f86a8"];
const TYPES = [
    ["bar", "Barras"],
    ["barH", "Barras horizontales"],
    ["line", "Líneas"],
    ["doughnut", "Torta"],
];
const css = (n) => getComputedStyle(document.documentElement).getPropertyValue(n).trim();

function el(t, p, h) {
    const e = document.createElement(t);
    Object.assign(e, p || {});
    if (h !== undefined) e.innerHTML = h;
    return e;
}

// ==========================================
// 1. CONFIGURACIÓN VERTICAL DE DIAPOSITIVAS + BOTÓN IMPRIMIR
// ==========================================
const slides = [...document.querySelectorAll(".slide")];
const slideIndex = document.getElementById("slideIndex");
const indexGrid = document.getElementById("indexGrid");
const topActions = document.querySelector(".top-actions");

// Agregar botón directo de Imprimir en la barra superior
if (topActions) {
    const printBtn = el("button", {
        className: "pill-btn print-btn",
        title: "Imprimir o guardar todas las diapositivas en PDF",
        innerHTML: `<i data-lucide="printer"></i> Imprimir / PDF`,
    });
    printBtn.onclick = () => window.print();
    topActions.prepend(printBtn);
    if (window.lucide) lucide.createIcons();
}

// Numerar cada diapositiva y hacerlas todas visibles una debajo de la otra
slides.forEach((s, idx) => {
    s.classList.add("active");
    s.id = `slide-${idx + 1}`;
    const badge = el("span", {
        className: "slide-badge-num",
        textContent: `Diapositiva ${idx + 1} / ${slides.length}`,
    });
    s.prepend(badge);
});

// Índice rápido con desplazamiento suave (scroll) hacia cada diapositiva
function buildIndex() {
    if (!indexGrid) return;
    indexGrid.innerHTML = "";
    slides.forEach((s, idx) => {
        const btn = el("button", {
            className: "index-item",
            textContent: `${idx + 1}. ${s.dataset.title || "Diapositiva " + (idx + 1)}`,
        });
        btn.onclick = () => {
            s.scrollIntoView({ behavior: "smooth", block: "start" });
            slideIndex.hidden = true;
        };
        indexGrid.appendChild(btn);
    });
}

if (document.getElementById("toggleGrid")) {
    document.getElementById("toggleGrid").onclick = () => {
        slideIndex.hidden = !slideIndex.hidden;
    };
}
if (document.getElementById("closeIndex")) {
    document.getElementById("closeIndex").onclick = () => {
        slideIndex.hidden = true;
    };
}
if (document.getElementById("btnFullscreen")) {
    document.getElementById("btnFullscreen").onclick = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
        } else {
            document.exitFullscreen().catch(() => {});
        }
    };
}

addEventListener("keydown", (e) => {
    if (e.key === "Escape" && slideIndex) slideIndex.hidden = true;
});

buildIndex();

// ==========================================
// 2. GRÁFICOS INTERACTIVOS (CHART.JS)
// ==========================================
CHARTS.forEach((c) => {
    c.o = JSON.stringify([c.labels, c.series]);
    c.type = c.type || "bar";
    mk(c);
});

// Redimensionar todos los gráficos antes de imprimir para que salgan nítidos
window.addEventListener("beforeprint", () => {
    CHARTS.forEach((c) => {
        if (c.ch) {
            c.ch.options.animation = false;
            c.ch.resize();
            c.ch.update();
        }
    });
});

function mk(c) {
    const targetContainer = document.getElementById(c.container);
    if (!targetContainer) return;

    const s = el("section");
    s.className = "card";
    s.append(el("h3", {}, c.title), el("p", { className: "mut" }, c.sub + " · Unidad: " + c.unit));

    const bar = el("div");
    bar.className = "bar";
    const sel = el("select");
    TYPES.forEach(([v, n]) => sel.add(new Option(n, v)));
    sel.value = c.type;
    sel.onchange = () => {
        c.type = sel.value;
        draw(c);
    };

    const rst = el("button", {}, "Restablecer");
    rst.onclick = () => {
        [c.labels, c.series] = JSON.parse(c.o);
        tbl(c);
        draw(c);
    };

    const png = el("button", {}, "Descargar PNG");
    png.onclick = () => {
        el("a", { href: c.cv.toDataURL("image/png"), download: c.id + ".png" }).click();
    };

    bar.append(sel, rst, png);

    const w = el("div");
    w.className = "cv";
    c.cv = el("canvas");
    w.append(c.cv);

    c.tb = el("div");
    c.tb.className = "tw";

    const n = el("div", { contentEditable: "true" }, c.txt);
    n.className = "note";

    s.append(bar, w, c.tb, n, el("p", { className: "src" }, "Fuente: " + c.src));
    targetContainer.append(s);

    tbl(c);
    draw(c);
}

function tbl(c) {
    const t = el("table"),
        hd = el("tr");
    hd.append(el("th", {}, "Categoría"));
    c.series.forEach((x) => {
        const th = el("th"),
            i = el("input", { value: x.name });
        i.oninput = () => {
            x.name = i.value;
            draw(c);
        };
        th.append(i);
        hd.append(th);
    });
    t.append(hd);

    c.labels.forEach((l, r) => {
        const tr = el("tr"),
            td = el("td"),
            a = el("input", { value: l });
        a.oninput = () => {
            c.labels[r] = a.value;
            draw(c);
        };
        td.append(a);
        tr.append(td);

        c.series.forEach((x) => {
            const d = el("td"),
                i = el("input", { type: "number", step: "any", value: x.data[r] == null ? "" : x.data[r] });
            i.oninput = () => {
                x.data[r] = i.value === "" ? null : +i.value;
                draw(c);
            };
            d.append(i);
            tr.append(d);
        });
        t.append(tr);
    });
    c.tb.replaceChildren(t);
}

function draw(c) {
    const t = c.type,
        pie = t === "doughnut";
    Chart.defaults.color = css("--fg");
    Chart.defaults.borderColor = css("--grid");
    Chart.defaults.font.family = "system-ui,sans-serif";

    const ds = (pie ? [c.series[0]] : c.series).map((s, i) => ({
        label: s.name,
        data: s.data,
        backgroundColor: pie ? c.labels.map((_, j) => COL[j % 4]) : COL[i % 4],
        borderColor: pie ? css("--card") : COL[i % 4],
        borderWidth: 2,
        borderRadius: t === "line" ? 0 : 6,
        spanGaps: true,
        tension: 0.25,
    }));

    if (c.ch) c.ch.destroy();
    c.ch = new Chart(c.cv, {
        type: t === "barH" ? "bar" : t,
        data: { labels: c.labels, datasets: ds },
        options: {
            indexAxis: t === "barH" ? "y" : "x",
            responsive: true,
            animation: false,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: pie || c.series.length > 1 },
                tooltip: { callbacks: { label: (x) => x.dataset.label + ": " + x.formattedValue + " " + c.unit } },
            },
            scales: pie ? {} : { x: { beginAtZero: true }, y: { beginAtZero: true } },
        },
    });
}

// ==========================================
// 3. IMAGEN OPCIONAL DE MAQUETA + TRIGO 3D
// ==========================================
(() => {
    const pb = document.getElementById("pb");
    if (!pb || !window.CONFIG) return;
    const im = new Image();
    im.onload = () => {
        document.getElementById("pv").src = im.src;
        pb.hidden = false;
    };
    im.src = CONFIG.imagenPresentacion;
})();

(function () {
    const fb = document.getElementById("fx");
    const lab = () => {
        if (fb) fb.textContent = FX ? "✨ FX: Sí" : "✨ FX: No";
    };
    lab();

    const hero = document.getElementById("hero");
    const cv = document.getElementById("three");
    let sync = () => {};

    if (fb) {
        fb.onclick = () => {
            window.FX = !FX;
            document.body.classList.toggle("fx", FX);
            lab();
            sync();
        };
    }

    if (!window.THREE || !hero || !cv) return;
    let R;
    try {
        R = new THREE.WebGLRenderer({ canvas: cv, alpha: true, antialias: true, preserveDrawingBuffer: true });
    } catch (e) {
        return;
    }
    R.setPixelRatio(Math.min(devicePixelRatio, 2));
    R.setClearColor(0, 0);

    const S = new THREE.Scene(),
        C = new THREE.PerspectiveCamera(52, 1, 0.1, 90);
    const HZ = "vec3(.98,.84,.6)",
        SW =
            "float gust=sin(w.x*.22+w.z*.16-t*1.3)*.5+.5;float sw=(sin(t*1.7+w.x*.7+w.z*.5)*.07+sin(t*.8+w.z*.9)*.05+gust*.22-.08)*(.75+m.x*.5);";
    const U = { t: { value: 0 }, m: { value: new THREE.Vector2() } };
    const head = "uniform float t;uniform vec2 m;varying float s;varying float d;varying float b;varying float h;";

    const stalkM = new THREE.ShaderMaterial({
        side: THREE.DoubleSide,
        uniforms: U,
        vertexShader:
            head +
            "void main(){vec4 p=instanceMatrix*vec4(position,1.);vec4 w=instanceMatrix*vec4(0.,0.,0.,1.);float k=position.y*position.y;" +
            SW +
            "p.x+=sw*k*1.4;p.z+=sin(t*1.1+w.x*.5)*.04*k;h=position.y;s=fract(sin(w.x*12.9+w.z*78.2)*43758.5);b=gust;vec4 v=viewMatrix*modelMatrix*p;d=clamp(-v.z/30.,0.,1.);gl_Position=projectionMatrix*v;}",
        fragmentShader:
            "varying float s;varying float d;varying float b;varying float h;void main(){vec3 c=mix(vec3(.3,.33,.12),vec3(.85,.69,.29),smoothstep(0.,1.,h*1.15));c=mix(c,vec3(.5,.58,.2),(1.-s)*.35*(1.-h));c*=(.45+.55*h)*(.85+.3*b);c+=vec3(.12,.09,.02)*b*h;c=mix(c," +
            HZ +
            ",pow(d,1.3)*.9);gl_FragColor=vec4(c,1.);}",
    });

    const earM = new THREE.ShaderMaterial({
        uniforms: U,
        vertexShader:
            head +
            "void main(){vec4 p=instanceMatrix*vec4(position,1.);vec4 w=instanceMatrix*vec4(0.,0.,0.,1.);" +
            SW +
            "p.x+=sw*1.4;p.z+=sin(t*1.1+w.x*.5)*.04;h=1.;s=fract(sin(w.x*12.9+w.z*78.2)*43758.5);b=gust;vec4 v=viewMatrix*modelMatrix*p;d=clamp(-v.z/30.,0.,1.);gl_Position=projectionMatrix*v;}",
        fragmentShader:
            "varying float s;varying float d;varying float b;void main(){vec3 c=vec3(.86,.67,.24)*(.8+.35*s)*(.85+.3*b);c=mix(c," +
            HZ +
            ",pow(d,1.3)*.9);gl_FragColor=vec4(c,1.);}",
    });

    const g = new THREE.PlaneGeometry(0.045, 1, 1, 5);
    g.translate(0, 0.5, 0);
    const gp = g.attributes.position;
    for (let i = 0; i < gp.count; i++) {
        const y = gp.getY(i);
        gp.setX(i, gp.getX(i) * (1 - 0.6 * y));
        gp.setZ(i, y * y * 0.12);
    }

    const N = innerWidth < 700 ? 7000 : 14000,
        st = new THREE.InstancedMesh(g, stalkM, N),
        ea = new THREE.InstancedMesh(new THREE.SphereGeometry(1, 6, 5), earM, N),
        o = new THREE.Object3D();

    for (let i = 0; i < N; i++) {
        const x = (Math.random() - 0.5) * 38,
            z = 4 - Math.pow(Math.random(), 1.6) * 31,
            H = 0.85 + Math.random() * 0.55,
            ry = Math.random() * 3.14;
        o.position.set(x, 0, z);
        o.rotation.set(0, ry, 0);
        o.scale.set(1, H, 1);
        o.updateMatrix();
        st.setMatrixAt(i, o.matrix);

        o.position.set(x, H, z);
        o.rotation.set(0, ry, (Math.random() - 0.5) * 0.5);
        o.scale.set(0.028, 0.11, 0.028);
        o.updateMatrix();
        ea.setMatrixAt(i, o.matrix);
    }
    S.add(st, ea);

    const gm = new THREE.ShaderMaterial({
        vertexShader:
            "varying float d;void main(){vec4 v=viewMatrix*modelMatrix*vec4(position,1.);d=clamp(-v.z/30.,0.,1.);gl_Position=projectionMatrix*v;}",
        fragmentShader:
            "varying float d;void main(){vec3 c=mix(vec3(.36,.29,.12)," + HZ + ",pow(d,1.3));gl_FragColor=vec4(c,1.);}",
    });
    const gr = new THREE.Mesh(new THREE.PlaneGeometry(90, 75), gm);
    gr.rotation.x = -Math.PI / 2;
    gr.position.set(0, -0.01, -30);
    S.add(gr);

    const mouse = { x: 0, y: 0 };
    let raf = 0,
        vis = true;
    const size = () => {
        const w = hero.clientWidth || 800,
            h = hero.clientHeight || 280;
        R.setSize(w, h, false);
        C.aspect = w / h;
        C.updateProjectionMatrix();
    };
    size();
    addEventListener("resize", () => {
        size();
        frame(performance.now());
    });
    hero.addEventListener("pointermove", (e) => {
        const r = hero.getBoundingClientRect();
        mouse.x = ((e.clientX - r.left) / r.width) * 2 - 1;
        mouse.y = -(((e.clientY - r.top) / r.height) * 2 - 1);
    });

    function frame(ms) {
        const t = ms / 1000;
        U.t.value = t;
        U.m.value.set(mouse.x, mouse.y);
        C.position.set(mouse.x * 0.6, 1.05 + mouse.y * 0.2, 5);
        C.lookAt(mouse.x * 0.4, 0.55, -8);
        R.render(S, C);
        if (FX && vis) raf = requestAnimationFrame(frame);
    }
    sync = () => {
        cancelAnimationFrame(raf);
        if (FX && vis) raf = requestAnimationFrame(frame);
        else frame(1500);
    };
    new IntersectionObserver((es) => {
        vis = es[0].isIntersecting;
        sync();
    }).observe(hero);
    sync();
})();
