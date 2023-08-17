import { Injectable } from '@angular/core';
import { Cordova, Plugin, AwesomeCordovaNativePlugin } from '@awesome-cordova-plugins/core';
import { Observable } from 'rxjs';

export interface Address {
  region?: string | null;
  town?: string | null;
  address?: string | null;
  postcode?: string | null;
};

interface Field {
  key: string;
  value: string;
};

export interface UserAttributes {
  phone?: string | null;
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  languageCode?: string | null;
  timeZone?: string | null;
  address?: Address | null;
  fields?: Field[] | null;
};

export interface User {
  userAttributes?: UserAttributes | null;
  subscriptionKeys?: String[] | null;
  groupNamesInclude?: String[] | null;
  groupNamesExclude?: String[] | null;
};

export interface SetUserAttributesPayload {
  externalUserId: string;
  userAttributes?: UserAttributes | null;
  subscriptionKeys?: String[] | null;
  groupNamesInclude?: String[] | null;
  groupNamesExclude?: String[] | null;
};

export interface CustomEventParameter {
  name: string;
  value?: string;
};

export interface LogEvent{
  eventName: string,
  date: string,
  parameters: CustomEventParameter[],
  forcePush?: boolean
}

// We need two decorators @Plugin and @Injectable.
//
// For the @Plugin properties, remember what we wrote
// in our plugin's plugin.xml file:
//
// <!-- www -->
// <js-module name="CordovaPluginExample" src="www/CordovaPluginExample.js">
//   <clobbers target="cordova.plugins.CordovaPluginExample" />
// </js-module>
//
// pluginName == js-module.name
// pluginRef == clobbers.target

@Plugin({
  pluginName: 'CordovaPluginReteno',
  plugin: 'cordova-plugin-reteno',
  pluginRef: 'RetenoPlugin',
  platforms: ['Android', 'iOS'],
  repo: 'https://github.com/reteno-com/reteno-cordova/tree/main/cordova-plugin-reteno'
})
@Injectable()
export class AwesomeCordovaPluginReteno extends AwesomeCordovaNativePlugin {

  // For every method, use the @Cordova decorator.
  // Since in our Cordova plugin JavaScript file (www/CordovaPluginExample.js)
  // we defined callback functions before parameters,
  // now we have to declare 'callbackOrder' as 'reverse'.

  @Cordova()
  setApiKey(apiKey: string): Promise<any> {
    return null;
  }

  @Cordova()
  logEvent(
      payload: LogEvent
  ) : Promise<any> {
    return null;
  }

  @Cordova()
  setUserAttributes(
      payload: SetUserAttributesPayload
  ) : Promise<any> {
    return null;
  }

  @Cordova()
  setAnonymousUserAttributes(
      payload: User
  ) : Promise<any> {
    return null;
  }

  @Cordova()
  getInitialNotification(
      success: (value: object) => void,
      error: (err: string) => void
  ) : Promise<any> {
    return null;
  }

  @Cordova()
  setOnRetenoPushReceivedListener (): Promise<any> {
    return null;
  }
  @Cordova()
  performRemoteToken(
      apiKey: string
  ) : Promise<any> {
    return null;
  }

  @Cordova()
  setDeviceToken (
      deviceToken: string
  ) : Promise<any> {
    return null;
  }

  @Cordova()
  registerApplicationDidBecomeActiveListener(
      fn: () => void,
  ): Promise<any> {
    return null;
  }

  @Cordova()
  registerApplicationDidEnterBackgroundListener(
      fn: () => void,
  ): Promise<any> {
    return null;
  }
}

// Check more `@Plugin` and `@Cordova` options (and other details)
// in the official developer documentation:
// https://github.com/danielsogl/awesome-cordova-plugins/blob/master/DEVELOPER.md
