import { Injectable } from "@angular/core";
import {
  Cordova,
  Plugin,
  AwesomeCordovaNativePlugin,
} from "@awesome-cordova-plugins/core";
import { Observable } from "rxjs";

// Types
export type Address = {
  region?: string | null;
  town?: string | null;
  address?: string | null;
  postcode?: string | null;
};

type Field = {
  key: string;
  value: string;
};

type Fields = Field[];

export type UserAttributesAnonymous = {
  firstName?: string | null;
  lastName?: string | null;
  languageCode?: string | null;
  timeZone?: string | null;
  address?: Address | null;
  fields?: Fields | null;
};

export type UserAttributes = {
  phone?: string | null;
  email?: string | null;
} & UserAttributesAnonymous;

export type User = {
  userAttributes?: UserAttributes | null;
  subscriptionKeys?: string[] | null;
  groupNamesInclude?: string[] | null;
  groupNamesExclude?: string[] | null;
};

export type SetUserAttributesPayload = {
  externalUserId: string;
  user?: User | null;
};

export type SetMultiAccountUserAttributesPayload = {
  externalUserId: string;
  user: User;
};

export type CustomEventParameter = {
  name: string;
  value?: string;
};

export type LogEventPayload = {
  eventName: string;
  date?: string | null;
  parameters?: CustomEventParameter[] | null;
  forcePush?: boolean;
};

export type RequestNotificationPermissionResult = 0 | 1;

export type NotificationPresentationOption = 'badge' | 'sound' | 'alert' | 'banner' | 'list';

export type WillPresentNotificationOptionsPayload = {
  options?: NotificationPresentationOption[];
  presentationOptions?: NotificationPresentationOption[];
  emitEvent?: boolean;
};

export type NotificationResponseHandlerOptions = {
  enabled?: boolean;
  emitEvent?: boolean;
};

export type LifecycleTrackingOptions =
  | {
      appLifecycleEnabled?: boolean | null;
      foregroundLifecycleEnabled?: boolean | null;
      pushSubscriptionEnabled?: boolean | null;
      /** @deprecated Use sessionStartEventsEnabled/sessionEndEventsEnabled instead. */
      sessionEventsEnabled?: boolean | null;
      sessionStartEventsEnabled?: boolean | null;
      sessionEndEventsEnabled?: boolean | null;
    }
  | 'ALL'
  | 'NONE'
  | string;

export type RetenoInitializeOptions = {
  accessKey?: string;
  pauseInAppMessages?: boolean;
  pausePushInAppMessages?: boolean;
  inAppMessagesPauseBehaviour?: InAppPauseBehaviour;
  isAutomaticScreenReportingEnabled?: boolean;
  lifecycleTrackingOptions?: LifecycleTrackingOptions;
  sessionDurationSeconds?: number;
  isDebugMode?: boolean;
};

export type InAppPauseBehaviour = 'SKIP_IN_APPS' | 'POSTPONE_IN_APPS';

export type InAppLifecycleEvent = 'beforeDisplay' | 'onDisplay' | 'beforeClose' | 'afterClose' | 'onError';

export type InAppData = {
  id?: string;
};

export type InAppActionData = {
  isCloseButtonClicked: boolean;
  isButtonClicked: boolean;
  isOpenUrlClicked: boolean;
};

export type InAppCloseData = {
  id?: string;
  closeAction: string;
  action?: InAppActionData;
};

export type InAppErrorData = {
  id?: string;
  errorMessage: string;
};

export type InAppLifecyclePayload = {
  event: InAppLifecycleEvent;
  data: InAppData | InAppCloseData | InAppErrorData;
};

export type InAppLifecycleListener = (payload: InAppLifecyclePayload) => void;

export type InAppStatusHandler = InAppLifecycleListener;

export type NotificationChannelConfig = {
  name: string;
  description: string;
};

export type AppInboxStatus = 'OPENED' | 'UNOPENED';

export type AppInboxMessage = {
  id: string;
  title: string;
  createdDate: string;
  isNewMessage: boolean;
  content?: string | null;
  imageUrl?: string | null;
  linkUrl?: string | null;
  category?: string | null;
  status?: AppInboxStatus | null;
  customData?: Record<string, string> | null;
};

export type AppInboxMessages = {
  messages: AppInboxMessage[];
  totalPages: number;
};

