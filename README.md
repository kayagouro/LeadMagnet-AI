# Application mobile de pronostics football

Ce dépôt propose une base **prête à implémenter** pour une application mobile de pronostics de scores (React Native + backend PostgreSQL/Supabase), avec authentification, classement compétitif et données persistantes.

## 1) Fonctionnalités couvertes

### Gestion des utilisateurs
- Inscription / connexion (email + mot de passe via Supabase Auth ou OAuth Google/Apple).
- Profil utilisateur : pseudo, avatar, statistiques globales.
- Historique des pronostics avec détail match + points obtenus.

### Gestion des matchs
- Liste des matchs à venir (date, heure, équipes, compétition).
- Liste des résultats passés.
- Détail d’un match : infos, cotes éventuelles, pronostics agrégés.

### Système de pronostics
- Saisie d’un score exact avant le coup d’envoi.
- Modification autorisée tant que le match n’a pas commencé.
- Consultation des pronostics des autres utilisateurs uniquement après verrouillage (début du match ou validation admin).

### Points & classement
- Score exact : **3 points**.
- Bon résultat (1N2 correct, score non exact) : **1 point**.
- Mauvais résultat : **0 point**.
- Classements : global, hebdomadaire, mensuel.

---

## 2) Architecture technique recommandée

- **Mobile** : React Native (Expo) + React Navigation (onglets).
- **Backend** : Supabase (PostgreSQL + Auth + Row Level Security + Edge Functions) ou API REST Node/Nest.
- **Persistance** : PostgreSQL (schéma SQL fourni dans `backend/schema.sql`).
- **Mise à jour résultats** : job planifié (cron Supabase Edge Function) alimenté par une API football externe.
- **Scalabilité** :
  - tables normalisées + index,
  - triggers SQL pour calcul automatique des points,
  - vues matérialisées optionnelles pour leaderboard,
  - cache côté mobile + pagination.

Détails d’implémentation : `docs/architecture.md`.

---

## 3) Navigation UX (onglets)

- **Accueil** : matchs à venir + CTA “Pronostiquer”.
- **Résultats** : derniers scores finalisés.
- **Classement** : global / semaine / mois.
- **Profil** : avatar, stats, historique pronostics.

Un squelette d’interface RN est disponible dans `mobile/App.tsx`.

---

## 4) Schéma base de données

Le fichier `backend/schema.sql` contient :
- `users`
- `matches`
- `predictions`
- `results`
- `leaderboard`

avec :
- contraintes d’intégrité,
- index de performance,
- trigger de verrouillage des pronostics au coup d’envoi,
- trigger de calcul de points lors de publication des résultats.

---

## 5) Optionnel (version avancée)

Déjà prévu dans l’architecture :
- notifications push avant match,
- ligues privées,
- badges/gamification,
- ingestion automatisée via API football.
