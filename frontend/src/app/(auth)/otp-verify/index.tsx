import { StyleSheet, Text, View, TouchableOpacity, TextInput, useWindowDimensions } from 'react-native'
import React, { useState, useRef } from 'react'
import SafeAreaWrapper from '@/components/SafeAreaWrapper'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import PageHeading from '../_components/PageHeading'
import FloatingBackButton from '@/components/FloatingBackButton'
import PageDescription from '../_components/PageDescription'

type Props = {}

const OTPScreen = (props: Props) => {
  const [otp, setOtp] = useState(['', '', '', ''])
  const inputRefs = useRef<Array<TextInput | null>>([null, null, null, null])
  const [timer, setTimer] = useState(30)

  // Handle OTP input change
  const handleOtpChange = (value: string, index: number) => {
    if (value.length <= 1) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)

      // Move to next input if value is entered
      if (value !== '' && index < 3) {
        inputRefs.current[index + 1]?.focus()
      }
    }
  }

  // Handle verification
  const handleVerify = () => {
    const otpValue = otp.join('')
    console.log('Verifying OTP:', otpValue)
    // Add your verification logic here
    // If successful, navigate to the next screen
    // router.push('/(tabs)')
  }

  // Handle resend code
  const handleResend = () => {
    console.log('Resending code')
    setTimer(30)
    // Add your resend logic here
  }

  const { width } = useWindowDimensions()
  const name = "Rahul"
  return (
    <SafeAreaWrapper>
      <View style={[styles.container, ]}>
        <FloatingBackButton/>

        <PageHeading heading='OTP Verification'/>
        <PageDescription description={`Please Check Your Email To See The \n Verification Code.`}/>

        <View style={{width:width, paddingHorizontal: 25}}>
        <View style={styles.otpSection}>
          <Text style={styles.otpLabel}>OTP Code</Text>
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                style={styles.otpInput}
                value={digit}
                onChangeText={(value) => handleOtpChange(value, index)}
                keyboardType="number-pad"
                maxLength={1}
              />
            ))}
          </View>
        </View>

        <TouchableOpacity 
          style={styles.verifyButton}
          onPress={handleVerify}
        >
          <Text style={styles.verifyButtonText}>Verify</Text>
        </TouchableOpacity>

        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Resend code to</Text>
          <Text style={styles.timer}>{String(timer).padStart(2, '0')}:{String(0).padStart(2, '0')}</Text>
        </View>
      </View>
        </View>
    </SafeAreaWrapper>
  )
}

export default OTPScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  otpSection: {
    marginBottom: 40,
  },
  otpLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpInput: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  verifyButton: {
    backgroundColor: '#000',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resendText: {
    color: '#666',
    fontSize: 14,
  },
  timer: {
    fontSize: 14,
    color: '#666',
  }
})