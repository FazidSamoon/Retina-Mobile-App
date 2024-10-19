// translations.js

const translations = {
  en: {
    title: "Diabetes Risk Prediction",
    questions: {
      ageGroup: "What is your age group?",
      gender: "What is your gender?",
      ethnicity: "Are you Aboriginal, Torres Strait Islander or Maori descent?",
      regionOfBirth: "Where were you born?",
      familyHistory: "Have either of your parents or siblings been diagnosed with diabetes?",
      highBloodGlucose: "Have you ever been found to have high blood glucose?",
      highBloodPressure: "Are you currently taking medication for high blood pressure?",
      dailyTobacco: "Do you currently smoke cigarettes or any other tobacco products daily?",
      healthyDiet: "How often do you eat vegetables or fruit?",
      physicalActivity: "Do you do at least 2.5 hours of physical activity per week?",
      waistMeasurement: "Your waist measurement:"
    },
    options: {
      ageGroup: ["Under 35 years", "35 – 44 years", "45 – 54 years", "55 – 64 years", "65 years or over"],
      gender: ["Female", "Male"],
      ethnicity: ["Yes", "No"],
      regionOfBirth: ["Australia", "Asia (including the Indian subcontinent)", "Middle East", "North Africa", "Other"],
      familyHistory: ["Yes", "No"],
      highBloodGlucose: ["Yes", "No"],
      highBloodPressure: ["Yes", "No"],
      dailyTobacco: ["Yes", "No"],
      healthyDiet: ["Every day", "Not every day"],
      physicalActivity: ["Yes", "No"],
      waistMeasurement: ["Less than 80 (Clothing size 10-12)", "Between 80 and 90 (Clothing size 14-16)", "More than 90 (Clothing size 18-24)"]
    },
    buttons: {
      calculateRisk: "Calculate Risk",
      language: "Language",
      close: "Close"
    },
    results: {
      riskScore: "Your Risk Score:",
      riskLevel: "Risk Level:",
      summary: "Summary:",
      highRiskMessage: "You have scored {score} points putting you at high risk of developing diabetes. See your doctor about having a fasting blood glucose test. Act now to prevent type 2 diabetes."
    }
  },
  si: {
    title: "දියබීටිස් අවදානම් පූර්වතාපනය",
    questions: {
      ageGroup: "ඔබේ වයස් කණ්ඩායම කුමක් ද?",
      gender: "ඔබේ ලිංගය කුමක් ද?",
      ethnicity: "ඔබ Aboriginal, Torres Strait Islander හෝ Maori මුල් පරම්පරාවට අදාලද?",
      regionOfBirth: "ඔබ කොතැන උපත ලැබුවේද?",
      familyHistory: "ඔබගේ දෙමව්පියන් හෝ සහෝදරයන් දියබීටිස් රෝගීන් ලෙස निदානය වී තිබේද?",
      highBloodGlucose: "ඔබට උසස් ලේ පීඩනයක් (ග්ලූකෝස්) සොයාගෙන තිබේද?",
      highBloodPressure: "ඔබට උසස් රුධිර පීඩනය සඳහා ඖෂධ භාවිතා කරයිද?",
      dailyTobacco: "ඔබ දෛනිකව සීගරට් හෝ වෙනත් ආගමන භාවිතා කරයිද?",
      healthyDiet: "ඔබට බොත්තම් හෝ පළතුරු කෑම කොපමණ වේ?",
      physicalActivity: "සතියකට අවම වශයෙන් පැය 2.5ක ශාරීරික කටයුතු කරයිද?",
      waistMeasurement: "ඔබගේ කකුල් විශාලත්වය:"
    },
    options: {
      ageGroup: ["35 අවුරුදුට අඩු", "35 – 44 අවුරුදු", "45 – 54 අවුරුදු", "55 – 64 අවුරුදු", "65 අවුරුද්දට හෝ ඉහළ"],
      gender: ["කාන්තාව", "පුරුෂයා"],
      ethnicity: ["ඔව්", "නැත"],
      regionOfBirth: ["ඕස්ට්‍රේලියාව", "ආසියාව (ඉන්දියානු උපතලයට ඇතුළත්)", "මැදපෙරදිග", "උතුරු අප්‍රිකාව", "වෙනත්"],
      familyHistory: ["ඔව්", "නැත"],
      highBloodGlucose: ["ඔව්", "නැත"],
      highBloodPressure: ["ඔව්", "නැත"],
      dailyTobacco: ["ඔව්", "නැත"],
      healthyDiet: ["සෑම දිනකම", "සෑම දිනකම නොවේ"],
      physicalActivity: ["ඔව්", "නැත"],
      waistMeasurement: ["80 ට අඩු (ඇඳුම් ප්‍රමාණය 10-12)", "80 සහ 90 අතර (ඇඳුම් ප්‍රමාණය 14-16)", "90 ට වැඩි (ඇඳුම් ප්‍රමාණය 18-24)"]
    },
    buttons: {
      calculateRisk: "අවදානම ගණනය කරන්න",
      language: "භාෂාව",
      close: "වසන්න"
    },
    results: {
      riskScore: "ඔබේ අවදානම් ලකුණ:",
      riskLevel: "අවදානම් මට්ටම:",
      summary: "සාරාංශය:",
      highRiskMessage: "ඔබ {score} ලකුණු ලබා ඇත, එමඟින් ඔබට දියබීටිස් රෝගයට ඉහළ අවදානමක් ඇත. උපවෙහෙස ලේ ග්ලූකෝස් පරීක්ෂණයක් සඳහා ඔබේ වෛද්‍යවරයාට බලන්න. වර්ග 2 දියබීටිස් වැළැක්වීමට දැන් ක්‍රියා කරන්න."
    }
  },
  ta: {
    title: "சர்க்கரை நோய் அபாயம் கணிப்பு",
    questions: {
      ageGroup: "உங்கள் வயது குழு எது?",
      gender: "உங்கள் பாலினம் என்ன?",
      ethnicity: "நீங்கள் Aboriginal, Torres Strait Islander அல்லது Maori தேசத்தைச் சேர்ந்தவரா?",
      regionOfBirth: "நீங்கள் எங்க에서 பிறந்தீர்கள்?",
      familyHistory: "உங்கள் பெற்றோர் அல்லது சகோதரர்கள் சர்க்கரை நோயால் நியமிக்கப்பட்டுள்ளார்களா?",
      highBloodGlucose: "உங்களுக்கு உயர் ரத்த சர்க்கரை (கிளுக்கோஸ்) கண்டறியப்பட்டதா?",
      highBloodPressure: "உங்களுக்கு உயர் இரத்த அழுத்தம் மருந்துகள் எடுக்கிறீர்களா?",
      dailyTobacco: "நீங்கள் தினமும் புகையிலை அல்லது பிற புகைபொருட்களை புகைக்கிறீர்களா?",
      healthyDiet: "நீங்கள் எவ்வளவு அடிக்கடி காய்கறிகள் அல்லது பழங்கள் சாப்பிடுகிறீர்கள்?",
      physicalActivity: "நீங்கள் வாரத்திற்கு குறைந்தது 2.5 மணி நேர உடற்பயிற்சி செய்கிறீர்களா?",
      waistMeasurement: "உங்கள் இடுப்பு அளவு:"
    },
    options: {
      ageGroup: ["35 வயதிற்கு குறைவானது", "35 – 44 வயது", "45 – 54 வயது", "55 – 64 வயது", "65 வயது அல்லது அதற்கு மேல்"],
      gender: ["பெண்", "ஆண்"],
      ethnicity: ["ஆம்", "இல்லை"],
      regionOfBirth: ["ஆஸ்திரேலியா", "ஏசியா (இந்த துணைக்கோடத்துடன்)", "மத்திய கிழக்கு", "வட ஆப்பிரிக்கா", "மற்றவை"],
      familyHistory: ["ஆம்", "இல்லை"],
      highBloodGlucose: ["ஆம்", "இல்லை"],
      highBloodPressure: ["ஆம்", "இல்லை"],
      dailyTobacco: ["ஆம்", "இல்லை"],
      healthyDiet: ["ஒவ்வொரு நாளும்", "ஒவ்வொரு நாளும் இல்லை"],
      physicalActivity: ["ஆம்", "இல்லை"],
      waistMeasurement: ["80 ஐ விட குறைவாக (உடைகள் அளவு 10-12)", "80 மற்றும் 90 இடையில் (உடைகள் அளவு 14-16)", "90 ஐ விட அதிகம் (உடைகள் அளவு 18-24)"]
    },
    buttons: {
      calculateRisk: "அபாயத்தை கணிக்கவும்",
      language: "மொழி",
      close: "மூடு"
    },
    results: {
      riskScore: "உங்கள் அபாய மதிப்பு:",
      riskLevel: "அபாய நிலை:",
      summary: "சுருக்கம்:",
      highRiskMessage: "நீங்கள் {score} மதிப்பெண் பெற்றுள்ளீர்கள், இதனால் நீங்கள் சர்க்கரை நோயின் அபாயத்தில் உள்ளீர்கள். ஒரு விரைவு ரத்த சர்க்கரை சோதனை செய்ய உங்கள் மருத்துவரை பாருங்கள். Type 2 சர்க்கரை நோயைத் தடுப்பதற்காக இப்போது செயல்படவும்."
    }
  }
};

export default translations;
