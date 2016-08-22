module.exports = {
  msFormatToDB: msFormatToDB,
  msFormatFromDB: msFormatFromDB,
  bvFormatToDB: bvFormatToDB,
  bvFormatFromDB: bvFormatFromDB,
  watsonFormatToDB: watsonFormatToDB,
  watsonFormatFromDB: watsonFormatFromDB
};

const msScores = ['anger','contempt','disgust','fear','happiness','neutral','sadness','surprise'];
function msFormatToDB(data) {
  return msScores.map(emotion => data[0].scores[emotion].toPrecision(3));
}

function msFormatFromDB(data) {
  let obj = {scores: {}};
  msScores.forEach((emotion, index) => {obj.scores[emotion] = data[index];});
  return obj;
}

function bvFormatToDB(data) {
  let analysisSummary = JSON.stringify(data.result.analysisSummary.AnalysisResult);
  let mood = JSON.stringify(data.result.analysisSegments.map(segment => segment.analysis.Mood));
  return [analysisSummary, mood];
}

function bvFormatFromDB(data) {
  let response = {
    result: {
      analysisSegments: JSON.parse(data.bv_mood).map(mood => {return {
        analysis: {
          Mood: mood
        }
      };
      }),
      analysisSummary: {
        AnalysisResult: JSON.parse(data.bv_summary)
      }
    }
  };
  return response;
}

const emotion = ['Anger', 'Disgust', 'Fear', 'Joy', 'Sadness'];
const language = ['Analytical', 'Confident', 'Tentative'];
const social = ['Openness', 'Conscientiousness', 'Extraversion', 'Agreeableness', 'Emotional Range'];
const categories = {Emotion: {data: emotion, key: 'wn_emotion'}, Language: {data: language, key: 'wn_language'}, Social: {data: social, key:'wn_social'}};

function watsonFormatToDB(data, transcription) {
  let emotion = data.document_tone.tone_categories[0].tones.map(item => item.score);
  let language = data.document_tone.tone_categories[1].tones.map(item => item.score);
  let social = data.document_tone.tone_categories[2].tones.map(item => item.score);
  return [emotion, language, social, transcription];
}

function watsonFormatFromDB(data) {
  const toneCategories = Object.keys(categories).map(category => {
    return {
      tones: categories[category].data.map((tone, i) => {
        return {
          score: JSON.parse(data[categories[category].key])[i],
          tone_id: tone.toLowerCase(),
          tone_name: tone
        };
      }),
      category_id: category.toLowerCase() + '_tone',
      category_name: category + ' Tone'
    };
  });

  let result = {
    document_tone: {
      tone_categories: toneCategories
    }
  };
  return result;
}
