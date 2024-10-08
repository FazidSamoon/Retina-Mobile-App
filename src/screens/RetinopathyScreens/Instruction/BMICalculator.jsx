import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  Button, 
  TouchableOpacity, 
  Modal, 
  TouchableWithoutFeedback, 
  TextInput 
} from 'react-native';

// Translations for English, Sinhala, and Tamil
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

            {/* Input Fields */}
            <View style={styles.inputContainer}>
              <Text style={styles.questionText}>{translations[language].questions.height}</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="e.g., 170"
                value={height}
                onChangeText={setHeight}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.questionText}>{translations[language].questions.weight}</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="e.g., 65"
                value={weight}
                onChangeText={setWeight}
              />
            </View>

            {/* Display Error Message */}
            {error ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : null}

            {/* Calculate Button */}
            <View style={styles.buttonContainer}>
              <Button
                title={translations[language].buttons.calculateBMI}
                onPress={calculateBMI}
              />
            </View>

            {/* Display Results */}
            {bmi !== null && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultText}>{translations[language].results.bmiValue} {bmi}</Text>
                <Text style={styles.resultText}>{translations[language].results.bmiCategory} {category}</Text>
                <Text style={styles.summaryText}>
                  {translations[language].results.summary.replace('{category}', category)}
                </Text>
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
  inputContainer: {
    marginBottom: 15,
  },
  questionText: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
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
    fontWeight: 'bold',
  },
  summaryText: {
    fontSize: 16,
    marginTop: 10,
    color: '#333',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default BMICalculator;
