# Aurora Care — App Web/Móvil (Cuidador)

## Qué es Aurora
Ecosistema para acompañar pacientes con Alzheimer (FAST ≤5) en el hogar.
- **Aurora Care** (este repo): app web/móvil para cuidadores (monitoreo, configuración, alertas)
- **Aurora Core**: backend Django/DRF
- **Aurora Home**: asistente de voz en Raspberry Pi (STT/TTS local)
- **Aurora Band**: wearable biométrico (consumo de API externa, no se modifica firmware)

Equipo: Jeremías Maldonado (PM/DevOps/UX), Mateo Romero (Backend/DBA), Haik Kilic (Backend), Nicolás Rodeyro (UX/Frontend/AI), Octavio Escudero (DevOps/Frontend/QA).

## Stack
- Frontend: React + Next.js 14 (App Router, PWA)
- Auth: Auth0 (JWT, MFA, social login, Organizations para multi-tenant)
- DB: Supabase (PostgreSQL 16 + pgvector + Realtime)
- Orquestación: n8n
- Despliegue: S3 + CloudFront (estático, SSG)
- Testing: Vitest (unit), Playwright (E2E)
- CI/CD: GitHub Actions
- Monitoreo: Loki + Prometheus + Sentry + Grafana + Uptime Kuma

## Antes de implementar CUALQUIER feature
1. Leer la documentación relevante en @docs/Document Hub/
2. Verificar requerimientos específicos (RF/RNF) en @docs/Document Hub/Pre Estudio Inicial/Requerimientos.md
3. Consultar la arquitectura y ADRs en @docs/Document Hub/INSTANCIA 2 — Sprint 0/Arquitectura y Stack Tecnológico.md
4. Revisar diseño UX-UI en @docs/Document Hub/Diseño UX-UI/ (Manual completo con 11 capítulos)
5. Verificar trazabilidad RF-Épicas en @docs/Document Hub/Trazabilidad RF-Épicas.md

## Documentación clave en @docs/
| Documento | Path | Qué contiene |
|---|---|---|
| Requerimientos | `Document Hub/Pre Estudio Inicial/Requerimientos.md` | 91 RF + 43 RNF (fuente autoritativa) |
| Arquitectura y ADRs | `Document Hub/INSTANCIA 2 — Sprint 0/Arquitectura y Stack Tecnológico.md` | C4, 9 ADRs, pautas de código, deployment |
| Índice Aurora | `Document Hub/Índice Aurora.md` | Punto de entrada navegable |
| Trazabilidad RF-Épicas | `Document Hub/Trazabilidad RF-Épicas.md` | Matriz RF ↔ módulo ↔ épica |
| Manual de UX-UI | `Document Hub/Diseño UX-UI/Manual de UX-UI Aurora.md` | Entrada al sistema de diseño |
| Arquitectura de Información | `Document Hub/Diseño UX-UI/Arquitectura de Información — Aurora Care.md` | Sitemap, navegación, inventario de pantallas |
| User Flows | `Document Hub/Diseño UX-UI/User Flows.md` | Flujos MVP en Mermaid |
| Journeys y Escenarios | `Document Hub/Diseño UX-UI/Journeys y Escenarios.md` | 6 journeys de usuario |
| Color | `Document Hub/Diseño UX-UI/Color.md` | Paleta completa, tokens, 34/34 pares WCAG verificados |
| Tipografía | `Document Hub/Diseño UX-UI/Tipografía.md` | Figtree + Inter + Atkinson Hyperlegible |
| Fundamentos Visuales | `Document Hub/Diseño UX-UI/Fundamentos Visuales.md` | Iconografía Lucide, grilla 8pt, radios, elevación, motion |
| Accesibilidad | `Document Hub/Diseño UX-UI/Accesibilidad.md` | WCAG 2.2 AA + pautas deterioro cognitivo + cuidador bajo estrés |
| Proto-personas | `Document Hub/Diseño UX-UI/Proto-personas.md` | Ana, María, Diego, Silvina |
| VUI Diseño Conversacional | `Document Hub/Diseño UX-UI/VUI — Diseño Conversacional.md` | Principios, guiones, estados LED/display |
| Product Backlog | `Document Hub/INSTANCIA 2 — Sprint 0/Product Backlog Inicial.md` | Épicas e historias iniciales |
| User Story Map | `Document Hub/INSTANCIA 2 — Sprint 0/User Story Map.md` | Matriz alcance MVP vs visión |
| Funcionalidades Sistema Hogar | `Document Hub/Pre Estudio Inicial/Funcionalidades del Sistema en el Hogar.md` | Componentes por módulo |
| Design tokens | `Design/tokens/tokens.json` + `Design/tokens/tokens.css` | Fuente de verdad programática del diseño |

