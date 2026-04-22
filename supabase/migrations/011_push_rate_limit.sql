alter table users
  add column if not exists push_count_today int not null default 0,
  add column if not exists push_date date;