export type GetAppInboxMessagesPayload = {
  page: number;
  pageSize: number;
  status?: AppInboxStatus | string | null;
};

export type RecommendationFilter = {
  name: string;
  values: string[];
};

export type GetRecommendationsPayload = {
  recomVariantId: string;
  productIds?: string[] | null;
  categoryId?: string | null;
  fields?: string[] | null;
  filters?: RecommendationFilter | RecommendationFilter[] | null;
};

export type RecommendationItem = {
  productId: string;
} & Record<string, unknown>;

export type RecommendationsResponse<T = RecommendationItem> = {
  recoms: T[];
};

export type RecommendationEventType = 'IMPRESSIONS' | 'CLICKS' | string;

export type RecommendationEvent = {
  recomEventType: RecommendationEventType;
  occurred: string;
  productId: string;
};

export type LogRecommendationsPayload = {
  recomVariantId: string;
  recomEvents: RecommendationEvent[];
};

export type EcommerceDate = string | number;

export type EcommerceAttribute = {
  name: string;
  value: string[];
};

export type ProductView = {
  productId: string;
  price: number;
  isInStock: boolean;
  attributes?: EcommerceAttribute[] | null;
};

export type ProductCategoryView = {
  productCategoryId: string;
  attributes?: EcommerceAttribute[] | null;
};

export type ProductInCart = {
  productId: string;
  quantity: number;
  price: number;
  discount?: number | null;
  name?: string | null;
  category?: string | null;
  attributes?: EcommerceAttribute[] | null;
};

export type OrderItem = {
  externalItemId: string;
  name: string;
  category: string;
  quantity: number;
  cost: number;
  url: string;
  imageUrl?: string | null;
  description?: string | null;
};

export type OrderStatus = 'INITIALIZED' | 'IN_PROGRESS' | 'DELIVERED' | 'CANCELLED' | string;

export type OrderAttribute = {
  key: string;
  value: string;
};

export type Order = {
  externalOrderId: string;
  externalCustomerId?: string | null;
  totalCost: number;
  status: OrderStatus;
  date: EcommerceDate;
  cartId?: string | null;
  email?: string | null;
  phone?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  shipping?: number | null;
  discount?: number | null;
  taxes?: number | null;
  restoreUrl?: string | null;
  statusDescription?: string | null;
  storeId?: string | null;
  source?: string | null;
  deliveryMethod?: string | null;
  paymentMethod?: string | null;
  deliveryAddress?: string | null;
  items?: OrderItem[] | null;
  attributes?: OrderAttribute[] | Record<string, string> | null;
};

export type EcommerceEventType =
  | 'productViewed'
  | 'productCategoryViewed'
  | 'productAddedToWishlist'
  | 'cartUpdated'
  | 'orderCreated'
  | 'orderUpdated'
  | 'orderDelivered'
  | 'orderCancelled'
  | 'searchRequest'
  | string;

export type ProductViewedEvent = {
  eventType: 'productViewed';
  product: ProductView;
  currencyCode?: string | null;
  occurred?: EcommerceDate | null;
};

export type ProductCategoryViewedEvent = {
  eventType: 'productCategoryViewed';
  category: ProductCategoryView;
  occurred?: EcommerceDate | null;
};

export type ProductAddedToWishlistEvent = {
  eventType: 'productAddedToWishlist';
  product: ProductView;
  currencyCode?: string | null;
  occurred?: EcommerceDate | null;
};

export type CartUpdatedEvent = {
  eventType: 'cartUpdated';
  cartId: string;
  products: ProductInCart[];
  currencyCode?: string | null;
  occurred?: EcommerceDate | null;
};

export type OrderCreatedEvent = {
  eventType: 'orderCreated';
  order: Order;
  currencyCode?: string | null;
  occurred?: EcommerceDate | null;
};

export type OrderUpdatedEvent = {
  eventType: 'orderUpdated';
  order: Order;
  currencyCode?: string | null;
  occurred?: EcommerceDate | null;
};

export type OrderDeliveredEvent = {
  eventType: 'orderDelivered';
  externalOrderId: string;
  occurred?: EcommerceDate | null;
};

export type OrderCancelledEvent = {
  eventType: 'orderCancelled';
  externalOrderId: string;
  occurred?: EcommerceDate | null;
};

