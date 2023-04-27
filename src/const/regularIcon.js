// Icons
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
// import { faArrowRightToBracket } from "@fortawesome/free-regular-svg-icons/faArrowRightToBracket";
// import { faHouse } from "@fortawesome/pro-regular-svg-icons/faHouse";
// import { faChevronLeft } from "@fortawesome/free-regular-svg-icons/faChevronLeft";
// import { faChevronDown } from "@fortawesome/free-regular-svg-icons/faChevronDown";
// import { faMagnifyingGlass } from "@fortawesome/free-regular-svg-icons/faMagnifyingGlass";
// import { faBell } from "@fortawesome/free-regular-svg-icons/faBell";
import { faUser } from "@fortawesome/free-regular-svg-icons/faUser";
// import { faCamera } from "@fortawesome/free-regular-svg-icons/faCamera";
// import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons/faCircleQuestion";
// import { faUserPen } from "@fortawesome/free-regular-svg-icons/faUserPen";
import { faMessage } from "@fortawesome/free-regular-svg-icons/faMessage";
// import { faArrowRightFromBracket } from "@fortawesome/free-regular-svg-icons/faArrowRightFromBracket";
import { faHeart } from "@fortawesome/free-regular-svg-icons/faHeart";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons/faEnvelope";
import { faEye } from "@fortawesome/free-regular-svg-icons/faEye";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons/faEyeSlash";
import { faSquareCheck } from "@fortawesome/free-regular-svg-icons/faSquareCheck";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons/faCircleUser";

export const regularIcon = () => {
  library.add(
    fab,
    // faArrowRightToBracket,
    // faHouse,
    // faChevronLeft,
    // faMagnifyingGlass,
    // faBell,
    // faChevronDown,
    // faCircleQuestion,
    faUser,
    // faCamera,
    // faUserPen,
    faMessage,
    // faArrowRightFromBracket,
    faHeart,
    faEnvelope,
    faEye,
    faEyeSlash,
    faSquareCheck,
    faCircleUser
  );
};
