import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, nombre, whatsapp, edad } = await request.json();
    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    const LIST_ID = parseInt(process.env.BREVO_LIST_ID || "2");

    const body = {
      updateEnabled: true,
      email: email,
      attributes: {
        NOMBRE: nombre,
        TEL_WATSAP: whatsapp,
        EDAD: edad,
      },
      listIds: [LIST_ID],
    };

    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": BREVO_API_KEY as string,
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    return NextResponse.json({ error: "Error en Brevo" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}