package com.hedvig.app;

import com.reactnativenavigation.NavigationActivity;
import io.branch.rnbranch.*;
import android.content.Intent;

public class MainActivity extends NavigationActivity {
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
