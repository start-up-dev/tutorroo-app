// Icons
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons/faArrowRightToBracket";
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import { faBell } from "@fortawesome/free-solid-svg-icons/faBell";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { faCamera } from "@fortawesome/free-solid-svg-icons/faCamera";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons/faCircleQuestion";
import { faUserPen } from "@fortawesome/free-solid-svg-icons/faUserPen";
import { faMessage } from "@fortawesome/free-solid-svg-icons/faMessage";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons/faArrowRightFromBracket";
import { faHeart } from "@fortawesome/free-solid-svg-icons/faHeart";
import { faStar } from "@fortawesome/free-solid-svg-icons/faStar";
import { faLock } from "@fortawesome/free-solid-svg-icons/faLock";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons/faSquareCheck";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons/faCircleUser";

export const Icon = () => {
  library.add(
    fab,
    faArrowRightToBracket,
    faHouse,
    faChevronLeft,
    faMagnifyingGlass,
    faBell,
    faChevronDown,
    faCircleQuestion,
    faUser,
    faCamera,
    faUserPen,
    faMessage,
    faArrowRightFromBracket,
    faHeart,
    faStar,
    faLock,
    faEnvelope,
    faSquareCheck,
    faCircleUser
  );
};
