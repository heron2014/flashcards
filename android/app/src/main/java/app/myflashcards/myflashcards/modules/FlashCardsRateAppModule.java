package app.myflashcards.myflashcards.modules;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.android.play.core.review.ReviewInfo;
import com.google.android.play.core.review.ReviewManager;
import com.google.android.play.core.review.ReviewManagerFactory;
import com.google.android.play.core.tasks.Task;

public class FlashCardsRateAppModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;
    private ReviewInfo reviewInfo;
    private ReviewManager manager;

    FlashCardsRateAppModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
        manager = ReviewManagerFactory.create(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "FlashCardsRateApp";
    }

    @ReactMethod
    public void requestReview(Promise promise) {
        Task<ReviewInfo> request = manager.requestReviewFlow();

        request.addOnCompleteListener(task -> {
            if (task.isSuccessful()) {
                // Received ReviewInfo object
                reviewInfo = task.getResult();
//                System.out.println(reviewInfo); // console.log
                Task<Void> flow = manager.launchReviewFlow(getCurrentActivity(), reviewInfo);
                flow.addOnCompleteListener(t -> {
                    promise.resolve("success");
                });
            } else {
                // issue occured
                reviewInfo = null;
                promise.reject(new Error("problem"));
            }
        });
    }
}
