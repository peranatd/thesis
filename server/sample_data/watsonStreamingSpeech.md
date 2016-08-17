Results: {
   "results": [
      {
         "alternatives": [
            {
               "word_confidence": [
                  [
                     "ed",
                     0.04311548692916008
                  ]
               ],
               "confidence": 0.043,
               "transcript": "ed ",
               "timestamps": [
                  [
                     "ed",
                     4.71,
                     5.17
                  ]
               ]
            },
            {
               "transcript": "okay "
            },
            {
               "transcript": "Ted "
            }
         ],
         "final": true
      }
   ],
   "result_index": 0
}
Data: "ed "
Results: {
   "results": [
      {
         "alternatives": [
            {
               "timestamps": [],
               "confidence": 0,
               "transcript": "the "
            },
            {
               "transcript": "did you "
            }
         ],
         "final": true
      }
   ],
   "result_index": 1
}
Data: "the "
Results: {
   "results": [
      {
         "alternatives": [
            {
               "timestamps": [],
               "confidence": 0,
               "transcript": "angel "
            },
            {
               "transcript": "in "
            }
         ],
         "final": true
      }
   ],
   "result_index": 2
}
Data: "angel "
Results: {
   "results": [
      {
         "alternatives": [
            {
               "word_confidence": [
                  [
                     "Tuesday",
                     0.06166083755633245
                  ]
               ],
               "confidence": 0.062,
               "transcript": "Tuesday ",
               "timestamps": [
                  [
                     "Tuesday",
                     8.36,
                     8.93
                  ]
               ]
            },
            {
               "transcript": "his state "
            },
            {
               "transcript": "juicy "
            }
         ],
         "final": true
      }
   ],
   "result_index": 3
}
Data: "Tuesday "
Results: {
   "results": [
      {
         "alternatives": [
            {
               "timestamps": [],
               "confidence": 0,
               "transcript": "angel "
            },
            {
               "transcript": "just "
            }
         ],
         "final": true
      }
   ],
   "result_index": 4
}
Data: "angel "
SPEECH TO TEXT
PassThrough {
  _readableState:
   ReadableState {
     objectMode: false,
     highWaterMark: 16384,
     buffer: [ <Buffer 52 49 46 46 9e a9 03 00 57 41 56 45 66 6d 74 20 10 00 00 00 01 00 01 00 40 1f 00 00 80 3e 00 00 02 00 10 00 64 61 74 61 7a a9 03 00 03 00 04 00 06 00 ... > ],
     length: 240038,
     pipes: null,
     pipesCount: 0,
     flowing: null,
     ended: true,
     endEmitted: false,
     reading: false,
     sync: false,
     needReadable: false,
     emittedReadable: true,
     readableListening: false,
     resumeScheduled: false,
     defaultEncoding: 'utf8',
     ranOut: false,
     awaitDrain: 0,
     readingMore: true,
     decoder: null,
     encoding: null },
  readable: true,
  domain: null,
  _events: { end: { [Function: g] listener: [Function: onend] } },
  _eventsCount: 1,
  _maxListeners: undefined,
  _writableState:
   WritableState {
     objectMode: false,
     highWaterMark: 16384,
     needDrain: true,
     ending: true,
     ended: true,
     finished: false,
     decodeStrings: true,
     defaultEncoding: 'utf8',
     length: 0,
     writing: false,
     corked: 0,
     sync: false,
     bufferProcessing: false,
     onwrite: [Function],
     writecb: null,
     writelen: 0,
     bufferedRequest: null,
     lastBufferedRequest: null,
     pendingcb: 1,
     prefinished: true,
     errorEmitted: false,
     bufferedRequestCount: 0,
     corkedRequestsFree: CorkedRequest { next: null, entry: null, finish: [Function] } },
  writable: false,
  allowHalfOpen: true,
  _transformState:
   TransformState {
     afterTransform: [Function],
     needTransform: false,
     transforming: false,
     writecb: null,
     writechunk: null,
     writeencoding: 'buffer' } }
