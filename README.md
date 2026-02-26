# LeadMagnet-AI

## Prévisualisation locale (pour Playwright)

Pour éviter l'erreur indiquant qu'aucun serveur n'est accessible sur `127.0.0.1:3000` ou `127.0.0.1:4173`, vous pouvez lancer un serveur HTTP local dans ce repo :

```bash
python3 -m http.server 4173
```

Puis ouvrir :

- `http://127.0.0.1:4173/preview.html`

Cette page (`preview.html`) sert d'aperçu local autonome pour la validation visuelle et la capture Playwright.
