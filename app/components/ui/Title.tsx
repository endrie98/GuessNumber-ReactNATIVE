import { Platform } from 'react-native';

const Title = Platform.select({
  ios: () => require('./Title.ios').default,
  android: () => require('./Title.android').default,
  default: () => require('./Title.android').default, // fallback
})();

export default Title;
