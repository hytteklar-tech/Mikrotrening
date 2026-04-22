alter table users
  add column if not exists is_pwa boolean not null default false;
