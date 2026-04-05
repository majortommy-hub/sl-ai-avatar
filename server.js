import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const userMsg = req.body.msg;

    const aiRes = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        input: `Rispondi breve come un avatar in Second Life:\n${userMsg}`
      })
    });

    const data = await aiRes.json();
console.log(data);
    const reply =
      data.output?.[0]?.content?.[0]?.text || "Non so cosa dire 😅";

    res.send(reply);

  } catch (err) {
    console.error(err);
    res.send("Errore server");
  }
});

app.listen(3000, () => {
  console.log("Server attivo su porta 3000");
});