export type SearchRequestEvent = {
  eventType: 'searchRequest';
  search: string;
  isFound?: boolean | null;
  occurred?: EcommerceDate | null;
};

export type LogEcommerceEventPayload =
  | ProductViewedEvent
  | ProductCategoryViewedEvent
  | ProductAddedToWishlistEvent
  | CartUpdatedEvent
  | OrderCreatedEvent
  | OrderUpdatedEvent
  | OrderDeliveredEvent
  | OrderCancelledEvent
  | SearchRequestEvent;

export type RetenoPushReceivedPayload = Record<string, unknown>;

export type RetenoNotificationClickedPayload = Record<string, unknown>;

export type RetenoPushReceivedListener = (payload: RetenoPushReceivedPayload) => void;

export type RetenoNotificationClickedListener = (payload: RetenoNotificationClickedPayload) => void;

export type RetenoInAppCustomDataPayload = Record<string, unknown>;

export type RetenoInAppCustomDataListener = (payload: RetenoInAppCustomDataPayload) => void;

export type RetenoPushDismissedPayload = Record<string, unknown>;

export type RetenoPushDismissedListener = (payload: RetenoPushDismissedPayload) => void;

export type RetenoCustomPushReceivedPayload = Record<string, unknown>;

export type RetenoCustomPushReceivedListener = (payload: RetenoCustomPushReceivedPayload) => void;

export type RetenoPushButtonClickedPayload = {
  actionId: string;
  link?: string | null;
  customData?: Record<string, unknown> | string | null;
  userInfo?: Record<string, unknown>;
};

export type RetenoPushButtonClickedListener = (payload: RetenoPushButtonClickedPayload) => void;

@Plugin({
  pluginName: "CordovaPluginReteno",
  plugin: "cordova-plugin-reteno",
  pluginRef: "RetenoPlugin",
  platforms: ["Android", "iOS"],
  repo: "https://github.com/reteno-com/cordova-plugin-reteno",
})
@Injectable()
export class AwesomeCordovaPluginReteno extends AwesomeCordovaNativePlugin {
  // Initialization
  @Cordova({ otherPromise: true })
  init(options?: RetenoInitializeOptions): Promise<any> {
    return;
  }

  @Cordova({ otherPromise: true })
  requestNotificationPermission(): Promise<RequestNotificationPermissionResult> {
    return;
  }

  @Cordova({ otherPromise: true })
  setLifecycleTrackingOptions(options: LifecycleTrackingOptions): Promise<any> {
    return;
  }

  // User data
  @Cordova({ otherPromise: true })
  setUserAttributes(payload: SetUserAttributesPayload): Promise<any> {
    return;
  }

  @Cordova({ otherPromise: true })
  setAnonymousUserAttributes(payload: UserAttributesAnonymous): Promise<any> {
    return;
  }

  @Cordova({ otherPromise: true })
  setMultiAccountUserAttributes(payload: SetMultiAccountUserAttributesPayload): Promise<any> {
    return;
  }

  // Event tracking
  @Cordova({ otherPromise: true })
  logEvent(payload: LogEventPayload): Promise<any> {
    return;
  }

  @Cordova({ otherPromise: true })
  logEcommerceEvent(payload: LogEcommerceEventPayload): Promise<any> {
    return;
  }

  @Cordova({ otherPromise: true })
  logScreenView(screenName: string): Promise<any> {
    return;
  }

  @Cordova({ otherPromise: true })
  forcePushData(): Promise<any> {
    return;
  }

  // Push notifications
  @Cordova({ otherPromise: true })
  setDeviceToken(deviceToken: string): Promise<any> {
    return;
  }

  @Cordova({ otherPromise: true })
  getInitialNotification(): Promise<any> {
    return;
  }

  @Cordova({ sync: true })
  setOnRetenoPushReceivedListener(listener: RetenoPushReceivedListener): void {}

  @Cordova({ sync: true })
  removeOnRetenoPushReceivedListener(listener: RetenoPushReceivedListener): void {}

  @Cordova({ sync: true })
  setOnRetenoNotificationClickedListener(listener: RetenoNotificationClickedListener): void {}

  @Cordova({ sync: true })
  removeOnRetenoNotificationClickedListener(listener: RetenoNotificationClickedListener): void {}

