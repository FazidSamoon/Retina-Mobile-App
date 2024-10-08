import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  Button, 
  TouchableOpacity, 
  Modal, 
  TouchableWithoutFeedback 
} from 'react-native';

// Translations for English, Sinhala, and Tamil
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
      familyHistory: "ඔබගේ දෙමව්පියන් හෝ සහෝදරයන් දියබීටිස් රෝගීන් ලෙස निदान වී තිබේද?",
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
      calculateRisk: "அபாயத்தை கணக்கிடு",
      language: "மொழி",
      close: "மூடு"
    },
    results: {
      riskScore: "உங்கள் அபாய மதிப்பு:",
      riskLevel: "அபாய நிலை:",
      summary: "சுருக்கம்:",
      highRiskMessage: "நீங்கள் {score} மதிப்பெண்கள் பெற்றுள்ளீர்கள், இது உங்களை சர்க்கரை நோயை அடைய உயர்ந்த அபாயத்தில் வைக்கிறது. உபவெஹிச் பிளூக்கோஸ் பரிசோதனை செய்ய உங்கள் மருத்துவரை அணுகுங்கள். வகை 2 சர்க்கரை நோயைத் தடுப்பதற்கு இப்போது செயல்படுங்கள்."
    }
  }
};

const DiabetesRiskPrediction = () => {
  // Language state: 'en', 'si', 'ta'
  const [language, setLanguage] = useState('en');

  // State variables to hold user input
  const [ageGroup, setAgeGroup] = useState('');
  const [gender, setGender] = useState('');
  const [ethnicity, setEthnicity] = useState('');
  const [regionOfBirth, setRegionOfBirth] = useState('');
  const [familyHistory, setFamilyHistory] = useState('');
  const [highBloodGlucose, setHighBloodGlucose] = useState('');
  const [highBloodPressure, setHighBloodPressure] = useState('');
  const [dailyTobacco, setDailyTobacco] = useState('');
  const [healthyDiet, setHealthyDiet] = useState('');
  const [physicalActivity, setPhysicalActivity] = useState('');
  const [waistMeasurement, setWaistMeasurement] = useState('');

  // To store the risk score and summary
  const [riskScore, setRiskScore] = useState(null);
  const [summary, setSummary] = useState(null);

  // Modal visibility state
  const [modalVisible, setModalVisible] = useState(false);

  // Function to calculate risk score based on inputs
  const calculateRisk = () => {
    let score = 0;

    // Add points based on user inputs
    if (ageGroup === translations[language].options.ageGroup[1]) score += 2; // "35 – 44 years"
    if (gender === translations[language].options.gender[0]) score += 0; // "Female"
    if (ethnicity === translations[language].options.ethnicity[0]) score += 2; // "Yes"
    if (regionOfBirth === translations[language].options.regionOfBirth[1]) score += 2; // "Asia"
    if (familyHistory === translations[language].options.familyHistory[0]) score += 3; // "Yes"
    if (highBloodGlucose === translations[language].options.highBloodGlucose[0]) score += 6; // "Yes"
    if (highBloodPressure === translations[language].options.highBloodPressure[0]) score += 2; // "Yes"
    if (dailyTobacco === translations[language].options.dailyTobacco[0]) score += 2; // "Yes"
    if (healthyDiet === translations[language].options.healthyDiet[0]) score += 0; // "Every day"
    if (physicalActivity === translations[language].options.physicalActivity[0]) score += 0; // "Yes"
    if (waistMeasurement === translations[language].options.waistMeasurement[0]) score += 0; // "Less than 80"

    setRiskScore(score);

    // Determine risk level
    let riskLevel;
    if (score >= 20) riskLevel = translations[language].results.riskLevel + " " + "Very High";
    else if (score >= 16) riskLevel = translations[language].results.riskLevel + " " + "High";
    else if (score >= 12) riskLevel = translations[language].results.riskLevel + " " + "Moderate";
    else riskLevel = translations[language].results.riskLevel + " " + "Low";

    // Create summary
    const summaryText = `
${translations[language].results.riskScore} ${score}
${translations[language].results.riskLevel} ${riskLevel}
${translations[language].results.summary}
${translations[language].results.highRiskMessage.replace('{score}', score)}
    `;

    setSummary(summaryText.trim());
  };

  // Function to render dropdown options
  const renderDropdown = (labelKey, optionsKey, setValue, currentValue) => (
    <View style={styles.dropdownContainer}>
      <Text style={styles.questionText}>{translations[language].questions[labelKey]}</Text>
      {translations[language].options[optionsKey].map(option => (
        <TouchableOpacity
          key={option}
          style={[
            styles.option,
            currentValue === option && styles.selectedOption
          ]}
          onPress={() => setValue(option)}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
      {currentValue ? (
        <Text style={styles.selectedText}>
          {translations[language].results.summary} {currentValue}
        </Text>
      ) : null}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Info Icon Centered on Home Screen */}
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.infoIcon}>ℹ️</Text>
      </TouchableOpacity>

      {/* Modal containing all content */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContent}>
          <ScrollView>
            {/* Modal Header with Title and Close Icon */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{translations[language].title}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButton}>✖️</Text>
              </TouchableOpacity>
            </View>

            {/* Language Switch Buttons */}
            <View style={styles.languageContainer}>
              <TouchableOpacity style={styles.langButton} onPress={() => setLanguage('en')}>
                <Text style={styles.langButtonText}>English</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.langButton} onPress={() => setLanguage('si')}>
                <Text style={styles.langButtonText}>සිංහල</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.langButton} onPress={() => setLanguage('ta')}>
                <Text style={styles.langButtonText}>தமிழ்</Text>
              </TouchableOpacity>
            </View>

            {/* Form Fields */}
            {/* Age Group */}
            {renderDropdown('ageGroup', 'ageGroup', setAgeGroup, ageGroup)}

            {/* Gender */}
            {renderDropdown('gender', 'gender', setGender, gender)}

            {/* Ethnicity */}
            {renderDropdown('ethnicity', 'ethnicity', setEthnicity, ethnicity)}

            {/* Region of Birth */}
            {renderDropdown('regionOfBirth', 'regionOfBirth', setRegionOfBirth, regionOfBirth)}

            {/* Family History */}
            {renderDropdown('familyHistory', 'familyHistory', setFamilyHistory, familyHistory)}

            {/* High Blood Glucose */}
            {renderDropdown('highBloodGlucose', 'highBloodGlucose', setHighBloodGlucose, highBloodGlucose)}

            {/* High Blood Pressure */}
            {renderDropdown('highBloodPressure', 'highBloodPressure', setHighBloodPressure, highBloodPressure)}

            {/* Daily Tobacco Use */}
            {renderDropdown('dailyTobacco', 'dailyTobacco', setDailyTobacco, dailyTobacco)}

            {/* Healthy Diet */}
            {renderDropdown('healthyDiet', 'healthyDiet', setHealthyDiet, healthyDiet)}

            {/* Physical Activity */}
            {renderDropdown('physicalActivity', 'physicalActivity', setPhysicalActivity, physicalActivity)}

            {/* Waist Measurement */}
            {renderDropdown('waistMeasurement', 'waistMeasurement', setWaistMeasurement, waistMeasurement)}

            {/* Calculate Button */}
            <View style={styles.buttonContainer}>
              <Button
                title={translations[language].buttons.calculateRisk}
                onPress={calculateRisk}
              />
            </View>

            {/* Display Results */}
            {riskScore !== null && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultText}>{translations[language].results.riskScore} {riskScore}</Text>
                <Text style={styles.resultText}>{summary}</Text>
              </View>
            )}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
 
    backgroundColor: '#fff',
  },
  infoIcon: {
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#000000AA',
  },
  modalContent: {
    position: 'absolute',
    top: '5%',
    left: '5%',
    right: '5%',
    bottom: '5%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  closeButton: {
    fontSize: 24,
    color: '#007BFF',
    marginLeft: 10,
  },
  languageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  langButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  langButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  dropdownContainer: {
    marginBottom: 15,
  },
  questionText: {
    fontSize: 16,
    marginBottom: 5,
  },
  option: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginVertical: 5,
  },
  selectedOption: {
    backgroundColor: '#007BFF',
  },
  optionText: {
    color: '#000',
  },
  selectedText: {
    marginTop: 5,
    fontStyle: 'italic',
    color: '#555',
  },
  buttonContainer: {
    marginVertical: 20,
  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  resultText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default DiabetesRiskPrediction;
