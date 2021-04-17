//
//  FlashCardsAppVersion.m
//  FlashCards
//
//  Created by Anita Czapla on 21/02/2021.
//

#import "FlashCardsAppVersion.h"

@implementation FlashCardsAppVersion

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(getAppVersion:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

{
  NSDictionary *infoDictionary = [[NSBundle mainBundle] infoDictionary];
  NSString *buildNumber = [infoDictionary objectForKey:@"CFBundleVersion"];
  NSString *marketingVersion = [infoDictionary objectForKey:@"CFBundleShortVersionString"];
  NSDictionary *result = @{@"buildNumber":buildNumber, @"marketingVersion": marketingVersion};
  
  resolve(result);
}

@end