---

## Requerimientos del módulo Cuidador (RF-60 a RF-75, AURA-18)

| RF | Requerimiento | MVP |
|---|---|---|
| RF-60 | Visualizar estado actual del paciente | Sí |
| RF-61 | Visualizar datos biométricos recientes | Sí |
| RF-62 | Visualizar ubicación actual/última | Sí |
| RF-63 | Visualizar historial de eventos | Sí |
| RF-64 | Visualizar alertas activas e históricas | Sí |
| RF-65 | Configurar rutinas diarias | Sí |
| RF-66 | ABMC horarios de medicación y tratamientos | Sí |
| RF-67 | ABMC reglas y niveles de alerta | Sí |
| RF-68 | ABMC datos personales, preferencias y recuerdos | Sí |
| RF-69 | ABMC contactos de emergencia | Sí |
| RF-70 | ABMC zonas seguras | Sí |
| RF-71 | Consultar estado de dispositivos conectados | Sí |
| RF-72 | Registrar confirmación de atención de alerta | Sí |
| RF-73 | Iniciar comunicación directa (drop-in) | Sí |
| RF-74 | ABMC información del perfil del paciente | Sí |
| RF-75 | ABMC nuevos flujos de acción ante eventos | Sí |

Requerimientos no funcionales del cuidador: RNF-30 (prioridad visual), RNF-31 (pantallas simples), RNF-32 (actualización en tiempos adecuados), RNF-33 (sin sobrecarga visual).

Requerimientos de seguridad: RF-76 a RF-81 (autenticación, permisos, encriptación, consentimiento, Ley 25.326).

Requerimientos de rutinas/medicación compartidos: RF-82 a RF-91 (ABMC rutinas, horarios, cumplimiento).

---

## Navegación de la app (Mobile: bottom tab bar de 5 ítems)

| Tab | Ícono Lucide | Contenido |
|---|---|---|
| **Inicio** | `house` | Dashboard: estado paciente, próximas rutinas, alertas activas, dispositivos |
| **Rutinas** | `calendar-clock` | Agenda del día, segmentos Rutinas/Medicación, editores |
| **Recuerdos** | `book-heart` | Biografía, recuerdos, vínculos, preferencias, validaciones pendientes |
| **Actividad** | `bell` | Alertas, Terapias, Historial |
| **Ajustes** | `settings` | Perfil, cuidadores, dispositivos, reglas, contactos, privacidad |

Acción flotante persistente en Inicio: **Hablar con Ana** (drop-in, RF-73).
Deep links de notificaciones: toda push abre el **detalle de la alerta**, nunca el home.

### Sitemap resumido
```
Auth → Onboarding Wizard (5 pasos) → Inicio
Tabs: Inicio | Rutinas | Recuerdos | Actividad | Ajustes
Inicio → Drop-in, Detalle estado
Rutinas → Editor rutina, Editor medicación, Historial cumplimiento
Recuerdos → Alta/edición recuerdo, Cola de validación
Actividad → Detalle alerta, Timeline eventos, Biblioteca terapias → Player sesión guiada, Resultados
Ajustes → Perfil paciente, Cuidadores/dispositivos, Reglas, Contactos, Dispositivos, Privacidad
```

