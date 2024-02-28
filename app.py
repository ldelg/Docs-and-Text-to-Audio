from flask import Flask, request, jsonify
from flask_cors import CORS
from vosk import Model, KaldiRecognizer
import os
import wave
from pydub import AudioSegment
import json

app = Flask(__name__)
CORS(app)

model_path = 'models/vosk-model-en-us-0.21'
if not os.path.exists(model_path):
    print("Model path is incorrect. Please adjust it.")
    exit(1)

model = Model(model_path)

@app.route('/transcribe', methods=['POST'])
def transcribe_audio():
    if 'audio' not in request.files:
        return jsonify({'error': 'No audio file provided'}), 400
    
    audio_file = request.files['audio']
    temp_filename = "temp_audio.webm" 
    converted_filename = "temp_audio_converted.wav" 
    audio_file.save(temp_filename)

    # Convert the file to WAV using Pydub for compatibility with Vosk
    audio = AudioSegment.from_file(temp_filename)
    audio.export(converted_filename, format="wav", parameters=["-ar", "16000", "-ac", "1"])

    with wave.open(converted_filename, 'rb') as wf:
        rec = KaldiRecognizer(model, wf.getframerate())
        rec.SetWords(True)

        while True:
            data = wf.readframes(4000)
            if len(data) == 0:
                break
            if rec.AcceptWaveform(data):
                pass 

        result = rec.FinalResult()

    # Cleanup temporary files
    os.remove(temp_filename)
    os.remove(converted_filename)

    result_dict = json.loads(result)
    return jsonify(result_dict)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
