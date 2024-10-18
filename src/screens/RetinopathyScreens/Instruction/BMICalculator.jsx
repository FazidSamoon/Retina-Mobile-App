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
  TextInput,
} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons'; // Ensure @expo/vector-icons is installed

// Complete Translations for English, Sinhala, and Tamil
const translations = {
  en: {
    title: "BMI Calculator",
    questions: {
      height: "Enter your height (cm):",
      weight: "Enter your weight (kg):"
    },
    buttons: {
      calculateBMI: "Calculate BMI",
      language: "Language",
      close: "Close"
    },
    results: {
      bmiValue: "Your BMI:",
      bmiCategory: "BMI Category:",
      categories: {
        underweight: "Underweight",
        normal: "Normal weight",
        overweight: "Overweight",
        obese: "Obese"
      },
      summary: "Based on your BMI, you are classified as {category}."
    },
    errors: {
      invalidInput: "Please enter valid numbers for height and weight."
    }
  },
  si: {
    title: "BMI ගණකය",
    questions: {
      height: "ඔබගේ උස ඇතුලත් කරන්න (සෙ.මී):",
      weight: "ඔබගේ බර ඇතුලත් කරන්න (කි.ග්‍රා.):"
    },
    buttons: {
      calculateBMI: "BMI ගණනය කරන්න",
      language: "භාෂාව",
      close: "වසන්න"
    },
    results: {
      bmiValue: "ඔබගේ BMI:",
      bmiCategory: "BMI ප්‍රවර්ගය:",
      categories: {
        underweight: "අඩු බර",
        normal: "සාමාන්‍ය බර",
        overweight: "අධි බර",
        obese: "මෝට්ටු"
      },
      summary: "ඔබගේ BMI මත, ඔබ {category} ලෙස වර්ගීකරණය වී ඇත."
    },
    errors: {
      invalidInput: "උස සහ බර සඳහා වලංගු සංඛ්‍යා ඇතුලත් කරන්න."
    }
  },
  ta: {
    title: "BMI கணிப்பான்",
    questions: {
      height: "உங்கள் உயரம் உள்ளிடவும் (செமீ):",
      weight: "உங்கள் எடை உள்ளிடவும் (கி.கிரா.):"
    },
    buttons: {
      calculateBMI: "BMI கணக்கிடு",
      language: "மொழி",
      close: "மூடு"
    },
    results: {
      bmiValue: "உங்கள் BMI:",
      bmiCategory: "BMI வகை:",
      categories: {
        underweight: "குறைவான எடை",
        normal: "சாதாரண எடை",
        overweight: "அதிக எடை",
        obese: "அதிகப் பளு"
      },
      summary: "உங்கள் BMI அடிப்படையில், நீங்கள் {category} வகைப்படுத்தப்பட்டுள்ளீர்கள்."
    },
    errors: {
      invalidInput: "உயரம் மற்றும் எடைக்கு செல்லுபடியாகும் எண்களை உள்ளிடவும்."
    }
  }
};

