import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * mantém a navegação coerente entre rotas e âncoras:
 * âncora presente → rola até a seção; rota nova → volta ao topo.
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
