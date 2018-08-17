require 'json'
package = JSON.parse(File.read('../../node_modules/react-native-analytics-segment-io/package.json'))

Pod::Spec.new do |s|
  s.name                = "RNAnalyticsSegmentIO"
  s.version             = package["version"]
  s.summary             = package["description"]
  s.description         = package["description"]
  s.homepage            = "https://github.com/leoilab/react-native-analytics-segment-io"
  s.license             = package['license']
  s.authors             = "Invertase Limited"
  s.source              = { :git => "https://github.com/leoilab/react-native-analytics-segment-io.git", :tag => "v#{s.version}" }
  s.platform            = :ios, "8.0"
  s.source_files        = 'ios/**/*.{h,m}'
  s.dependency          'React'
  s.dependency          'Analytics'
end