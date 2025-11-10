-- 🔁 Incrementar cupoActual al insertar inscripción
create or replace function incrementar_cupo()
returns trigger as $$
begin
  update circuitos
  set "cupoActual" = "cupoActual" + 1
  where id = new.circuito_id;
  return new;
end;
$$ language plpgsql;

create trigger actualizar_cupo
after insert on inscripciones
for each row
execute procedure incrementar_cupo();

-- 🔁 Decrementar cupoActual al eliminar inscripción
create or replace function decrementar_cupo()
returns trigger as $$
begin
  update circuitos
  set "cupoActual" = "cupoActual" - 1
  where id = old.circuito_id;
  return old;
end;
$$ language plpgsql;

create trigger reducir_cupo
after delete on inscripciones
for each row
execute procedure decrementar_cupo();
