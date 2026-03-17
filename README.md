# awesome-cordova-plugins-reteno

Ionic Native wrapper for [`cordova-plugin-reteno`](https://www.npmjs.com/package/cordova-plugin-reteno).

## Installation

Install the Cordova plugin and the Ionic Native wrapper:

```bash
# Cordova plugin
cordova plugin add cordova-plugin-reteno --variable SDK_ACCESS_KEY=YOUR_ACCESS_KEY

# Ionic Native wrapper
npm install awesome-cordova-plugins-reteno@8
```

Also install `@awesome-cordova-plugins/core` if not already present:

```bash
npm install @awesome-cordova-plugins/core
```

## Usage

### Module setup

```typescript
import { AwesomeCordovaPluginReteno } from 'awesome-cordova-plugins-reteno';

@NgModule({
  providers: [AwesomeCordovaPluginReteno],
})
export class AppModule {}
```

### Initialization

```typescript
import { AwesomeCordovaPluginReteno } from 'awesome-cordova-plugins-reteno';

constructor(private reteno: AwesomeCordovaPluginReteno) {}

async initReteno() {
  await this.reteno.init({
    accessKey: 'YOUR_ACCESS_KEY',
    lifecycleTrackingOptions: 'ALL',
  });
}
```

### Set user attributes

```typescript
await this.reteno.setUserAttributes({
  externalUserId: 'user-123',
  user: {
    userAttributes: {
      email: 'john@example.com',
      firstName: 'John',
      lastName: 'Doe',
    },
  },
});
```

### Log custom event

```typescript
await this.reteno.logEvent({
  eventName: 'purchase',
  date: new Date().toISOString(),
  parameters: [
    { name: 'orderId', value: 'A-123' },
    { name: 'amount', value: '19.99' },
  ],
});
```

### Push notification listeners

```typescript
this.reteno.setOnRetenoPushReceivedListener((event) => {
  console.log('Push received:', event);
});

this.reteno.setOnRetenoNotificationClickedListener((event) => {
  console.log('Notification clicked:', event);
});
```

## Supported platforms

- Android
- iOS

## Links

- [cordova-plugin-reteno on npm](https://www.npmjs.com/package/cordova-plugin-reteno)
- [Reteno documentation](https://docs.reteno.com/reference/cordova-sdk-setup)
- [@awesome-cordova-plugins](https://github.com/danielsogl/awesome-cordova-plugins)

## License

MIT
