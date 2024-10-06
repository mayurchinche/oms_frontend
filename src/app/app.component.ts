import { Component, AfterViewInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [FormsModule] // Import FormsModule for ngModel
})
export class AppComponent implements AfterViewInit {
  title = 'Firebase Phone Auth';
  phoneNumber: string = '';
  recaptchaVerifier!: RecaptchaVerifier;

  private firebaseConfig = {
    apiKey: "AIzaSyBHqA9lD6ynLsb0C35tn7XQM1F7LzAgA9U",
    authDomain: "omsphoneauthentication.firebaseapp.com",
    projectId: "omsphoneauthentication",
    storageBucket: "omsphoneauthentication.appspot.com",
    messagingSenderId: "134050555328",
    appId: "1:134050555328:web:9ca0b50552869d933a9425",
    measurementId: "G-VXVQNPYS80"
  };

  constructor() {
    // Initialize Firebase
    initializeApp(this.firebaseConfig);
    console.log("firebase app intialized",initializeApp)
    
  }

  ngAfterViewInit() {
   // Ensure you pass the initialized app here
   const app = initializeApp(this.firebaseConfig);
   const auth = getAuth(app); 
    this.recaptchaVerifier = new RecaptchaVerifier(auth,'recaptcha-container', {});
    console.log(this.recaptchaVerifier)

  }

  async sendVerificationCode() {
    const appVerifier = this.recaptchaVerifier;
    const auth = getAuth(); // Get the Auth instance again here

    try {
        console.log('Sending verification code to:', this.phoneNumber); // Log the phone number
        await signInWithPhoneNumber(auth, this.phoneNumber, appVerifier);
        console.log('OTP sent to ' + this.phoneNumber);
        alert('OTP sent to ' + this.phoneNumber);
    } catch (error) {
        console.error('Error sending verification code:', error);
        console.error('Error details:', error); // Log detailed error information
        alert('Error sending verification code: ' + error);
    }
}

}