Missing error handler on `socket`.
Error: write after end
    at writeAfterEnd (_stream_writable.js:166:12)
    at PassThrough.Writable.write (_stream_writable.js:217:5)
    at Object.streamer.audioStream (/Users/felipematsumoto/Desktop/thesis/server/lib/watson.js:96:18)
    at Socket.socket.on (/Users/felipematsumoto/Desktop/thesis/server/streams.js:59:27)
    at emitOne (events.js:96:13)
    at Socket.emit (events.js:188:7)
    at Socket.onevent (/Users/felipematsumoto/Desktop/thesis/node_modules/socket.io/lib/socket.js:335:8)
    at Socket.onpacket (/Users/felipematsumoto/Desktop/thesis/node_modules/socket.io/lib/socket.js:299:12)
    at Client.ondecoded (/Users/felipematsumoto/Desktop/thesis/node_modules/socket.io/lib/client.js:193:14)
    at Decoder.Emitter.emit (/Users/felipematsumoto/Desktop/thesis/node_modules/component-emitter/index.js:134:20)
    at Decoder.add (/Users/felipematsumoto/Desktop/thesis/node_modules/socket.io-parser/index.js:257:14)
    at Client.ondata (/Users/felipematsumoto/Desktop/thesis/node_modules/socket.io/lib/client.js:175:18)
    at emitOne (events.js:96:13)
    at Socket.emit (events.js:188:7)
    at Socket.onPacket (/Users/felipematsumoto/Desktop/thesis/node_modules/engine.io/lib/socket.js:101:14)
    at emitOne (events.js:96:13)
Results: {
   "results": [
      {
         "alternatives": [
            {
               "word_confidence": [
                  [
                     "Tuesday",
                     0.06310283964632486
                  ]
               ],
               "confidence": 0.063,
               "transcript": "Tuesday ",
               "timestamps": [
                  [
                     "Tuesday",
                     11.38,
                     11.94
                  ]
               ]
            },
            {
               "transcript": "his state "
            },
            {
               "transcript": "juicy "
            }
         ],
         "final": true
      }
   ],
   "result_index": 5
}
Data: "Tuesday "
GOT TOKEN,  { access_token: 'hTuDRo2atfIKNhbFrDsfWr5o0TxcnwLdk8UXjVg9-iwuy0RsUdfNaDFdIR7LAxlhIg5mPgyYbc0wzpC3aGSY7vK8nvBPlm5EyxCXFKsJ9X3-M6IJudnxXcHf8mOAmXlGnyQzUajw8GDPibrIBUXXQtl8uJxrc0nx_54xKZlH9ho1NSAvxZDIbRvxDQz-3YAHdasVEMyp9hfrQ1SZ0cWDg9S1P_6P58D9iLPtck-BdmhVa7SFOvgWspjHL3E5LHfgEl4a7C23vIr8IamtcRW4Lod1874U2CBAytzJwa6p-HXxGj6CtCkdfHrvZPiWbUGK8ZyjkK9UR2E8bLbGggKLHOh6HXgcgLSQCmqKTWYHxKnJb5Aqjl38Qs9y76yVwYYh2KpMl6wT2lq0zjsEhHZcDV_PGmZok8OT55Fg77KumWV25r55eUk4VDBC9tbpUH0YbPaqEG2FfNGOA6EYwS9a7UVcwG4c817NmsYNf_WBsyU5lqhVq-SpMiJWhK_UGc4GaJNTSmkNbivuPtAMPp2TxrRltxl8Y3OoWs7jyxWgwHYeufx-Xzu9m0QT_MPRtXfi-orWgrVR08rj4RVeDkG-XyBk7oqTzirUOYc8y9QgwYD8Dt3ghJL3RsIDiY4QEe93oaLFKaOmDbtMocX3PGuUuzx_Ytsfb9WLD9IcsKUZFhbS73on9ZayFnCmJCxJMp5p48WUuuNfp8g0SRk74aS4Y8xoyM69DAAy4pllrkWGawSoaHYbLk7CNgJRrEr7qYpoxCuSM6EmRndMaEUZHrWfa4gwB8eghE7-9Rncu1nrTK1qUlOT',
  token_type: 'bearer',
  expires_in: 172799 }
Results: {
   "results": [
      {
         "alternatives": [
            {
               "timestamps": [],
               "confidence": 0,
               "transcript": "to "
            },
            {
               "transcript": "two zero "
            }
         ],
         "final": true
      }
   ],
   "result_index": 6
}
Data: "to "
GOT SESSION ID  { status: 'success',
  recordingId: '873c8b77-372e-4e8d-8c44-4783697902c9' }
