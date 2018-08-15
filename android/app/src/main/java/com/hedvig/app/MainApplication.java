package com.hedvig.app;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import io.branch.rnbranch.RNBranchPackage;
import com.rnim.rn.audio.ReactNativeAudioPackage;
import com.leo_pharma.analytics.AnalyticsPackage;
import com.airbnb.android.react.lottie.LottiePackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import io.branch.rnbranch.RNBranchPackage;
import com.microsoft.codepush.react.CodePush;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import io.branch.referral.Branch;

import java.util.Arrays;
import java.util.List;

import com.zmxv.RNSound.RNSoundPackage;
import io.sentry.RNSentryPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
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
      return Arrays.<ReactPackage>asList(new MainReactPackage(), new ReactNativeConfigPackage(),
          new RNFetchBlobPackage(), new CodePush(null, getApplicationContext(), BuildConfig.DEBUG),
          new RNSoundPackage(), new RNSentryPackage(), new RNFirebasePackage(), new RNFirebaseNotificationsPackage(),
          new RNFirebaseMessagingPackage(), new RNBranchPackage(), new ReactNativeAudioPackage(),
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
    Branch.getAutoInstance(this);
    SoLoader.init(this, false);
  }
}
