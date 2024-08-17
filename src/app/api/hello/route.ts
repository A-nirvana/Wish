export async function GET() {
    const data = {
        name: "Batman",
        image: "/batman.jpg",
        text: "Happiest Birthday to Batman",

    }
    return Response.json(data)
  }