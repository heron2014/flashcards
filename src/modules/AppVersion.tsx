import { useEffect, useState } from 'react';
import { NativeModules } from 'react-native';

const { FlashCardsAppVersion } = NativeModules;

export interface AppVersionNumbers {
  marketingVersion: string;
}

const useAppVersion = () => {
  const [version, setAppVersion] = useState<AppVersionNumbers | null>(null);

  useEffect(() => {
    FlashCardsAppVersion.getAppVersion()
      .then((v: AppVersionNumbers) => (v ? setAppVersion(v) : null))
      .catch(null);
  }, []);

  return {
    appVersion: `MyFlashCards v${version ? version.marketingVersion : '1.0'}`,
  };
};

export default useAppVersion;
