#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>

API_AVAILABLE(ios(15.0))
@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate, UNUserNotificationCenterDelegate>

@property (nonatomic, strong) UIWindow *window;

@property(nonatomic) CAFrameRateRange preferredFrameRateRange;

@end
