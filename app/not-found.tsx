import Link from "next/link";

/**
 * Red de seguridad para rutas que el matcher de proxy.ts excluye
 * (docs/12-loading-empty-error.md §3.2). En español, el idioma principal.
 *
 * No redeclara <html>/<body> — los hereda de app/layout.tsx, que ya los
 * define. Next.js exige un único árbol <html> por respuesta; solo el layout
 * raíz puede declararlo.
 */
export default function RootNotFound() {
  return (
    <section style={{ padding: "4rem 1.5rem", textAlign: "center" }}>
      <h1>Esta página no existe.</h1>
      <p>Puede que el enlace esté roto o que la página haya cambiado de dirección.</p>
      <p>
        <Link href="/">Ir al inicio</Link>
      </p>
    </section>
  );
}
