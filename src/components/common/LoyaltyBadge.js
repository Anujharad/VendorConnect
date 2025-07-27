import React from "react";
import { Sparkles, Star, Award, Crown, Diamond } from "lucide-react";
import { LOYALTY_BADGES } from "../../utils/constants";

const icons = {
  Sparkles,
  Star,
  Award,
  Crown,
  Diamond,
};

const LoyaltyBadge = ({ type, showDetails = false }) => {
  const badge = LOYALTY_BADGES[type];
  const Icon = icons[badge.icon];

  return (
    <div className="inline-flex items-center gap-2">
      <div className={`${badge.bgColor} ${badge.color} p-1.5 rounded-full`}>
        <Icon size={16} />
      </div>

      {showDetails && (
        <div className="flex flex-col">
          <span className="text-sm font-medium">{badge.name}</span>
          <span className="text-xs text-gray-500">
            {badge.discount} discount on orders
          </span>
        </div>
      )}
    </div>
  );
};

export default LoyaltyBadge;
