import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { encode } from "gpt-3-encoder";

dotenv.config();
const API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

const MAX_TOKENS = 4000;

const getResumeFeedback = async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    if (!resumeText) {
      return res.status(400).json({
        message: "Your resume must be provided in text format for feedback to be provided.",
      });
    }

    let combinedText = resumeText;
    if (jobDescription) {
      combinedText += `\n\nJob Description:\n${jobDescription}`;
    }
    const tokenCount = encode(combinedText).length;

    if (tokenCount > MAX_TOKENS) {
      return res.status(413).json({
        message: `Input exceeds the ${MAX_TOKENS} token limit. Please shorten your text.`,
      });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
      Analyze the following resume text. 

      ${
        jobDescription
          ? `Compare it with the given job description and provide feedback on how well the resume aligns with the job role.
           Return the feedback as a JSON object with the following fields: 
           "matchScore" (a number from 1 to 10 indicating how well the resume matches the job description), 
           "strengths" (an array of strings highlighting the resume's strengths), 
           "weaknesses" (an array of strings pointing out the resume's weaknesses), 
           "suggestions" (an array of strings providing actionable improvements), 
           and "improvedResume" (the improved resume text).
           Resume:
           ${resumeText}
           Job Description:
           ${jobDescription}`
          : `Provide feedback on the overall resume quality.
           Return the feedback as a JSON object with the following fields: 
           "strengths" (an array of strings highlighting the resume's strengths), 
           "weaknesses" (an array of strings pointing out the resume's weaknesses), 
           "suggestions" (an array of strings providing actionable improvements), 
           and "improvedResume" (the improved resume text).
           Resume:
           ${resumeText}`
      }
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.candidates[0].content.parts[0].text;

    if (!responseText) {
      console.error("Invalid response from Gemini API:", result);
      return res.status(500).json({ message: "Unexpected API response format." });
    }

    const match = responseText.match(/```json\s*([\s\S]*?)\s*```/);
    res.json(JSON.parse(match[1]));

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch resume feedback." });
  }
};

export { getResumeFeedback };
