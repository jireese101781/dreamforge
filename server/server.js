import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import OpenAI from "openai"

dotenv.config()

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Dreamforge AI server is running.",
  })
})

app.post("/api/ai", async (req, res) => {
  try {
    const { message } = req.body

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        success: false,
        error: "A message is required.",
      })
    }

    const response = await openai.responses.create({
      model: "gpt-6-astra",
      instructions:
        "You are Dreamforge AI, an interactive storytelling assistant. Respond naturally and creatively while following the user's instructions.",
      input: message,
    })

    res.json({
      success: true,
      response: response.output_text,
    })
  } catch (error) {
    console.error("Dreamforge AI error:", error)

    res.status(500).json({
      success: false,
      error: "Dreamforge AI could not generate a response.",
    })
  }
})

app.listen(PORT, () => {
  console.log(`Dreamforge AI server running at http://localhost:${PORT}`)
})
