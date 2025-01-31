import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Share } from 'react-native';


export default function App() {
  const [selectedPeriod, setSelectedPeriod] = useState<'Day' | 'Week' | 'Month'>('Day');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalVisible, setIsModalVisible] = useState(false);


const handleShare = async () => {
  const message = 'Join me on StepsApp! Track your steps and compete with friends. Download the app and tap the link to add me: https://invite.steps.app/QXx4gyk64fwjPFRI';

  try {
    const result = await Share.share({
      message: message,
      title: 'Join me on StepsApp!',
    });

    if (result.action === Share.sharedAction) {
      console.log('Shared successfully');
    } else if (result.action === Share.dismissedAction) {
      console.log('Sharing dismissed');
    }
  } catch (error) {
    console.log('Sharing failed', error);
  }
};

  const formatDate = (date: Date, period: 'Day' | 'Week' | 'Month') => {
    switch (period) {
      case 'Day':
        return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
      case 'Week':
        const startOfWeek = new Date(date);
        startOfWeek.setDate(date.getDate() - date.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        return `${startOfWeek.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`;
      case 'Month':
        return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }
  };

  const handlePrevious = () => {
    const newDate = new Date(currentDate);
    if (selectedPeriod === 'Day') {
      newDate.setDate(currentDate.getDate() - 1);
    } else if (selectedPeriod === 'Week') {
      newDate.setDate(currentDate.getDate() - 7);
    } else if (selectedPeriod === 'Month') {
      newDate.setMonth(currentDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (selectedPeriod === 'Day') {
      newDate.setDate(currentDate.getDate() + 1);
    } else if (selectedPeriod === 'Week') {
      newDate.setDate(currentDate.getDate() + 7);
    } else if (selectedPeriod === 'Month') {
      newDate.setMonth(currentDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const stepsData = {
    Day: { steps: '2,420', chart: require('./assets/steps.png') },
    Week: { steps: '15,000', chart: 'Week Chart' },
    Month: { steps: '60,000', chart: 'Month Chart' },
  };

  const statsData = {
    Day: { totalSteps: '3,200', dailyGoal: '5,800', averageSteps: '5,950' },
    Week: { totalSteps: '15,000', dailyGoal: '40,600', averageSteps: '12,000' },
    Month: { totalSteps: '60,000', dailyGoal: '180,000', averageSteps: '50,000' },
  };

  return (
    <ScrollView style={styles.container}>
      {/* Section 1: Steps Details */}
      <View style={styles.section}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => console.log('Go back')}>
            <Ionicons name="arrow-back" size={24} color="#007bff" />
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>Steps details</Text>
          <View style={{ width: 24 }} /> {/* Spacer to balance the header */}
        </View>

        {/* Segmented Control */}
        <View style={styles.segmentedControl}>
          <TouchableOpacity
            style={[
              styles.segment,
              selectedPeriod === 'Day' && styles.selectedSegment,
            ]}
            onPress={() => setSelectedPeriod('Day')}
          >
            <Text
              style={[
                styles.segmentText,
                selectedPeriod === 'Day' && styles.selectedSegmentText,
              ]}
            >
              Day
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.segment,
              selectedPeriod === 'Week' && styles.selectedSegment,
            ]}
            onPress={() => setSelectedPeriod('Week')}
          >
            <Text
              style={[
                styles.segmentText,
                selectedPeriod === 'Week' && styles.selectedSegmentText,
              ]}
            >
              Week
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.segment,
              selectedPeriod === 'Month' && styles.selectedSegment,
            ]}
            onPress={() => setSelectedPeriod('Month')}
          >
            <Text
              style={[
                styles.segmentText,
                selectedPeriod === 'Month' && styles.selectedSegmentText,
              ]}
            >
              Month
            </Text>
          </TouchableOpacity>
        </View>

        {/* Steps Count and Date with Navigation Arrows */}
        <View style={styles.dateNavigationContainer}>
          <TouchableOpacity onPress={handlePrevious}>
            <Ionicons name="arrow-back" size={24} color="#007bff" />
          </TouchableOpacity>
          <View style={styles.stepsContainer}>
            <Text style={styles.stepsCount}>{stepsData[selectedPeriod].steps}</Text>
            <Text style={styles.stepsLabel}>{formatDate(currentDate, selectedPeriod)}</Text>
          </View>
          <TouchableOpacity onPress={handleNext}>
            <Ionicons name="arrow-forward" size={24} color="#007bff" />
          </TouchableOpacity>
        </View>

        {/* Chart Placeholder */}
        {selectedPeriod === 'Day' && (
          <Image
            source={stepsData.Day.chart}
            style={styles.chartImage}
            resizeMode="contain"
          />
        )}
        {selectedPeriod !== 'Day' && (
          <View style={styles.chartPlaceholder}>
            <Text style={styles.chartText}>{stepsData[selectedPeriod].chart}</Text>
          </View>
        )}

        {/* Encouragement Message */}
        <Text style={styles.encouragement}>Keep it up! Your steps score is above average.</Text>

        {/* Stats Container */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{statsData[selectedPeriod].totalSteps}</Text>
            <Text style={styles.statLabel}>Total Steps</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{statsData[selectedPeriod].dailyGoal}</Text>
            <Text style={styles.statLabel}>Daily Goal</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{statsData[selectedPeriod].averageSteps}</Text>
            <Text style={styles.statLabel}>Average Steps</Text>
          </View>
        </View>

        {/* Additional Stats */}
        <View style={styles.additionalStats}>
          <Text style={styles.additionalStat}>Distance: 3.07 km</Text>
          <Text style={styles.additionalStat}>Calories: 170 kcal</Text>
        </View>
      </View>

      {/* Section 2: Cadence Steps/Min */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cadence <Text style={styles.subtitle}>steps/min</Text></Text>
        <Image
          source={require('./assets/cadence.png')}
          style={styles.chartImage}
          resizeMode="contain"
        />
      </View>

      {/* Section 3: Step Time Seconds */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Step Time <Text style={styles.subtitle}>Seconds</Text></Text>
        <Image
          source={require('./assets/cadence.png')}
          style={styles.chartImage}
          resizeMode="contain"
        />
      </View>

      {/* Section 4: Swing */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Swing <Text style={styles.subtitle}>Seconds</Text></Text>
        <Image
          source={require('./assets/swing.png')}
          style={styles.chartImage}
          resizeMode="contain"
        />
        <View style={styles.chartLabelContainer}>
          <View style={styles.colorLabelContainer}>
            <View style={[styles.colorLine, { backgroundColor: '#4CAF50' }]} /> {/* Light Green */}
            <Text style={styles.colorLabel}>Left Foot</Text>
          </View>
          <View style={styles.colorLabelContainer}>
            <View style={[styles.colorLine, { backgroundColor: '#388E3C' }]} /> {/* Dark Green */}
            <Text style={styles.colorLabel}>Right Foot</Text>
          </View>
        </View>
      </View>

      {/* Section 5: Stance */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Stance<Text style={styles.subtitle}> Seconds</Text></Text>
        <Image
          source={require('./assets/swing.png')}
          style={styles.chartImage}
          resizeMode="contain"
        />
        <View style={styles.chartLabelContainer}>
          <View style={styles.colorLabelContainer}>
            <View style={[styles.colorLine, { backgroundColor: '#4CAF50' }]} /> {/* Light Green */}
            <Text style={styles.colorLabel}>Left Foot</Text>
          </View>
          <View style={styles.colorLabelContainer}>
            <View style={[styles.colorLine, { backgroundColor: '#388E3C' }]} /> {/* Dark Green */}
            <Text style={styles.colorLabel}>Right Foot</Text>
          </View>
        </View>
      </View>

      {/* Section 6: Toe Off Angle */}
      <View style={styles.section}>
        <Image
          source={require('./assets/toe.png')}
          style={styles.chartImage}
          resizeMode="contain"
        />
        <View style={styles.angleContainer}>
          {/* Left Foot */}
          <View style={styles.angleItem}>
            <Text style={styles.angleLabel}>Left Foot</Text>
            <View style={styles.angleDetail}>
              <Text style={styles.angleText}>Average</Text>
              <Text style={styles.angleValue}>39.86°</Text>
            </View>
            <View style={styles.angleDetail}>
              <Text style={styles.angleText}>Maximum</Text>
              <Text style={styles.angleValue}>48.15° (+ 3.66°)</Text>
            </View>
            <View style={styles.angleDetail}>
              <Text style={styles.angleText}>Minimum</Text>
              <Text style={styles.angleValue}>48.15° (- 8.69°)</Text>
            </View>
          </View>
          {/* Right Foot */}
          <View style={styles.angleItem}>
            <Text style={styles.angleLabel}>Right Foot</Text>
            <View style={styles.angleDetail}>
              <Text style={styles.angleText}>Average</Text>
              <Text style={styles.angleValue}>39.86°</Text>
            </View>
            <View style={styles.angleDetail}>
              <Text style={styles.angleText}>Maximum</Text>
              <Text style={styles.angleValue}>48.15° (+ 3.66°)</Text>
            </View>
            <View style={styles.angleDetail}>
              <Text style={styles.angleText}>Minimum</Text>
              <Text style={styles.angleValue}>48.15° (- 8.69°)</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Section 7: Physical & Mental Stress */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Physical & Mental Stress</Text>
        <Image
          source={require('./assets/physical.png')}
          style={styles.chartImage}
          resizeMode="contain"
        />
        <Image
          source={require('./assets/legend.png')}
          style={styles.legendImage}
          resizeMode="contain"
        />
      </View>

   {/* Section 8: EDSS Level & Share Report */}
<View style={styles.section}>
  <View style={styles.edssHeader}>
    {/* Left Icon and Title */}
    <View style={styles.edssTitleContainer}>
      <Image
        source={require('./assets/iconedss.png')}
        style={styles.edssIcon}
        resizeMode="contain"
      />
      <Text style={styles.edssLevel}>Your EDSS level is 4.0</Text>
    </View>
    {/* Right Icon */}
    <TouchableOpacity onPress={() => setIsModalVisible(true)}>
      <Image
        source={require('./assets/image.png')}
        style={styles.smallIcon}
        resizeMode="contain"
      />
    </TouchableOpacity>
  </View>
  <Text style={styles.edssDescription}>
    Significant disability but you can walk without an aid for 500 metres.
  </Text>
  <Image
    source={require('./assets/edss.png')}
    style={styles.chartImage}
    resizeMode="contain"
  />
  <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
    <Ionicons name="share-social" size={24} color="white" />
    <Text style={styles.buttonText}>Share Report</Text>
  </TouchableOpacity>
</View>
      {/* Modal for Learn More */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>About EDSS</Text>
            <Text style={styles.modalText}>
              The EDSS (Expanded Disability Status Scale) graph offers a visual representation of an individual's disability progression in Multiple Sclerosis. It's a standard method used globally to understand the disease's stages and the effectiveness of treatments. By observing changes over time, individuals and healthcare professionals can gain insights into the current state of the disease and make informed decisions about care.
            </Text>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>Learn more</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    marginTop: 16,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  segmentedControl: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    padding: 4,
  },
  segment: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
  },
  selectedSegment: {
    backgroundColor: '#007bff',
  },
  segmentText: {
    fontSize: 14,
    color: '#666666',
  },
  selectedSegmentText: {
    color: '#ffffff',
  },
  dateNavigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  stepsContainer: {
    alignItems: 'center',
  },
  stepsCount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007bff',
  },
  stepsLabel: {
    fontSize: 16,
    color: '#666666',
  },
  chartPlaceholder: {
    height: 150,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 16,
  },
  chartText: {
    fontSize: 16,
    color: '#666666',
  },
  encouragement: {
    fontSize: 16,
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  statLabel: {
    fontSize: 14,
    color: '#666666',
  },
  additionalStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  additionalStat: {
    fontSize: 14,
    color: '#666666',
  },
  chartLabel: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
  angleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  angleItem: {
    alignItems: 'center',
  },
  angleLabel: {
    fontSize: 16,
    color: '#333333',
  },
  angleValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
  },
  shareButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '300', // Thin font weight
    color: '#666666',
  },
  chartLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  colorLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  colorLine: {
    width: 20,
    height: 3,
    borderRadius: 2,
    marginRight: 8,
  },
  colorLabel: {
    fontSize: 14,
    color: '#666666',
  },
  angleDetail: {
    alignItems: 'center',
    marginBottom: 8,
  },
  angleText: {
    fontSize: 14,
    color: '#666666',
  },
  legendImage: {
    width: '100%',
    height: 50, // Adjust height as needed
    marginBottom: 16,
  },
  edssHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  edssTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  edssIcon: {
    width: 24, // Adjust size as needed
    height: 24, // Adjust size as needed
    marginRight: 8,
  },
  edssLevel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff', // Blue color
  },
  smallIcon: {
    width: 20, // Adjust size as needed
    height: 20, // Adjust size as needed
  },
  edssDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  modalText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 16,
  },
  modalCloseButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  modalCloseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});