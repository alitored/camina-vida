-- Tabla: circuitos
create table if not exists circuitos (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  alias text,
  localidad text,
  horario text,
  estado boolean default true,
  imagen text,
  cupoActual int2 default 0,
  created_at timestamp with time zone default now()
);

-- Tabla: inscripciones
create table if not exists inscripciones (
  id uuid primary key default gen_random_uuid(),
  circuito_id uuid references circuitos(id) on delete cascade,
  nombre text not null,
  email text not null,
  horario text not null,
  created_at timestamp with time zone default now()
);

-- Índice para evitar duplicados por circuito + email
create unique index if not exists idx_unico_inscripcion
on inscripciones (circuito_id, lower(email));
