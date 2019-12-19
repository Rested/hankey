# HanKey

Hankey is a little web app for learning the 2-set Korean keyboard layout. 
It features a keys section for learning where the keys are and a words section for
practicing typing full words once you get an understanding of which characters are where.

Hankey helps you track your progress and improve as quickly as possible by using the 
[supermemo2](https://www.supermemo.com/en/archives1990-2015/english/ol/sm2) spaced repetition algorithm to determine which letter to practise next. This and various other progress metrics are exposed for the user to see.

## Technical details

Hankey is a [React](https://reactjs.org/)/[Redux](https://redux.js.org/) [progressive web app](https://developers.google.com/web/progressive-web-apps). Other tech used includes:

* The fantastic [Hangul-js](https://github.com/e-/Hangul.js/) package for disassembling and reassembling Hangul (Korean) characters - e.g. (한 <-> ㅎㅏㄴ). 
* The UI is built with [semantic-ui-react](https://react.semantic-ui.com/). 
* The [Web Speach Api](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) is used for Text-to-Speach synthesis
* [Github actions](.github/workflows/docker-package.yml) for building the docker image and publishing to github's container registry on releases.
* [Serve](https://github.com/zeit/serve#readme) for running the docker image.
* Kubernetes for deployment
* [IBM's translate api](https://www.ibm.com/watson/services/language-translator/) for translations of vocabulary (much more accurate than google or bing for korean words)
* [KoNLPy](http://konlpy.org/en/latest/) for its corpuses and determining character frequency.