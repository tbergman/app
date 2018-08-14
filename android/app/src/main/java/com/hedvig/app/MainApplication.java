package com.hedvig.app;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.zmxv.RNSound.RNSoundPackage;
import io.sentry.RNSentryPackage;
import io.invertase.firebase.RNFirebasePackage;
import com.microsoft.codepush.react.CodePush;
import io.branch.rnbranch.RNBranchPackage;
import com.rnim.rn.audio.ReactNativeAudioPackage;
import com.leo_pharma.analytics.AnalyticsPackage;
import com.airbnb.android.react.lottie.LottiePackage;
import com.microsoft.codepush.react.CodePush;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

import com.zmxv.RNSound.RNSoundPackage;
import io.sentry.RNSentryPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.branch.rnbranch.RNBranchPackage;
import com.rnim.rn.audio.ReactNativeAudioPackage;
import com.leo_pharma.analytics.AnalyticsPackage;
import com.airbnb.android.react.lottie.LottiePackage;

public class MainApplication extends Application implements ReactApplication {
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(new MainReactPackage(),
            new RNSoundPackage(),
            new RNSentryPackage(),
            new RNFirebasePackage(),
            new CodePush(null, getApplicationContext(), BuildConfig.DEBUG),
            new RNBranchPackage(),
            new ReactNativeAudioPackage(),
            new AnalyticsPackage(),
            new LottiePackage(),
            new CodePush(null, getApplicationContext(), BuildConfig.DEBUG), new RNSoundPackage(), new RNSentryPackage(),
          new RNFirebasePackage(), new RNFirebaseMessagingPackage(), new RNBranchPackage(), new ReactNativeAudioPackage(),
          new AnalyticsPackage(), new LottiePackage());
    }

    @Override
    protected String getJSBundleFile() {
      return CodePush.getJSBundleFile();
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, false);
  }
}
