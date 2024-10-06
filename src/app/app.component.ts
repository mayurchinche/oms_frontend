
import { FormsModule } from '@angular/forms';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone:true,
  imports:[FormsModule]
})
export class AppComponent implements OnInit {
  title = 'Firebase Phone Auth';
  phoneNumber: string = '';
  recaptchaVerifier!: RecaptchaVerifier;
  isBrowser: boolean;

  // Your Firebase configuration
  private firebaseConfig = {
    apiKey: "AIzaSyBHqA9lD6ynLsb0C35tn7XQM1F7LzAgA9U",
    authDomain: "omsphoneauthentication.firebaseapp.com",
    projectId: "omsphoneauthentication",
    storageBucket: "omsphoneauthentication.appspot.com",
    messagingSenderId: "134050555328",
    appId: "1:134050555328:web:9ca0b50552869d933a9425",
    measurementId: "G-VXVQNPYS80"
  };

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      const app = initializeApp(this.firebaseConfig);
    }
  }

  ngOnInit() {
    if (this.isBrowser) {
      const auth = getAuth();
      this.recaptchaVerifier = new RecaptchaVerifier(auth,'recaptcha-container', {
        'size': 'invisible',
        'callback': (response: any) => {
          console.log('reCAPTCHA solved', response);
        }
      });
    }
  }

  async sendVerificationCode() {
    if (this.isBrowser) {
      const appVerifier = this.recaptchaVerifier;
      try {
        const auth = getAuth();
        await signInWithPhoneNumber(auth, this.phoneNumber, appVerifier);
        console.log('OTP sent to ' + this.phoneNumber);
        alert('OTP sent to ' + this.phoneNumber);
      } catch (error) {
        console.error('Error sending verification code:', error);
        alert('Error sending verification code: ' + error);
      }
    }
  }
}
