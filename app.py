from flask import Flask, request, jsonify
import deepspeech
import numpy as np
import wave
from flask_cors import CORS
import os
from pydub import AudioSegment

app = Flask(__name__)
CORS(app)

model_file_path = 'models\deepspeech-0.9.3-models.pbmm'
scorer_file_path = 'models\deepspeech-0.9.3-models.scorer'
model = deepspeech.Model(model_file_path)
model.enableExternalScorer(scorer_file_path)

@app.route('/transcribe', methods=['POST'])
def transcribe_audio():
    if 'audio' not in request.files:
        return jsonify({'error': 'No audio file provided'}), 400
    
    audio_file = request.files['audio']
    temp_filename = "temp_audio.webm"
    converted_filename = "temp_audio_converted.wav"
    audio_file.save(temp_filename)

    # Convert the file to WAV using pydub
    audio = AudioSegment.from_file(temp_filename, format="webm")
    audio.export(converted_filename, format="wav", parameters=["-ar", "16000", "-ac", "1"])

    # Process the converted file with DeepSpeech
    with wave.open(converted_filename, 'rb') as wf:
        frames = wf.getnframes()
        buffer = wf.readframes(frames)
        data16 = np.frombuffer(buffer, dtype=np.int16)
    text = model.stt(data16)
    
    # Cleanup temporary files
    os.remove(temp_filename)
    os.remove(converted_filename)

    return jsonify({'transcription': text})

if __name__ == '__main__':
    app.run(debug=True, port=5000)