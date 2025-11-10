-- Circuitos de prueba
insert into circuitos (id, nombre, alias, localidad, horario, estado, imagen, cupoActual)
values
  (gen_random_uuid(), 'Circuito Sur', 'sur', 'Libertad', '10:30 - 12:30', true, 'https://via.placeholder.com/300x200?text=Sur', 0),
  (gen_random_uuid(), 'Circuito Norte', 'norte', 'San Justo', '14:00 - 16:00', true, 'https://via.placeholder.com/300x200?text=Norte', 0),
  (gen_random_uuid(), 'Circuito Oeste', 'oeste', 'Morón', '09:00 - 11:00', false, 'https://via.placeholder.com/300x200?text=Oeste', 0),
  (gen_random_uuid(), 'Circuito Este', 'este', 'Merlo', '16:30 - 18:30', true, 'https://via.placeholder.com/300x200?text=Este', 0);

-- Inscripciones simuladas
insert into inscripciones (id, circuito_id, nombre, email, horario)
select gen_random_uuid(), id, 'Juan Pérez', 'juan@example.com', horario
from circuitos
where nombre = 'Circuito Sur';

insert into inscripciones (id, circuito_id, nombre, email, horario)
select gen_random_uuid(), id, 'Ana Gómez', 'ana@example.com', horario
from circuitos
where nombre = 'Circuito Norte';
