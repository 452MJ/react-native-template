#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>

@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate>

@property (nonatomic, strong) UIWindow *window;

@property(nonatomic) CAFrameRateRange preferredFrameRateRange API_AVAILABLE(ios(15.0));

@end
