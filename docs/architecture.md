# Architecture cible

## Vue d’ensemble

L’application est pensée en 3 couches :

1. **Mobile (React Native)**
   - UI, navigation par onglets, cache local.
2. **Backend (Supabase / API REST)**
   - authentification, règles d’accès, logique métier.
3. **Data (PostgreSQL)**
   - stockage persistant des utilisateurs, matchs, pronostics, résultats, classement.

## Modules fonctionnels

### 1. Authentification & profils
- Supabase Auth : email/password + OAuth (Google/Apple).
- Synchronisation `auth.users` -> table métier `users`.
- RLS : un utilisateur ne modifie que son profil.

### 2. Ingestion des matchs
- Tâche planifiée (cron toutes les 30 à 60 min).
- Récupération depuis API externe football.
- Upsert dans `matches` avec `external_id`.

### 3. Pronostics
- Endpoint/API : création ou mise à jour d’un pronostic.
- Contrôle côté SQL via trigger : bloque après `kickoff_at`.
- RLS : utilisateur ne modifie que ses propres pronostics.

### 4. Résultats & points
- Lorsqu’un résultat est inséré/mis à jour :
  - trigger SQL calcule `points_awarded` (3/1/0),
  - verrouille les pronostics,
  - passe le match à `finished`.

### 5. Leaderboard
- Agrégation batch (job chaque nuit + refresh rapide après match).
- 3 périodes : global, hebdomadaire, mensuelle.
- Option : matérialiser les vues pour scaler.

## API REST minimale (si backend custom)

- `POST /auth/signup`
- `POST /auth/login`
- `GET /matches/upcoming`
- `GET /matches/results`
- `GET /matches/:id`
- `PUT /matches/:id/prediction`
- `GET /matches/:id/predictions` (restreint selon statut match)
- `GET /leaderboard?period=global|weekly|monthly`
- `GET /me/profile`
- `GET /me/predictions`

## Sécurité
- JWT côté mobile.
- RLS sur toutes les tables sensibles.
- Rate limiting API.
- Journalisation des opérations critiques (publication résultats, recalcul points).

## Scalabilité
- Index SQL sur colonnes de tri/recherche.
- Pagination (`limit/offset` ou curseur).
- Cache HTTP/CDN pour endpoints de lecture publique.
- File d’événements optionnelle pour recalcul asynchrone du classement.

## Fonctionnalités optionnelles
- Push notifications (rappels avant kickoff).
- Ligues privées (`private_leagues`, `league_members`, `league_leaderboard`).
- Badges (`badges`, `user_badges`).