---

## Estados obligatorios por pantalla

Cada pantalla debe diseñarse con 5 estados:
1. **Ideal** — contenido completo
2. **Vacío** — primer uso, con CTA educativo
3. **Cargando** — skeleton
4. **Error/parcial**
5. **Offline** — último dato sincronizado + timestamp visible (nunca datos viejos que parezcan actuales)

Estado sin wearable (RN10) no es error: dashboard reordena y muestra lo que sí sabe.

---

## Principios de diseño (Manual de UX-UI)

1. **Lo crítico primero** — jerarquía visual = jerarquía de riesgo (SOS > alertas preventivas > estado > configuración)
2. **Calma, no alarma** — informar sin dramatizar ("Ana no confirmó la toma", nunca "¡Ana olvidó su medicación!")
3. **Una acción principal por pantalla** — CTA dominante, lo demás secundario
4. **Nunca infantilizar** — tono cálido pero respetuoso, sin diminutivos, sin emojis decorativos
5. **Visible de un vistazo** — estados legibles en segundos: color + ícono + texto
6. **Confianza mediante consistencia** — un token, un significado

---

## Diseño visual

### Paleta de colores
- **Violeta** = marca y acción (`violet-600 #6E4FE0` en claro, `violet-500` en oscuro)
- **Lima** = acento y "activo/en vivo" (`lime-300 #E5F06F`, siempre con texto `neutral-850`)
- **Rojo** = solo emergencia/SOS (`red-600` en claro, `red-500` en oscuro/dispositivo)
- **Neutros**: `neutral-50` fondo claro, `neutral-0` superficies claras, `neutral-850` fondo oscuro
- **Semánticos**: green (éxito), blue (info), amber (advertencia), red (emergencia) — cada uno con fondos 100, pastel 300, ícono 600, texto 700

### 3 temas
| Tema | Dónde | Base |
|---|---|---|
| **Claro** (default) | Aurora Care | Fondo `neutral-50`, superficies blancas |
| **Oscuro** | Identidad, dark mode | Aurora Night `#0B1026` + Deep Indigo `#171E42` |
| **Device** | Display Aurora Home | `neutral-900`, texto blanco grande, acento lima |

### Tipografía
| Rol | Familia | Uso |
|---|---|---|
| Títulos y marca | **Figtree** (Google Fonts, variable 300-900) | Headers, títulos |
| Cuerpo y UI | **Inter** (Google Fonts, variable, números tabulares) | Texto, labels, datos |
| Display dispositivo | **Atkinson Hyperlegible Next** | Aurora Home (legibilidad a 2-3m) |

Reglas: 16px piso contenido, 14px labels, 12px solo metadatos. Números tabulares en datos. Line-height 1.5 cuerpo, 1.2 títulos.

### Iconografía
- **Lucide** (open source), 24x24px, trazo 2px

### Espaciado y grilla
- Grilla **8pt** (escala 4-80), áreas táctiles ≥44x44px
- Breakpoints: mobile 390px, tablet 768px, desktop 1440px
- Radios: sm 8px, md 12px, lg 16px, xl 24px, full 999px
- Elevación: 3 niveles con sombras teñidas de `neutral-850`
- Motion: 80ms micro, 120ms small, 200ms standard, 300ms moderate, 400ms slow

---

## Accesibilidad (WCAG 2.2 AA)

- 34/34 pares de tokens verificados por script (`Design/tools/contrast.py`)
- Layout responsive desde 320px sin scroll horizontal
- Toda la app operable por teclado, foco visible (2px + offset)
- Controles ≥44x44px
- Todo estado semántico = color + ícono + texto (nunca solo color)
- Mensajes de error junto al campo, en lenguaje claro
- Respeto a `prefers-reduced-motion`

