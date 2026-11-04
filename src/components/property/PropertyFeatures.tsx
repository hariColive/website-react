import type { IconType } from "react-icons";
import { FaArrowsAltH, FaDumbbell, FaLock, FaShieldAlt, FaTv, FaUsers, FaUtensils, FaWifi } from "react-icons/fa";

// The same eight highlights colive.com shows on every property page
const FEATURES: { label: string; icon: IconType }[] = [
  { label: "Fully Furnished", icon: FaArrowsAltH },
  { label: "50 GB Wi-Fi", icon: FaWifi },
  { label: "In-house Dining", icon: FaUtensils },
  { label: "Digital Access", icon: FaLock },
  { label: "24x7 Security", icon: FaShieldAlt },
  { label: "Cinema Room", icon: FaTv },
  { label: "Fitness Room", icon: FaDumbbell },
  { label: "15K Community", icon: FaUsers },
];

export default function PropertyFeatures() {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {FEATURES.map(({ label, icon: Icon }) => (
        <li key={label} className="border border-gray-200 px-5 py-5 text-[#111]">
          <Icon aria-hidden="true" className="mb-4 text-lg" />
          <p className="text-[15px]">{label}</p>
        </li>
      ))}
    </ul>
  );
}
