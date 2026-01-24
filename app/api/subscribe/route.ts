import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, nombre, whatsapp, edad } = await request.json();

    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    const LIST_ID = parseInt(process.env.BREVO_LIST_ID || "2");

    if (!BREVO_API_KEY) {
      return NextResponse.json({ success: false, error: "Falta API Key de Brevo" }, { status: 500 });
    }

    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": BREVO_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        updateEnabled: false,
        email: email,
        attributes: {
          // IMPORTANTE: Verifica que estos nombres existan EXACTAMENTE así en Brevo
          NOMBRE: nombre,
          TEL_WATSAP: whatsapp,
          EDAD: edad,
        },
        listIds: [LIST_ID],
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    if (data.code === "duplicate_parameter") {
      return NextResponse.json(
        { success: false, error: "Este email ya está registrado." },
        { status: 409 }
      );
    }

    // FIX: Devolvemos el mensaje real de Brevo para saber qué atributo falla
    return NextResponse.json(
      { success: false, error: data.message || "Error de validación de los datos." },
      { status: 400 }
    );

  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Error de conexión con el servidor." },
      { status: 500 }
    );
  }
}