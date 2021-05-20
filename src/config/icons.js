import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

export default {
  configure () {
    library.add(faAngleLeft, faAngleRight);
  }
};
