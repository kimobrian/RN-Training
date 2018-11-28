## Authentication Steps:
- Create app
  $ react-native init Authentication

- Install package and initialize pods.
    ```sh
    $ react-native install react-native-google-signin`
    $ cd ios
    $ pod init
    ```
- Update podfile to by adding "pod 'GoogleSignIn'"
```Pod
# Uncomment the next line to define a global platform for your project
# platform :ios, '9.0'

target 'Authentication' do
  # Uncomment the next line if you're using Swift or would like to use dynamic frameworks
  # use_frameworks!

  # Pods for Authentication

  pod 'GoogleSignIn'

  target 'AuthenticationTests' do
    inherit! :search_paths
    # Pods for testing
  end

end

target 'Authentication-tvOS' do
  # Uncomment the next line if you're using Swift or would like to use dynamic frameworks
  # use_frameworks!

  # Pods for Authentication-tvOS

  target 'Authentication-tvOSTests' do
    inherit! :search_paths
    # Pods for testing
  end

end
```

- Run `pod install`

- In the [developer console](https://console.cloud.google.com/apis/credentials), create web and ios client Ids.

- Set config with `webClientId` and `iosClientId` using values from the developer console.

- Add URL Scheme to your project

  > Google Sign-in requires a custom URL Scheme to be added to your project. To add the custom scheme:
  > Open your project configuration: double-click the project name in the left tree view. Select your app from the TARGETS section, then select the Info tab, and expand the URL Types section.
  Click the + button, and add your reversed client ID as a URL scheme.
  The reversed client ID is your client ID with the order of the dot-delimited fields reversed. For example:
    `com.googleusercontent.apps.1234567890-abcdefg`
  When completed, your config should look something similar to the following (but with your application-specific values):
    ```js
    const values = {
      webClientId: '365817353968-mg57505av4jqrqlkg8qrkpo1f9n697ep.apps.googleusercontent.com',
      iosClientId: '365817353968-ssam6rmh4228kefkcl0iva707k5mb0u1.apps.googleusercontent.com'
    }

    export default values;
    ```

- In the app, call config with the correct arguments. Do this in `componentDidMount`. It's a onetime thing.
    ```js
    GoogleSignin.configure({
      webClientId: config.webClientId,
      iosClientId: config.iosClientId,
      offlineAccess: false,
    });
    ```
