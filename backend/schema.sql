-- PostgreSQL schema for football predictions app
-- Compatible with Supabase/PostgreSQL 14+

create extension if not exists "pgcrypto";

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique, -- map to supabase auth.users.id when used
  email text not null unique,
  username text not null unique,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists matches (
  id uuid primary key default gen_random_uuid(),
  external_id text unique,
  competition text not null,
  home_team text not null,
  away_team text not null,
  kickoff_at timestamptz not null,
  status text not null default 'scheduled' check (status in ('scheduled', 'live', 'finished', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists predictions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  match_id uuid not null references matches(id) on delete cascade,
  home_score_pred smallint not null check (home_score_pred >= 0),
  away_score_pred smallint not null check (away_score_pred >= 0),
  is_locked boolean not null default false,
  points_awarded smallint not null default 0 check (points_awarded between 0 and 3),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, match_id)
);

create table if not exists results (
  id uuid primary key default gen_random_uuid(),
  match_id uuid not null unique references matches(id) on delete cascade,
  home_score smallint not null check (home_score >= 0),
  away_score smallint not null check (away_score >= 0),
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists leaderboard (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  period_type text not null check (period_type in ('global', 'weekly', 'monthly')),
  period_start date,
  period_end date,
  total_points integer not null default 0,
  exact_hits integer not null default 0,
  correct_outcomes integer not null default 0,
  rank_position integer,
  updated_at timestamptz not null default now(),
  unique (user_id, period_type, period_start)
);

create index if not exists idx_matches_kickoff_at on matches(kickoff_at);
create index if not exists idx_matches_status on matches(status);
create index if not exists idx_predictions_match on predictions(match_id);
create index if not exists idx_predictions_user on predictions(user_id);
create index if not exists idx_leaderboard_type_points on leaderboard(period_type, total_points desc);

create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_users_updated_at
before update on users
for each row execute procedure set_updated_at();

create trigger trg_matches_updated_at
before update on matches
for each row execute procedure set_updated_at();

create trigger trg_predictions_updated_at
before update on predictions
for each row execute procedure set_updated_at();

create or replace function prevent_prediction_after_kickoff()
returns trigger
language plpgsql
as $$
declare
  kickoff timestamptz;
begin
  select kickoff_at into kickoff from matches where id = new.match_id;

  if kickoff is null then
    raise exception 'Match % introuvable', new.match_id;
  end if;

  if now() >= kickoff then
    raise exception 'Pronostic verrouillé: coup d''envoi dépassé';
  end if;

  return new;
end;
$$;

create trigger trg_predictions_before_write
before insert or update on predictions
for each row execute procedure prevent_prediction_after_kickoff();

create or replace function outcome_code(home int, away int)
returns text
language sql
immutable
as $$
  select case
    when home > away then 'H'
    when home < away then 'A'
    else 'D'
  end
$$;

create or replace function recalculate_match_points()
returns trigger
language plpgsql
as $$
begin
  update predictions p
  set points_awarded = case
    when p.home_score_pred = new.home_score and p.away_score_pred = new.away_score then 3
    when outcome_code(p.home_score_pred, p.away_score_pred) = outcome_code(new.home_score, new.away_score) then 1
    else 0
  end,
  is_locked = true,
  updated_at = now()
  where p.match_id = new.match_id;

  update matches
  set status = 'finished',
      updated_at = now()
  where id = new.match_id;

  return new;
end;
$$;

create trigger trg_results_after_upsert
after insert or update on results
for each row execute procedure recalculate_match_points();

create or replace view user_prediction_history as
select
  p.id as prediction_id,
  p.user_id,
  p.match_id,
  m.competition,
  m.home_team,
  m.away_team,
  m.kickoff_at,
  p.home_score_pred,
  p.away_score_pred,
  r.home_score,
  r.away_score,
  p.points_awarded,
  p.created_at
from predictions p
join matches m on m.id = p.match_id
left join results r on r.match_id = p.match_id;