const BMICalculator = () => {
  // Language state: 'en', 'si', 'ta'
  const [language, setLanguage] = useState('en');

  // State variables for inputs
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  // State variables for results
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');

  // State for error messages
  const [error, setError] = useState('');

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

  // Function to calculate BMI
  const calculateBMI = () => {
    // Reset previous results and errors
    setBmi(null);
    setCategory('');
    setError('');

    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);

    // Validate inputs
    if (isNaN(heightNum) || isNaN(weightNum) || heightNum <= 0 || weightNum <= 0) {
      setError(translations[language].errors.invalidInput);
      return;
    }

    // BMI formula: weight (kg) / (height (m))^2
    const heightInMeters = heightNum / 100;
    const bmiValue = weightNum / (heightInMeters * heightInMeters);
    const roundedBMI = bmiValue.toFixed(2);
    setBmi(roundedBMI);

    // Determine BMI category
    let bmiCategory = '';
    if (bmiValue < 18.5) {
      bmiCategory = translations[language].results.categories.underweight;
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      bmiCategory = translations[language].results.categories.normal;
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      bmiCategory = translations[language].results.categories.overweight;
    } else {
      bmiCategory = translations[language].results.categories.obese;
    }

    setCategory(bmiCategory);
  };

  // Function to render language switch buttons with styling
  const renderLanguageButtons = () => (
    <View style={styles.languageContainer}>
      <TouchableOpacity 
        style={[
          styles.langButton, 
          language === 'en' && styles.selectedLangButton
        ]} 
        onPress={() => setLanguage('en')}
        activeOpacity={0.7}
        accessibilityLabel="Select English Language"
      >
        <Text style={[
          styles.langButtonText, 
          language === 'en' && styles.selectedLangButtonText
        ]}>English</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[
          styles.langButton, 
          language === 'si' && styles.selectedLangButton
        ]} 
        onPress={() => setLanguage('si')}
        activeOpacity={0.7}
        accessibilityLabel="Select Sinhala Language"
      >
        <Text style={[
          styles.langButtonText, 
          language === 'si' && styles.selectedLangButtonText
        ]}>සිංහල</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[
          styles.langButton, 
          language === 'ta' && styles.selectedLangButton
        ]} 
        onPress={() => setLanguage('ta')}
        activeOpacity={0.7}
        accessibilityLabel="Select Tamil Language"
      >
        <Text style={[
          styles.langButtonText, 
          language === 'ta' && styles.selectedLangButtonText
        ]}>தமிழ்</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Info Icon Centered on Home Screen */}
      <View style={styles.infoIconContainer}>
        <TouchableOpacity onPress={() => setModalVisible(true)} activeOpacity={0.7} accessibilityLabel="Open BMI Calculator Information">
        <FontAwesome name="calculator" size={18} color="#D3D3D3" />
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
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton} accessibilityLabel="Close Modal">
                <Ionicons name="close-circle" size={28} color="#FF5252" />
              </TouchableOpacity>
            </View>

            {/* Language Switch Buttons */}
            {renderLanguageButtons()}

            {/* Input Fields with Icons */}
            <View style={styles.inputContainer}>
              <View style={styles.questionContainer}>
                <Ionicons name="body-outline" size={24} color="#007BFF" style={styles.questionIcon} />
                <Text style={styles.questionText}>{translations[language].questions.height}</Text>
              </View>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="e.g., 170"
                value={height}
                onChangeText={setHeight}
                accessibilityLabel="Enter your height in centimeters"
              />
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.questionContainer}>
                <Ionicons name="nutrition-outline" size={24} color="#007BFF" style={styles.questionIcon} />
                <Text style={styles.questionText}>{translations[language].questions.weight}</Text>
              </View>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="e.g., 65"
                value={weight}
                onChangeText={setWeight}
                accessibilityLabel="Enter your weight in kilograms"
              />
            </View>

            {/* Display Error Message */}
            {error ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : null}

            {/* Calculate Button */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.calculateButton} 
                onPress={calculateBMI} 
                activeOpacity={0.7}
                accessibilityLabel="Calculate BMI"
              >
                <Ionicons name="calculator-outline" size={24} color="#FFFFFF" style={styles.calculateIcon} />
                <Text style={styles.calculateButtonText}>
                  {translations[language].buttons.calculateBMI}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Display Results */}
            {bmi !== null && (
              <View style={styles.resultContainer}>
                <View style={styles.resultHeader}>
                  <Ionicons name="stats-chart-outline" size={24} color="#007BFF" />
                  <Text style={styles.resultHeaderText}>{translations[language].results.bmiValue} {bmi}</Text>
                </View>
                <View style={styles.resultHeader}>
                  <Ionicons name="warning-outline" size={24} color="#FFC107" />
                  <Text style={styles.resultHeaderText}>{translations[language].results.bmiCategory} 
                    {" "}
                    <Text style={[
                      styles.bmiCategoryText, 
                      category === translations[language].results.categories.underweight && styles.underweight,
                      category === translations[language].results.categories.normal && styles.normal,
                      category === translations[language].results.categories.overweight && styles.overweight,
                      category === translations[language].results.categories.obese && styles.obese,
                    ]}>
                      {category}
                    </Text>
                  </Text>
                </View>
                <View style={styles.summaryContainer}>
                  <Ionicons name="document-text-outline" size={24} color="#4CAF50" />
                  <Text style={styles.summaryText}>
                    {translations[language].results.summary.replace('{category}', category)}
                  </Text>
                </View>
              </View>
            )}
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
  inputContainer: {
    marginBottom: 15,
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
  input: {
    borderWidth: 1,
    borderColor: '#999999',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#F9F9F9',
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
  bmiCategoryText: {
    fontWeight: '700',
  },
  underweight: {
    color: '#FFC107', // Amber
  },
  normal: {
    color: '#28A745', // Green
  },
  overweight: {
    color: '#FF9800', // Orange
  },
  obese: {
    color: '#DC3545', // Red
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
  errorText: {
    color: '#DC3545',
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default BMICalculator;