### Accesibilidad cognitiva (paciente GDS ≤5)
- Cero aprendizaje requerido, instrucciones en oraciones simples
- Tiempo de respuesta flexible, confirmación positiva inmediata
- Un control a la vez

### Uso bajo estrés (cuidador)
- Información crítica visible en ≤3 segundos
- Acciones grandes y distinguibles
- Undo para acciones no destructivas
- Estados compartidos en tiempo real

---

## Proto-personas

| Persona | Rol | Superficie |
|---|---|---|
| **Ana** (76 años, GDS 4) | Paciente | Aurora Home (voz + display + SOS) |
| **María** (52 años) | Cuidadora primaria, administra cuenta | Aurora Care mobile + desktop |
| **Diego** (47 años) | Cuidador a distancia | Aurora Care mobile-only |
| **Silvina** | Coordinadora institucional | Dashboard multi-paciente (visión, fuera MVP) |

---

## User Flows MVP

- **F1**: Registro y onboarding del hogar (cuenta única, wizard 5 pasos, código 6 dígitos, <15 min)
- **F2**: ABMC de rutina (editor con prioridad que define severidad de omisión)
- **F3**: Recordatorio medicación: confirmación/omisión (flujo del sistema con margen configurado)
- **F4**: Alta de recuerdo con validación (pendiente de aprobación por cuidador principal)
- **F5**: Ciclo de vida de alerta con escalado (generada → enviada → atendida → cerrada)
- **F6**: Drop-in (audio unidireccional, cierre de loop por STT)
- **F7**: Gestión de dispositivos
- **F8**: Sesión guiada de terapia (cuidador + Aurora en dúo)
- **F9**: Actividad autónoma + descubrimientos

Visión (wireframes): F10 zonas seguras, F11 biometría, F12 llamada emergencia, F13 reporte médico.

---

## Journeys clave

1. **J1 — Onboarding**: María configura en <15 min, momento wow al primer saludo de Aurora
2. **J2 — Día típico**: 90% del valor es pasivo (vistazo de 5 segundos)
3. **J3 — Alerta omisión crítica**: escalado automático cuando María no responde
4. **J4 — Drop-in** (Diego): audio unidireccional con cierre emocional
5. **J5 — Sesión reminiscencia**: María como co-terapeuta
6. **J6 — Fuga zona segura** (visión): geofencing + llamada automática

---

## User Story Map (MVP)

| Actividad | Tareas MVP |
|---|---|
| Gestión de Cuenta | Cuenta única del hogar, perfil paciente, cuidadores vinculados |
| Configuración de Cuidados | Rutinas diarias (horario/frecuencia/prioridad), tratamientos/medicación |
| Terapia Cognitiva | Recuerdos/vínculos, ejercicios cognitivos, reminiscencia por voz, registrar participación |
| Monitoreo y Alertas | Estado paciente/dispositivos, historial cumplimiento, alertas omisiones críticas |

---

## Convenciones de código

| Elemento | Convención |
|---|---|
| Archivos | `kebab-case` |
| Componentes React | `PascalCase` |
| Hooks | `use` prefix, `camelCase` |
| Types/Interfaces | `PascalCase` |
| CSS | Tailwind CSS (utility-first) |
| Commits | Conventional: `feat(patient): agregar CRUD de perfil` |
| Ramas | `feature/AUR-[num]-[descripcion]` |
| PRs | Revisión obligatoria de ≥1 persona distinta al autor |

### Estructura de directorios del frontend
```
frontend/
  src/
    app/           (Next.js App Router)
      (auth)/
      dashboard/
      patient/
      alerts/
      routines/
      settings/
    components/
      ui/          (componentes base del design system)
      shared/      (componentes compartidos)
      features/    (componentes por feature/módulo)
    lib/
      api/         (cliente API, endpoints, tipos)
      hooks/       (custom hooks)
      utils/       (utilidades)
      types/       (tipos TypeScript globales)
    public/
      sw.js        (Service Worker para PWA)
```

