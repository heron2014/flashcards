package app.myflashcards.myflashcards;

import android.os.Bundle;

import androidx.annotation.Nullable;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "FlashCards";
  }

  @Override
  protected void onCreate(@Nullable Bundle savedInstanceState) {
    setTheme(R.style.SplashTheme_Launcher);
    super.onCreate(savedInstanceState);
  }
}
