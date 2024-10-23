import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  Modal, 
  TouchableWithoutFeedback,
  Animated,
  SafeAreaView,
} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons'; // Ensure @expo/vector-icons is installed

// Complete Translations for English, Sinhala, and Tamil
const translations = {
  en: {
    title: "Diabetes Pedigree Analysis",
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
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // To store the risk score and summary
  const [riskScore, setRiskScore] = useState(null);
  const [summary, setSummary] = useState(null);

  // Modal visibility state
  const [modalVisible, setModalVisible] = useState(false);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Handle modal animations
  useEffect(() => {
    if (modalVisible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [modalVisible]);



  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setDropdownVisible(false);
  };

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
    if (score >= 20) riskLevel = "Very High";
    else if (score >= 16) riskLevel = "High";
    else if (score >= 12) riskLevel = "Moderate";
    else riskLevel = "Low";

    // Create summary
    const summaryText = `
${translations[language].results.riskScore} ${score}
${translations[language].results.riskLevel} ${riskLevel}
${translations[language].results.summary}
${score >= 12 ? translations[language].results.highRiskMessage.replace('{score}', score) : ''}
    `;

    setSummary(summaryText.trim());
  };

  // Function to render dropdown options with icons
  const renderDropdown = (labelKey, optionsKey, setValue, currentValue, iconName) => (
    <View style={styles.dropdownContainer}>
      <View style={styles.questionContainer}>
        <Ionicons name={iconName} size={24} color="#007BFF" style={styles.questionIcon} />
        <Text style={styles.questionText}>{translations[language].questions[labelKey]}</Text>
      </View>
      <View style={styles.optionsWrapper}>
        {translations[language].options[optionsKey].map(option => (
          <TouchableOpacity
            key={option}
            style={[
              styles.option,
              currentValue === option && styles.selectedOption
            ]}
            onPress={() => setValue(option)}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.optionText,
              currentValue === option && styles.selectedOptionText
            ]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
  
      {/* Info Icon Centered on Home Screen */}
      <View style={styles.infoIconContainer}>
        <TouchableOpacity onPress={() => setModalVisible(true)} activeOpacity={0.7}>
        <FontAwesome name="question-circle" size={18} color="#5bc3fc" />
     
         
        </TouchableOpacity>
      </View>

      {/* Modal containing all content */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="none"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <Animated.View style={[styles.modalContent, { opacity: fadeAnim }]}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {/* Modal Header with Title and Close Icon */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{translations[language].title}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                <Ionicons name="close-circle" size={35} color="#c4c4c4" />
              </TouchableOpacity>
            </View>

            {/* Form Fields with Icons */}
            {renderDropdown('ageGroup', 'ageGroup', setAgeGroup, ageGroup, 'person-outline')}
            {renderDropdown('gender', 'gender', setGender, gender, 'male-female-outline')}
            {renderDropdown('ethnicity', 'ethnicity', setEthnicity, ethnicity, 'people-outline')}
            {renderDropdown('regionOfBirth', 'regionOfBirth', setRegionOfBirth, regionOfBirth, 'earth-outline')}
            {renderDropdown('familyHistory', 'familyHistory', setFamilyHistory, familyHistory, 'family-outline')}
            {renderDropdown('highBloodGlucose', 'highBloodGlucose', setHighBloodGlucose, highBloodGlucose, 'water-outline')}
            {renderDropdown('highBloodPressure', 'highBloodPressure', setHighBloodPressure, highBloodPressure, 'heart-outline')}
            {renderDropdown('dailyTobacco', 'dailyTobacco', setDailyTobacco, dailyTobacco, 'smoke-outline')}
            {renderDropdown('healthyDiet', 'healthyDiet', setHealthyDiet, healthyDiet, 'leaf-outline')}
            {renderDropdown('physicalActivity', 'physicalActivity', setPhysicalActivity, physicalActivity, 'fitness-outline')}
            {renderDropdown('waistMeasurement', 'waistMeasurement', setWaistMeasurement, waistMeasurement, 'ribbon-outline')}

            {/* Calculate Button */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.calculateButton} onPress={calculateRisk} activeOpacity={0.7}>
                <Ionicons name="calculator-outline" size={24} color="#FFFFFF" style={styles.calculateIcon} />
                <Text style={styles.calculateButtonText}>
                  {translations[language].buttons.calculateRisk}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Display Results */}
            {riskScore !== null && (
              <View style={styles.resultContainer}>
                <View style={styles.resultHeader}>
                  <Ionicons name="stats-chart-outline" size={24} color="#007BFF" />
                  <Text style={styles.resultHeaderText}>{translations[language].results.riskScore} {riskScore}</Text>
                </View>
                <View style={styles.resultHeader}>
                  <Ionicons name="warning-outline" size={24} color="#FFC107" />
                  <Text style={styles.resultHeaderText}>{translations[language].results.riskLevel} 
                    {" "}
                    <Text style={[
                      styles.riskLevelText, 
                      riskScore >= 20 ? styles.veryHigh :
                      riskScore >= 16 ? styles.high :
                      riskScore >= 12 ? styles.moderate :
                      styles.low
                    ]}>
                      {riskScore >= 20 ? "Very High" :
                       riskScore >= 16 ? "High" :
                       riskScore >= 12 ? "Moderate" :
                       "Low"}
                    </Text>
                  </Text>
                </View>
                {summary && (
                  <View style={styles.summaryContainer}>
                    <Ionicons name="document-text-outline" size={24} color="#4CAF50" />
                    <Text style={styles.summaryText}>{summary}</Text>
                  </View>
                )}
              </View>
            )}




<View style={styles.iconContainer}>
            <TouchableOpacity
              onPress={() => setDropdownVisible(!dropdownVisible)}
              activeOpacity={0.7}
            >
              <Ionicons name="language" size={26} color="#676767" />
            </TouchableOpacity>

            {dropdownVisible && (
              <View style={styles.dropdown}>
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleLanguageChange("en")}
                >
                  <Text style={styles.dropdownItemText}>EN</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleLanguageChange("si")}
                >
                  <Text style={styles.dropdownItemText}>සිං</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleLanguageChange("ta")}
                >
                  <Text style={styles.dropdownItemText}>தமிழ்</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          </ScrollView>
        </Animated.View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',


  },
  infoIcon: {
    fontSize: 12,
    color: '#007BFF',
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
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333333',
    flex: 1,
    textAlign: 'center',
    marginRight: 10,
  },
  closeButton: {
    marginLeft: 10,
  },
  languageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  langButton: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    marginHorizontal: 5,
    minWidth: 90,
    alignItems: 'center',
    flexDirection: 'row',
  },
  selectedLangButton: {
    backgroundColor: '#4CAF50',
  },
  langButtonText: {
    color: '#333333',
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 5,
  },
  selectedLangButtonText: {
    color: '#FFFFFF',
  },
  dropdownContainer: {
    marginBottom: 20,
  },
  questionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  questionIcon: {
    marginRight: 10,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555555',
    flex: 1,
    flexWrap: 'wrap',
  },
  optionsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  option: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginVertical: 5,
    width: '48%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selectedOption: {
    backgroundColor: '#007BFF',
  },
  optionText: {
    color: '#333333',
    textAlign: 'center',
    fontWeight: '500',
  },
  selectedOptionText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  buttonContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  calculateButton: {
    flexDirection: 'row',
    backgroundColor: '#28A745',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 30,
    alignItems: 'center',
  },
  calculateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 10,
  },
  calculateIcon: {
    marginRight: 5,
  },
  resultContainer: {
    marginTop: 25,
    padding: 20,
    backgroundColor: '#F8F9FA',
    borderRadius: 15,
    elevation: 2,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  resultHeaderText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333333',
    marginLeft: 10,
  },
  riskLevelText: {
    fontWeight: '700',
  },
  veryHigh: {
    color: '#DC3545',
  },
  high: {
    color: '#FFC107',
  },
  moderate: {
    color: '#17A2B8',
  },
  low: {
    color: '#28A745',
  },
  summaryContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 15,
  },
  summaryText: {
    fontSize: 16,
    color: '#555555',
    flex: 1,
    textAlign: 'justify',
    marginLeft: 10,
  },
  iconContainer: {
    position: "absolute",
    bottom: 0,
    right: 5,
    zIndex: 10,
  },
  dropdown: {
    position: "absolute",
    top: -80,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    elevation: 5,
    width: 60,
  },
  dropdownItem: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    alignItems: "center",
  },
  dropdownItemText: {
    fontSize: 14,
    color: "#333",
  },
});

export default DiabetesRiskPrediction; 
