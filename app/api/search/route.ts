import { NextResponse } from "next/server";


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const appId = process.env.EDAMAM_APP_ID;
  const appKey = process.env.EDAMAM_APP_KEY;

  try {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}&to=10`);

    const data = await response.json();
    if(data.hits) {
      return NextResponse.json(data.hits)
    } else {
      return NextResponse.json({message: "No recipes found"}, {status: 404})
    }
  } catch (error) {
    return NextResponse.json({ message: "Error fetching recipes", error}, { status: 500})
  }
}