---

## Criterios de aceptación clave (del Product Backlog)

- **US 1.1 (Registro)**: un solo perfil de paciente por hogar; datos encriptados (Ley 25.326)
- **US 1.2 (Rutinas/Biografía)**: alertas recurrentes; texto sincronizado con base vectorial RAG
- **US 3.2 (Alerta geofencing)**: push <30s desde detección; acceso directo al mapa con GPS

---

## Definition of Done

- Cumple todos los criterios de aceptación
- Código revisado y aprobado, integrado sin errores
- Pasa tests y métricas de calidad mínimas
- No interfiere con funcionalidades preexistentes

---

## Dónde actualizar la documentación

| Qué | Dónde se actualiza | Quién |
|---|---|---|
| Requerimientos (RF/RNF) | `@docs/Document Hub/Pre Estudio Inicial/Requerimientos.md` | Analistas (Mateo, Haik) |
| Arquitectura y ADRs | `@docs/Document Hub/INSTANCIA 2 — Sprint 0/Arquitectura y Stack Tecnológico.md` | Equipo técnico |
| Diseño UX-UI (tokens, colores, tipografía) | `@docs/Document Hub/Diseño UX-UI/` (capítulos individuales) + `Design/tokens/tokens.json` | Jeremías, Nicolás |
| Design tokens (fuente de verdad programática) | `Design/tokens/tokens.json` → `tokens.css` | Jeremías |
| User Flows | `@docs/Document Hub/Diseño UX-UI/User Flows.md` | Jeremías, Nicolás |
| Journeys y Escenarios | `@docs/Document Hub/Diseño UX-UI/Journeys y Escenarios.md` | Jeremías, Nicolás |
| Arquitectura de Información | `@docs/Document Hub/Diseño UX-UI/Arquitectura de Información — Aurora Care.md` | Jeremías |
| Product Backlog / User Stories | `@docs/Document Hub/INSTANCIA 2 — Sprint 0/Product Backlog Inicial.md` | PO rotativo |
| User Story Map | `@docs/Document Hub/INSTANCIA 2 — Sprint 0/User Story Map.md` | PO rotativo |
| Trazabilidad RF-Épicas | `@docs/Document Hub/Trazabilidad RF-Épicas.md` | Generado automáticamente |
| Tablero Jira | `@docs/Document Hub/Tablero Jira.md` + `@docs/jira/snapshot.json` | Sync con Jira |
| Working Agreement | `@docs/Document Hub/INSTANCIA 2 — Sprint 0/Working Agreement.md` | Todo el equipo (sprint review) |
| Plan de Testing | `@docs/Document Hub/INSTANCIA 2 — Sprint 0/Plan de Testing.md` | QA |
| Artefactos de trazabilidad por US | `@docs/Document Hub/Trazabilidad/` | Skill `/artefacto-trazabilidad` |
| Este archivo (AGENTS.md) | `./AGENTS.md` (raíz de este repo) | DevOps / quien modifique el proyecto |

### Reglas de actualización
1. Los **design tokens** (`Design/tokens/tokens.json`) son la fuente de verdad programática — si difieren del manual, manda `tokens.json`
2. Los **requerimientos** (`Requerimientos.md`) son la fuente autoritativa de RF/RNF
3. La **trazabilidad RF-Épicas** se regenera automáticamente con la skill `/artefacto-trazabilidad`
4. El **tablero Jira** se sincroniza con el MCP de Atlassian (cuenta `jeremias.gomez@craftech.io`)
5. Los **wikilinks** (`[[Nombre]]`) en Obsidian alimentan el grafo de navegación del vault

---

## Comandos
- Dev: `npm run dev`
- Build: `npm run build`
- Test: `npm test`
- Lint: `npm run lint`
