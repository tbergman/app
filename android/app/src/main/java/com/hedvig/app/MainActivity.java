package com.hedvig.app;

import com.facebook.react.ReactActivity;
import io.branch.rnbranch.*;
import android.content.Intent;

public class MainActivity extends ReactActivity {
    @Override
    protected String getMainComponentName() {
        return "Hedvig";
    }

    @Override
    protected void onStart() {
        super.onStart();
        RNBranchModule.initSession(getIntent().getData(), this);
    }

    @Override
    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
    }
}
