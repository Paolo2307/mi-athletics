# MI Athletics — Site vitrine

Site vitrine one-page pour la marque **MI Athletics**. HTML/CSS/JS pur, aucune installation ni build nécessaire.

## Structure du projet

```
mi-athletics-site/
├── index.html        (Accueil)
├── collection.html    (Collection — clique un tee pour voir couleurs/tailles)
├── histoire.html      (L'Histoire)
├── contact.html       (Contact)
├── style.css
├── script.js
└── assets/
    ├── logo.png
    └── products/
```

## 🖼️ Remplacer les placeholders par tes vraies photos

Dans `index.html`, chaque t-shirt a un bloc `<div class="photo-placeholder">...</div>`.
Pour mettre une vraie photo :

1. Ajoute ton image dans `assets/products/` (par ex. `assets/products/tee-rose.jpg`)
2. Remplace le bloc placeholder par une simple image :

```html
<div class="garment-photo">
  <img src="assets/products/tee-rose.jpg" alt="Tee Signature Rose">
</div>
```

Répète pour chaque produit. Tu peux aussi dupliquer une `<article class="garment-card size-sm">` pour ajouter de nouveaux produits.

## 🚀 Mettre le site en ligne (GitHub + Vercel)

### 1. Créer le dépôt GitHub
1. Va sur [github.com/new](https://github.com/new)
2. Nomme le dépôt (ex. `mi-athletics-site`), garde-le **Public** ou **Privé**, ne coche aucune case d'initialisation
3. Clique **Create repository**

### 2. Envoyer le code sur GitHub
Dans un terminal, à la racine de ce dossier :

```bash
git init
git add .
git commit -m "Premier commit — site MI Athletics"
git branch -M main
git remote add origin https://github.com/TON-PSEUDO/mi-athletics-site.git
git push -u origin main
```

*(Remplace `TON-PSEUDO` par ton nom d'utilisateur GitHub. L'URL exacte est affichée sur la page du dépôt que tu viens de créer.)*

### 3. Déployer sur Vercel
1. Va sur [vercel.com/new](https://vercel.com/new)
2. Connecte ton compte GitHub si ce n'est pas déjà fait
3. Sélectionne le dépôt `mi-athletics-site`
4. Vercel détecte automatiquement que c'est un site statique — **ne change aucun paramètre**, clique **Deploy**
5. En ~30 secondes, ton site est en ligne sur une URL du type `mi-athletics-site.vercel.app`

### 4. Mises à jour futures
À chaque fois que tu modifies le site :

```bash
git add .
git commit -m "Description du changement"
git push
```

Vercel redéploie automatiquement à chaque `push` sur la branche `main`. Aucune action supplémentaire nécessaire.

### 5. (Optionnel) Nom de domaine personnalisé
Dans le dashboard Vercel du projet → **Settings → Domains**, tu peux ajouter un domaine que tu possèdes (ex. `mi-athletics.com`).

---

Fait avec Claude 🩷
