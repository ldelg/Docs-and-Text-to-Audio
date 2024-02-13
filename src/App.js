import "./App.css";
import React, { useState } from "react";
import mammoth from "mammoth";
import useSpeechSynthesis from "./useSpeechSynthesis";

const App = () => {
  const [text, setText] = useState("Upload a PDF, DOCX, a plain Text file or paste your own content and convert it to audio");
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [voiceIndex, setVoiceIndex] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const onEnd = () => {
    // You could do something here after speaking has finished
  };
  const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis({
    onEnd,
  });

  const voice = voices[voiceIndex] || null;

  const handleFileChange = (event) => {
    setUploadedFile(event.target.files[0]);
  };

  const extractTextFromPdf = async (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = async (e) => {
        const typedArray = new Uint8Array(e.target.result);
        try {
          if (typeof window.pdfjsLib === "undefined") {
            console.error("pdfjsLib is not loaded.");
            reject("pdfjsLib is not loaded.");
            return;
          }

          const pdfDoc = await window.pdfjsLib.getDocument({ data: typedArray })
            .promise;
          let extractedText = "";

          for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
            const page = await pdfDoc.getPage(pageNum);
            const textContent = await page.getTextContent();
            extractedText += textContent.items
              .map((item) => item.str)
              .join(" ");
          }

          resolve(extractedText);
        } catch (error) {
          console.error("Error extracting text from PDF:", error);
          reject(error);
        }
      };

      fileReader.onerror = (error) => {
        console.error("Error reading file:", error);
        reject(error);
      };

      fileReader.readAsArrayBuffer(file);
    });
  };

  const extractTextFromDocx = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  };

  const extractTextFromTxt = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (e) => reject(e);
      reader.readAsText(file);
    });
  };

  const extractText = async (file) => {
    let extractedText = "";

    switch (uploadedFile.type) {
      case "application/pdf":
        extractedText = await extractTextFromPdf(file);
        break;
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        extractedText = await extractTextFromDocx(uploadedFile);
        break;
      case "text/plain":
        extractedText = await extractTextFromTxt(uploadedFile);
        break;
      default:
        extractedText = "Your files can only be of type PDFs, Text or Doc/Docx";
    }

    setText(extractedText);
  };

  return (
    <div className="container">
      <form>
        <h2>Speech Synthesis</h2>
        {!supported && (
          <p>
            Oh no, it looks like your browser doesn&#39;t support Speech
            Synthesis.
          </p>
        )}
        {supported && (
          <>
            <p>
              {`Type a message below then click 'Speak'
                and SpeechSynthesis will read it out.`}
            </p>
            <div className="small-container">
              <label htmlFor="voice">Voice</label>
              <select
                id="voice"
                name="voice"
                value={voiceIndex || ""}
                onChange={(event) => {
                  setVoiceIndex(event.target.value);
                }}
              >
                <option value="">Default</option>
                {voices.map((option, index) => (
                  <option key={option.voiceURI} value={index}>
                    {`${option.lang} - ${option.name}`}
                  </option>
                ))}
              </select>
            </div>
            <div className="container-rate-pitch">
              <div className="inner-container">
                <label htmlFor="rate">Rate: </label>
                <div className="rate-value">{rate}</div>
              </div>
              <input
                type="range"
                min="0.5"
                max="4"
                defaultValue="1"
                step="0.1"
                id="rate"
                onChange={(event) => {
                  setRate(event.target.value);
                }}
              />
            </div>
            <div className="container-rate-pitch">
              <div className="inner-container">
                <label htmlFor="pitch">Pitch: </label>
                <div className="pitch-value">{pitch}</div>
              </div>
              <input
                type="range"
                min="0"
                max="4"
                defaultValue="1"
                step="0.1"
                id="pitch"
                onChange={(event) => {
                  setPitch(event.target.value);
                }}
              />
            </div>
            <div className="pdf-container">
              <input
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.docx,.txt"
              />
              <button type="button" onClick={() => extractText(uploadedFile)}>
                Extract Text and Speak
              </button>
            </div>
            <div className="small-container">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={8}
                value={text}
                onChange={(event) => {
                  setText(event.target.value);
                }}
              />
            </div>
            {speaking ? (
              <button type="button" onClick={cancel}>
                Stop
              </button>
            ) : (
              <button
                type="button"
                onClick={() => speak({ text, voice, rate, pitch })}
              >
                Speak
              </button>
            )}
          </>
        )}
      </form>
    </div>
  );
};

export default App;
