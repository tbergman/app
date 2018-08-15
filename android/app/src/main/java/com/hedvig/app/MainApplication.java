package com.hedvig.app;

import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;

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
import javax.annotation.Nullable;

import com.zmxv.RNSound.RNSoundPackage;
import io.sentry.RNSentryPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import io.branch.rnbranch.RNBranchPackage;
import com.rnim.rn.audio.ReactNativeAudioPackage;
import com.leo_pharma.analytics.AnalyticsPackage;
import com.airbnb.android.react.lottie.LottiePackage;

public class MainApplication extends NavigationApplication {
  @Override
  protected ReactGateway createReactGateway() {
    ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), getPackages()) {
      @Override
      public boolean getUseDeveloperSupport() {
        return isDebug();
      }

      @Override
      protected String getJSMainModuleName() {
        return "index";
      }

      @Nullable
      @Override
      protected String getJSBundleFile() {
        return CodePush.getJSBundleFile();
      }
    };

    return new ReactGateway(this, isDebug(), host);
  }

  @Override
  public boolean isDebug() {
    return BuildConfig.DEBUG;
  }

  protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(new ReactNativeConfigPackage(), new RNFetchBlobPackage(),
        new CodePush(BuildConfig.CODE_PUSH_DEPLOYMENT_KEY, getApplicationContext(), isDebug()), new RNSoundPackage(),
        new RNSentryPackage(), new RNFirebasePackage(), new RNFirebaseNotificationsPackage(),
        new RNFirebaseMessagingPackage(), new RNBranchPackage(), new ReactNativeAudioPackage(), new AnalyticsPackage(),
        new LottiePackage());
  }

  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    return getPackages();
  }

  @Override
  public void onCreate() {
    super.onCreate();
    Branch.getAutoInstance(this);
    SoLoader.init(this, false);
  }
}
