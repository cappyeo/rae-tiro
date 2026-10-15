{
  'targets': [
    {
      'target_name': 'microphone',
      'sources': [ 'src/index.cc', 'src/microphone.cc' ],
      'include_dirs': ["<!@(node -p \"require('node-addon-api').include\")"],
      'dependencies': ["<!(node -p \"require('node-addon-api').gyp\")"],
      'cflags!': [ '-fno-exceptions' ],
      'cflags_cc!': [ '-fno-exceptions' ],
      'msvs_settings': {
        'VCCLCompilerTool': { 'ExceptionHandling': 1 },
      },
      'conditions': [
        ['OS=="mac"', {
          'xcode_settings': {
            'GCC_ENABLE_CPP_EXCEPTIONS': 'YES',
            'CLANG_CXX_LIBRARY': 'libc++',
            'MACOSX_DEPLOYMENT_TARGET': '10.7'
          },
          'libraries': [
            '-framework CoreAudio',
            '-framework CoreFoundation'
          ]
        }],
        ['OS=="win"', {
          'defines': ['NOMINMAX', 'WIN32_LEAN_AND_MEAN'],
          'msvs_settings': {
            'VCCLCompilerTool': {
              'ExceptionHandling': 1,
              'AdditionalOptions': [
                '/EHsc',
                '/utf-8'
              ]
            }
          },
          'libraries': [
            '-lole32.lib',
            '-loleaut32.lib',
            '-lkernel32.lib'
          ]
        }]
      ]
    }
  ]
}