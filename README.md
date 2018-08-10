# 실행방법
1. adb devices로 디바이스 연결확인 및 디바이스 번호 확인
2. adb -s 디바이스번호 reverse tcp:8081 tcp:8081
3. react-native run-android 로 실행

# 에러처리
1. index.android.js 관련 에러
- https://stackoverflow.com/questions/44446523/unable-to-load-script-from-assets-index-android-bundle-on-windows
- react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

2. Resource 관련에러
- app.build 
