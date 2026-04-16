export const DownloadLinks = {
  windows: {
    installer:
      'https://ghproxy.sylinko.com/download?product=everywhere&os=win-x64&type=setup&version=latest',
    portable:
      'https://ghproxy.sylinko.com/download?product=everywhere&os=win-x64&type=zip&version=latest',
  },
  macos: {
    silicon:
      'https://ghproxy.sylinko.com/download?product=everywhere&os=osx-arm64&type=pkg&version=latest',
    intel:
      'https://ghproxy.sylinko.com/download?product=everywhere&os=osx-x64&type=pkg&version=latest',
  },
  linux: {
    deb: '',
    rpm: '',
    aur: '',
  },
} as const;

export const AccountUrl = "https://account.sylinko.com";