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
} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { translations } from './translations'; // Adjust the path as necessary

const SkinThicknessComponent = () => {
  const [language, setLanguage] = useState('en');
  const [modalVisible, setModalVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: modalVisible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [modalVisible]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)} activeOpacity={0.7}>
        <FontAwesome name="question-circle" size={18} color="#D3D3D3" />
      </TouchableOpacity>

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
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{translations[language].skinThickness.title}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                <Ionicons name="close-circle" size={28} color="#FF5252" />
              </TouchableOpacity>
            </View>

            <View style={styles.languageContainer}>
              {/* Language Buttons */}
            </View>

            <View style={styles.infoContainer}>
              <Ionicons name="body-outline" size={50} color="#8A2BE2" style={styles.infoIcon} />
              <Text style={styles.infoText}>{translations[language].skinThickness.info}</Text>
            </View>
          </ScrollView>
        </Animated.View>
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
    top: '10%',
    left: '5%',
    right: '5%',
    bottom: '10%',
    backgroundColor: '#ffffff',
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
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333333',
    flex: 1,
    textAlign: 'center',
  },
  closeButton: {
    marginLeft: 10,
  },
  languageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 25,
  },
  langButton: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginHorizontal: 5,
    minWidth: 80,
    alignItems: 'center',
  },
  selectedLangButton: {
    backgroundColor: '#4CAF50',
  },
  langButtonText: {
    color: '#333333',
    fontWeight: '600',
    fontSize: 13,
  },
  selectedLangButtonText: {
    color: '#ffffff',
  },
  infoContainer: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  infoIcon: {
    marginBottom: 15,
  },
  infoText: {
    fontSize: 16,
    lineHeight: 22,
    color: '#555555',
    textAlign: 'justify',
  },
});

export default SkinThicknessComponent;
