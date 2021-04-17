package app.myflashcards.myflashcards.modules;

import com.facebook.react.BuildConfig;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;

public class FlashCardsAppVersionModule extends ReactContextBaseJavaModule {
    public FlashCardsAppVersionModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "FlashCardsAppVersion";
    }

    @ReactMethod
    public void getAppVersion(Promise promise) {
        String versionName = BuildConfig.VERSION_NAME;
        int buildNumber = BuildConfig.VERSION_CODE;

        WritableMap map = Arguments.createMap();
        map.putString("marketingVersion", versionName);
        map.putString("buildNumber", Integer.toString(buildNumber));
        promise.resolve(map);
    }
}
