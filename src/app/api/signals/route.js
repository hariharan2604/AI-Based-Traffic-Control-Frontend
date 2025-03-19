import { NextResponse } from "next/server";
import { signalState } from "@/app/actions/mqttActions";

export async function GET() {
    return NextResponse.json(signalState);
}