  @Cordova({ sync: true })
  setOnRetenoPushDismissedListener(listener: RetenoPushDismissedListener): void {}

  @Cordova({ sync: true })
  removeOnRetenoPushDismissedListener(listener: RetenoPushDismissedListener): void {}

  @Cordova({ sync: true })
  setOnRetenoCustomPushReceivedListener(listener: RetenoCustomPushReceivedListener): void {}

  @Cordova({ sync: true })
  removeOnRetenoCustomPushReceivedListener(listener: RetenoCustomPushReceivedListener): void {}

  @Cordova({ sync: true })
  setOnRetenoPushButtonClickedListener(listener: RetenoPushButtonClickedListener): void {}

  @Cordova({ sync: true })
  removeOnRetenoPushButtonClickedListener(listener: RetenoPushButtonClickedListener): void {}

  @Cordova({ otherPromise: true })
  setNotificationActionHandler(options?: NotificationResponseHandlerOptions | boolean): Promise<any> {
    return;
  }

  @Cordova({ otherPromise: true })
  setWillPresentNotificationOptions(payload: WillPresentNotificationOptionsPayload | NotificationPresentationOption[] | null): Promise<any> {
    return;
  }

  @Cordova({ otherPromise: true })
  setDidReceiveNotificationResponseHandler(options?: NotificationResponseHandlerOptions | boolean | null): Promise<any> {
    return;
  }

  @Cordova({ otherPromise: true })
  updateDefaultNotificationChannel(payload: NotificationChannelConfig): Promise<any> {
    return;
  }

  // In-app messages
  @Cordova({ otherPromise: true })
  pauseInAppMessages(pause: boolean): Promise<any> {
    return;
  }

  @Cordova({ otherPromise: true })
  setInAppMessagesPauseBehaviour(behaviour: InAppPauseBehaviour): Promise<any> {
    return;
  }

  @Cordova({ otherPromise: true })
  setOnInAppLifecycleCallback(callback: InAppLifecycleListener | null): Promise<any> {
    return;
  }

  @Cordova({ sync: true })
  setOnInAppMessageCustomDataReceivedListener(listener: RetenoInAppCustomDataListener): void {}

  @Cordova({ sync: true })
  removeOnInAppMessageCustomDataReceivedListener(listener: RetenoInAppCustomDataListener): void {}

  // App Inbox
  @Cordova({ otherPromise: true })
  getAppInboxMessages(payload: GetAppInboxMessagesPayload): Promise<AppInboxMessages> {
    return;
  }

  @Cordova({ otherPromise: true })
  getAppInboxMessagesCount(): Promise<number> {
    return;
  }

  @Cordova({ observable: true, clearFunction: 'unsubscribeMessagesCountChanged' })
  subscribeOnMessagesCountChanged(): Observable<number> {
    return;
  }

  @Cordova({ otherPromise: true })
  unsubscribeMessagesCountChanged(): Promise<any> {
    return;
  }

  @Cordova({ otherPromise: true })
  markAsOpened(messageId: string): Promise<any> {
    return;
  }

  @Cordova({ otherPromise: true })
  markAllMessagesAsOpened(): Promise<any> {
    return;
  }

  // Recommendations
  @Cordova({ otherPromise: true })
  getRecommendations(payload: GetRecommendationsPayload): Promise<RecommendationsResponse> {
    return;
  }

  @Cordova({ otherPromise: true })
  logRecommendations(payload: LogRecommendationsPayload): Promise<any> {
    return;
  }

  /**
   * @deprecated this method of Reteno initialization is deprecated, use init() instead
   */
  @Cordova({ otherPromise: true })
  setApiKey(apiKey: string): Promise<any> {
    return;
  }

  /**
   * @deprecated use setDeviceToken() instead if another plugin handles push tokens
   */
  @Cordova({ otherPromise: true })
  performRemoteToken(apiKey: string): Promise<any> {
    return;
  }

  /**
   * @deprecated use init() with lifecycleTrackingOptions instead
   */
  @Cordova({ sync: true })
  registerApplicationDidBecomeActiveListener(fn: () => void): void {}

  /**
   * @deprecated use init() with lifecycleTrackingOptions instead
   */
  @Cordova({ sync: true })
  registerApplicationDidEnterBackgroundListener(fn: () => void): void {}
}