Results: {
   "results": [
      {
         "alternatives": [
            {
               "word_confidence": [
                  [
                     "core",
                     0.32564589279970346
                  ],
                  [
                     "and",
                     0.9261738220016743
                  ]
               ],
               "confidence": 0.476,
               "transcript": "core and ",
               "timestamps": [
                  [
                     "core",
                     13.33,
                     13.9
                  ],
                  [
                     "and",
                     14.07,
                     14.26
                  ]
               ]
            },
            {
               "transcript": "core and brief "
            },
            {
               "transcript": "car and "
            }
         ],
         "final": true
      }
   ],
   "result_index": 7
}
Data: "core and "
Results: {
   "results": [
      {
         "alternatives": [
            {
               "word_confidence": [
                  [
                     "our",
                     0.36334898962302226
                  ]
               ],
               "confidence": 0.363,
               "transcript": "our ",
               "timestamps": [
                  [
                     "our",
                     15.06,
                     15.43
                  ]
               ]
            },
            {
               "transcript": "however "
            },
            {
               "transcript": "how're "
            }
         ],
         "final": true
      }
   ],
   "result_index": 8
}
Data: "our "
Results: {
   "results": [
      {
         "alternatives": [
            {
               "timestamps": [],
               "confidence": 0,
               "transcript": "three "
            },
            {
               "transcript": "there is a "
            }
         ],
         "final": true
      }
   ],
   "result_index": 9
}
Data: "three "
Results: {
   "results": [
      {
         "alternatives": [
            {
               "word_confidence": [
                  [
                     "core",
                     0.268413369867065
                  ],
                  [
                     "and",
                     0.9999999999998869
                  ],
                  [
                     "reason",
                     0.14865196565228572
                  ]
               ],
               "confidence": 0.352,
               "transcript": "core and reason ",
               "timestamps": [
                  [
                     "core",
                     16.35,
                     16.87
                  ],
                  [
                     "and",
                     17.1,
                     17.28
                  ],
                  [
                     "reason",
                     17.38,
                     17.74
                  ]
               ]
            },
            {
               "transcript": "gore and reason "
            },
            {
               "transcript": "Cork and reason "
            }
         ],
         "final": true
      }
   ],
   "result_index": 10
}
Data: "core and reason "
Results: {
   "results": [
      {
         "alternatives": [
            {
               "word_confidence": [
                  [
                     "our",
                     0.31155652546102636
                  ]
               ],
               "confidence": 0.312,
               "transcript": "our ",
               "timestamps": [
                  [
                     "our",
                     18.08,
                     18.45
                  ]
               ]
            },
            {
               "transcript": "however "
            },
            {
               "transcript": "Howard "
            }
         ],
         "final": true
      }
   ],
   "result_index": 11
}
Data: "our "
Results: {
   "results": [
      {
         "alternatives": [
            {
               "word_confidence": [
                  [
                     "Cork",
                     0.07856819993354508
                  ],
                  [
                     "and",
                     0.9160024802892787
                  ],
                  [
                     "reason",
                     0.21835633972581228
                  ]
               ],
               "confidence": 0.284,
               "transcript": "Cork and reason ",
               "timestamps": [
                  [
                     "Cork",
                     19.36,
                     19.8
                  ],
                  [
                     "and",
                     20.12,
                     20.3
                  ],
                  [
                     "reason",
                     20.4,
                     20.76
                  ]
               ]
            },
            {
               "transcript": "core and reason "
            },
            {
               "transcript": "gore and reason "
            }
         ],
         "final": true
      }
   ],
   "result_index": 12
}
Data: "Cork and reason "
Results: {
   "results": [
      {
         "alternatives": [
            {
               "word_confidence": [
                  [
                     "our",
                     0.3001105898305687
                  ]
               ],
               "confidence": 0.3,
               "transcript": "our ",
               "timestamps": [
                  [
                     "our",
                     21.1,
                     21.47
                  ]
               ]
            },
            {
               "transcript": "however "
            },
            {
               "transcript": "Howard "
            }
         ],
         "final": true
      }
   ],
   "result_index": 13
}
Data: "our "
Results: {
   "results": [
      {
         "alternatives": [
            {
               "timestamps": [],
               "confidence": 0,
               "transcript": "I "
            }
         ],
         "final": true
      }
   ],
   "result_index": 14
}
Data: "I "
Results: {
   "results": [
      {
         "alternatives": [
            {
               "timestamps": [],
               "confidence": 0,
               "transcript": "yeah "
            },
            {
               "transcript": "I "
            }
         ],
         "final": true
      }
   ],
   "result_index": 15
}